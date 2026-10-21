"""原 HTML 归档可逐文件复原；历史快照只取完整无冲突的指定批次。"""

from pathlib import Path
import csv
import os
import tarfile
import pytest

from src.artificial_analysis_legacy_catalog_archive_and_snapshot import (
    archive_and_extract_legacy_catalogs,
)
from tests.python_unit.test_artificial_analysis_minimal_catalog_refresh import (
    synthetic_catalog_and_api_rows,
    NOW,
)


def test_archive_preserves_originals_and_rejects_conflicting_batch(tmp_path):
    source = tmp_path / "legacy-html"
    source.mkdir()
    html, _ = synthetic_catalog_and_api_rows()
    html = html.replace("v4.3.2", "v4.1")
    (source / "first.html").write_text(html)
    (source / "duplicate.html").write_text(html)
    for path in source.iterdir():
        os.utime(path, (NOW.timestamp(), NOW.timestamp()))
    result = archive_and_extract_legacy_catalogs(
        source, tmp_path / "persistent-backup", historical_capture_date="2026-10-21"
    )
    with tarfile.open(result["archive_path"], "r:gz") as archive:
        for path in source.iterdir():
            assert (
                archive.extractfile(
                    "artificial_analysis_model_detail_page_html/" + path.name
                ).read()
                == path.read_bytes()
            )
    with Path(result["historical_snapshot_path"]).open() as stream:
        rows = list(csv.DictReader(stream))
    assert len(rows) == 60
    assert {row["captured_at_date"] for row in rows} == {"2026-10-21"}
    assert len(result["numeric_response_paths"]) == 1
    original_archive = Path(result["archive_path"]).read_bytes()
    with pytest.raises(FileExistsError):
        archive_and_extract_legacy_catalogs(
            source, tmp_path / "persistent-backup", historical_capture_date="2026-10-21"
        )
    assert Path(result["archive_path"]).read_bytes() == original_archive
