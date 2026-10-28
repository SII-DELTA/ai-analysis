"""将完整离线报告封装为受单文件限额约束的预览资源包，科学内容保持不变。"""
from __future__ import annotations

import gzip
import hashlib
import json
from pathlib import Path
from uuid import uuid4

from .frontier_3d_self_contained_html_renderer import _json_for_script_tag
from .frontier_3d_worktree_storage_paths import refuse_shared_worktree_directory_write


def write_historical_progress_publication_bundle(self_contained_html_file, publication_directory):
    """保留单文件原件，额外交付入口和带 SHA256 的 gzip 分段资源。"""
    publication_directory = Path(publication_directory).resolve()
    refuse_shared_worktree_directory_write(publication_directory / "historical-frontier-progress.html")
    document = Path(self_contained_html_file).read_text()
    marker = '<script id="frontier-3d-historical-progress-dataset-json" type="application/json">'
    if document.count(marker) != 1:
        raise ValueError("报告必须恰有一个历史数据入口")
    start = document.index(marker) + len(marker)
    end = document.index("</script>", start)
    payload = document[start:end].encode()
    if json.loads(payload).get("schema_version") != "frontier_3d_historical_progress_browser_projection/v1":
        raise ValueError("只接受完整历史浏览器投影")
    compressed = gzip.compress(payload, compresslevel=6, mtime=0)
    compressed_sha256 = hashlib.sha256(compressed).hexdigest()
    maximum_segment_bytes = 40 * 1024 * 1024
    segments = [compressed[offset:offset + maximum_segment_bytes] for offset in range(0, len(compressed), maximum_segment_bytes)]
    segment_names = [f"historical-browser-projection-{compressed_sha256[:16]}-segment-{index + 1:04d}.gzpart" for index in range(len(segments))]
    transport = {"schema_version": "frontier_3d_historical_progress_browser_transport/v1",
                 "compressed_payload_byte_count": len(compressed), "compressed_payload_sha256": compressed_sha256,
                 "payload_segment_urls": segment_names}
    entry = (document[:start] + _json_for_script_tag(transport) + document[end:]).encode()
    if len(entry) > 50 * 1024 * 1024 or len(entry) + len(compressed) > 100 * 1024 * 1024:
        raise ValueError("预览资源包仍超过单文件 50MB 或总计 100MB 限额；完整离线原件已保留")
    publication_directory.mkdir(parents=True, exist_ok=True)
    artifacts = []
    for filename, content in [("historical-frontier-progress.html", entry), *zip(segment_names, segments)]:
        destination = publication_directory / filename
        pending = destination.with_name(destination.name + f".pending-{uuid4().hex}")
        try:
            pending.write_bytes(content)
            pending.replace(destination)
        finally:
            pending.unlink(missing_ok=True)
        artifacts.append({"path": str(destination), "bundle_relative_path": filename, "byte_count": len(content),
                          "sha256": hashlib.sha256(content).hexdigest()})
    receipt = {"status": "generated", "source_self_contained_html_file": str(Path(self_contained_html_file).resolve()),
               "uncompressed_projection_sha256": hashlib.sha256(payload).hexdigest(),
               "compressed_payload_sha256": compressed_sha256, "scientific_values_changed": False,
               "total_byte_count": sum(artifact["byte_count"] for artifact in artifacts), "artifacts": artifacts}
    (publication_directory / "publication-bundle-generation-receipt.json").write_text(json.dumps(receipt, ensure_ascii=False, indent=2))
    return receipt
