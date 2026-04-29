from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
MENU_DIR = ROOT / "public" / "menu"
MAX_SIZE = 900
QUALITY = 82


def optimize(path: Path) -> tuple[int, int]:
    before = path.stat().st_size
    with Image.open(path) as img:
        img = img.convert("RGB")
        img.thumbnail((MAX_SIZE, MAX_SIZE), Image.Resampling.LANCZOS)
        img.save(path, "JPEG", quality=QUALITY, optimize=True, progressive=True)
    after = path.stat().st_size
    return before, after


def main() -> None:
    total_before = 0
    total_after = 0
    count = 0
    for path in MENU_DIR.rglob("*.jpg"):
        before, after = optimize(path)
        total_before += before
        total_after += after
        count += 1
    print(
        f"Optimized {count} images: "
        f"{total_before / 1024 / 1024:.2f}MB -> {total_after / 1024 / 1024:.2f}MB"
    )


if __name__ == "__main__":
    main()
