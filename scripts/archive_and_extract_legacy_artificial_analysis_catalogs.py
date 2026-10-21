"""将已有 HTML 只读归档并抽取数值目录；不联网、不删除原文件。"""

from pathlib import Path
import argparse
import json
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from src.artificial_analysis_legacy_catalog_archive_and_snapshot import (
    archive_and_extract_legacy_catalogs,
)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-html-directory", type=Path, required=True)
    parser.add_argument("--persistent-backup-directory", type=Path, required=True)
    args = parser.parse_args()
    result = archive_and_extract_legacy_catalogs(
        args.source_html_directory, args.persistent_backup_directory
    )
    print(
        json.dumps(
            {key: value for key, value in result.items() if key != "source_files"},
            ensure_ascii=False,
            indent=2,
        )
    )
