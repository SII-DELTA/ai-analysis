"""UTF-8 组件字节可加总，避免把中文字符数误当文件大小。"""
import json
import pytest
from scripts.measure_frontier_3d_offline_artifact_components import measure_frontier_3d_html_components


def test_component_measurement_counts_utf8_and_rejects_missing_artifact_sections():
    dataset = {"schema_version": "frontier_3d_visualization_dataset/v2", "organization_identity_metadata_by_creator_name": {}, "metric_variants": {}}
    document = '<style>\n中文样式\n  </style>\n<script id="frontier-3d-visualization-dataset-json" type="application/json">' + json.dumps(dataset) + '</script>\n<script>\n中文脚本\n  </script>\n</body>'
    sizes = measure_frontier_3d_html_components(document)
    assert sizes["total_html_utf8_bytes"] == len(document.encode("utf-8"))
    assert sum(sizes[key] for key in ("embedded_browser_dataset_utf8_bytes", "renderer_javascript_bundle_utf8_bytes", "inline_stylesheet_utf8_bytes", "document_structure_utf8_bytes")) == len(document.encode("utf-8"))
    with pytest.raises(ValueError, match="恰含一份"):
        measure_frontier_3d_html_components("缺少契约")
