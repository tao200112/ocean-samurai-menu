import json
import math
import os
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
MENU = ROOT / "data" / "menu-completed.json"

COLORS = {
    "salmon": (242, 111, 82),
    "tuna": (188, 35, 58),
    "spicy tuna": (202, 45, 45),
    "yellowtail": (246, 214, 132),
    "hamachi": (246, 214, 132),
    "white tuna": (238, 230, 206),
    "shrimp": (248, 157, 118),
    "shrimp tempura": (238, 176, 69),
    "chicken": (210, 140, 78),
    "steak": (118, 65, 42),
    "filet mignon": (104, 56, 39),
    "eel": (88, 50, 32),
    "unagi": (88, 50, 32),
    "crab": (232, 74, 58),
    "crab stick": (232, 74, 58),
    "crab salad": (238, 168, 122),
    "fish roe": (245, 91, 33),
    "flying fish roe": (245, 91, 33),
    "salmon roe": (231, 78, 31),
    "avocado": (91, 159, 73),
    "cucumber": (79, 153, 94),
    "mango": (248, 185, 36),
    "cream cheese": (250, 242, 218),
    "sweet potato": (225, 126, 38),
    "seaweed": (33, 70, 48),
    "tofu": (238, 215, 161),
    "egg": (246, 204, 77),
    "tamago": (246, 204, 77),
    "rice": (245, 241, 226),
    "white rice": (245, 241, 226),
    "sriracha": (196, 43, 33),
    "spicy mayo": (242, 112, 65),
    "eel sauce": (56, 31, 22),
    "ponzu sauce": (124, 60, 28),
    "soy sauce": (48, 24, 16),
    "ginger dressing": (221, 135, 65),
    "honey wasabi": (154, 185, 73),
}


def stable_rng(text):
    return random.Random(sum((idx + 1) * ord(ch) for idx, ch in enumerate(text)))


def ingredient_color(name):
    n = name.lower()
    for key, value in COLORS.items():
        if key in n:
            return value
    return (205, 140, 88)


def bg(draw, w, h, rng):
    base = Image.new("RGB", (w, h), (17, 29, 39))
    d = ImageDraw.Draw(base)
    for y in range(h):
        shade = int(18 + 30 * y / h)
        d.line([(0, y), (w, y)], fill=(shade // 2, shade, shade + 8))
    for _ in range(180):
        x, y = rng.randrange(w), rng.randrange(h)
        c = rng.randrange(25, 55)
        d.point((x, y), fill=(c, c + 4, c + 8))
    return base


def ellipse_shadow(draw, box, fill=(0, 0, 0, 90)):
    x1, y1, x2, y2 = box
    draw.ellipse((x1 + 10, y1 + 18, x2 + 10, y2 + 18), fill=fill)


def plate(draw, cx, cy, rx, ry):
    ellipse_shadow(draw, (cx - rx, cy - ry, cx + rx, cy + ry), (0, 0, 0))
    draw.ellipse((cx - rx, cy - ry, cx + rx, cy + ry), fill=(232, 226, 207), outline=(255, 251, 235), width=5)
    draw.ellipse((cx - rx + 28, cy - ry + 24, cx + rx - 28, cy + ry - 24), fill=(36, 48, 52), outline=(202, 190, 155), width=3)


def sauce_lines(draw, points, color, width=6):
    if len(points) > 1:
        draw.line(points, fill=color, width=width, joint="curve")


def draw_roll(draw, item, rng):
    plate(draw, 320, 325, 245, 205)
    ingredients = item.get("ingredients_known") or item.get("proteins") or ["avocado", "crab"]
    sauces = item.get("sauces") or []
    pieces = min(max(item.get("pieces") or 8, 6), 10)
    cols = 4 if pieces <= 8 else 5
    rows = math.ceil(pieces / cols)
    start_x = 320 - (cols - 1) * 68 / 2
    start_y = 305 - (rows - 1) * 74 / 2
    for i in range(pieces):
        x = start_x + (i % cols) * 68 + rng.randrange(-4, 5)
        y = start_y + (i // cols) * 74 + rng.randrange(-4, 5)
        draw.ellipse((x - 33, y - 33, x + 33, y + 33), fill=(24, 47, 43), outline=(18, 28, 26), width=5)
        draw.ellipse((x - 27, y - 27, x + 27, y + 27), fill=(246, 241, 222))
        for j, ing in enumerate(ingredients[:5]):
            color = ingredient_color(ing)
            ang = 2 * math.pi * (j / max(1, min(5, len(ingredients)))) + rng.random() * 0.35
            fx = x + math.cos(ang) * 10
            fy = y + math.sin(ang) * 10
            draw.rounded_rectangle((fx - 9, fy - 9, fx + 9, fy + 9), radius=5, fill=color)
    for sauce in sauces[:2]:
        color = ingredient_color(sauce)
        pts = [(120 + i * 85, 230 + int(math.sin(i * 1.2) * 30)) for i in range(6)]
        sauce_lines(draw, pts, color, 7)


def draw_nigiri(draw, item, rng):
    plate(draw, 320, 330, 240, 190)
    ingredients = item.get("ingredients_known") or item.get("proteins") or [item["name"]]
    color = ingredient_color(ingredients[0])
    for i in range(4):
        x = 210 + (i % 2) * 150 + rng.randrange(-8, 9)
        y = 275 + (i // 2) * 95 + rng.randrange(-6, 7)
        draw.ellipse((x - 48, y + 10, x + 48, y + 45), fill=(238, 233, 215))
        draw.rounded_rectangle((x - 58, y - 22, x + 58, y + 22), radius=18, fill=color, outline=(255, 236, 206), width=2)
        if item.get("is_raw"):
            draw.line((x - 45, y - 7, x + 45, y + 8), fill=(255, 190, 170), width=4)


def draw_bowl(draw, item, rng):
    plate(draw, 320, 335, 225, 180)
    draw.ellipse((170, 195, 470, 480), fill=(20, 24, 24), outline=(73, 65, 48), width=8)
    draw.ellipse((195, 220, 445, 405), fill=(58, 42, 28))
    ingredients = item.get("ingredients_known") or item.get("vegetables") or ["rice"]
    for _ in range(45):
        ing = rng.choice(ingredients)
        color = ingredient_color(ing)
        x = rng.randrange(215, 425)
        y = rng.randrange(245, 385)
        draw.ellipse((x - 9, y - 5, x + 9, y + 5), fill=color)


def draw_hibachi(draw, item, rng):
    plate(draw, 320, 330, 250, 185)
    ingredients = item.get("ingredients_known") or item.get("proteins") or ["chicken"]
    protein = ingredients[0]
    color = ingredient_color(protein)
    for _ in range(20):
        x = rng.randrange(205, 435)
        y = rng.randrange(250, 390)
        draw.rounded_rectangle((x - 20, y - 14, x + 20, y + 14), radius=7, fill=color, outline=(80, 43, 30), width=2)
    for veg, c in [("broccoli", (67, 128, 66)), ("carrot", (226, 103, 41)), ("zucchini", (86, 145, 78))]:
        for _ in range(8):
            x = rng.randrange(190, 450)
            y = rng.randrange(240, 410)
            draw.ellipse((x - 10, y - 10, x + 10, y + 10), fill=c)
    sauce_lines(draw, [(210, 255), (280, 310), (360, 285), (440, 350)], (74, 37, 22), 8)


def draw_condiment(draw, item, rng):
    plate(draw, 320, 330, 215, 170)
    color = ingredient_color((item.get("sauces") or item.get("ingredients_known") or [item["name"]])[0])
    draw.ellipse((210, 205, 430, 425), fill=(18, 18, 18), outline=(214, 189, 111), width=8)
    draw.ellipse((238, 235, 402, 395), fill=color)
    draw.ellipse((270, 260, 370, 310), fill=tuple(min(255, c + 35) for c in color))


def draw_addon(draw, item, rng):
    plate(draw, 320, 330, 215, 170)
    ingredients = item.get("ingredients_known") or [item["name"]]
    color = ingredient_color(ingredients[0])
    for i in range(10):
        x = 205 + (i % 5) * 58 + rng.randrange(-5, 6)
        y = 285 + (i // 5) * 70 + rng.randrange(-5, 6)
        draw.rounded_rectangle((x - 22, y - 16, x + 22, y + 16), radius=10, fill=color, outline=(255, 235, 180), width=2)


def render(item):
    rng = stable_rng(item["id"])
    img = bg(None, 640, 640, rng)
    draw = ImageDraw.Draw(img, "RGBA")
    category = item.get("category")
    item_type = item.get("item_type")
    if category == "Condiments":
        draw_condiment(draw, item, rng)
    elif category == "Add-ons":
        draw_addon(draw, item, rng)
    elif item_type == "roll":
        draw_roll(draw, item, rng)
    elif item_type in {"nigiri", "sashimi"}:
        draw_nigiri(draw, item, rng)
    elif category in {"Soup", "Salads", "Noodles", "Rice", "Dessert"}:
        draw_bowl(draw, item, rng)
    elif category == "Hibachi":
        draw_hibachi(draw, item, rng)
    else:
        draw_bowl(draw, item, rng)

    # Subtle warm vignette.
    vignette = Image.new("L", img.size, 0)
    vd = ImageDraw.Draw(vignette)
    vd.ellipse((-80, -80, 720, 720), fill=210)
    vignette = vignette.filter(ImageFilter.GaussianBlur(55))
    warm = Image.new("RGB", img.size, (250, 216, 145))
    img = Image.composite(img, Image.blend(img, warm, 0.10), vignette)
    return img


def main():
    items = json.loads(MENU.read_text(encoding="utf-8"))
    generated = 0
    for item in items:
        rel = item["image"]["main"].lstrip("/")
        out = ROOT / "public" / rel
        out.parent.mkdir(parents=True, exist_ok=True)
        render(item).save(out, "JPEG", quality=88, optimize=True)
        item["image_status"] = "generated_local_draft"
        generated += 1
    MENU.write_text(json.dumps(items, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Generated {generated} local draft menu images.")


if __name__ == "__main__":
    main()
