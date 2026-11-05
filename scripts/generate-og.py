"""
Renders a branded 1200x630 social-share image (JPEG) for every page in scripts/og-data.json.
Output: public/og/<key>.jpg  — each well under WhatsApp's ~300 KB preview limit.

Regenerate after changing copy:
    bun scripts/og-data.ts > scripts/og-data.json && python scripts/generate-og.py
Requires Pillow. Uses Segoe UI on Windows, falls back to DejaVu elsewhere.
"""
import json, os, sys, textwrap
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "og")
os.makedirs(OUT, exist_ok=True)
S = 2  # supersample for crisp text
W, H = 1200 * S, 630 * S

PAPER, INK, INK2, MUTE, LINE, BLUE = (245, 245, 243), (27, 27, 29), (75, 75, 80), (104, 104, 112), (214, 214, 210), (29, 78, 216)

def font(names, size):
    for n in names:
        for base in ("C:/Windows/Fonts/", "/usr/share/fonts/truetype/dejavu/", ""):
            try:
                return ImageFont.truetype(base + n, size * S)
            except OSError:
                continue
    return ImageFont.load_default()

SEMI = ["seguisb.ttf", "DejaVuSans-Bold.ttf"]
REG = ["segoeui.ttf", "DejaVuSans.ttf"]
LIGHT = ["segoeuisl.ttf", "segoeuil.ttf", "DejaVuSans.ttf"]

def aura(img, cx, cy, r, color, alpha):
    # Pillow's radial_gradient is 0 at the centre and ~181 at the edge midpoints; normalise so alpha is exactly 0 at radius r.
    g = Image.radial_gradient("L").resize((r * 2, r * 2))
    g = g.point(lambda v: int(255 * alpha * (max(0.0, 1 - v / 181.0) ** 1.6)))
    layer = Image.new("RGB", g.size, color)
    img.paste(layer, (cx - r, cy - r), g)

def wrap(draw, text, fnt, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=fnt) <= maxw:
            cur = t
        else:
            lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

def render(p, badge, gear):
    img = Image.new("RGB", (W, H), PAPER)
    aura(img, int(W * 0.86), int(H * 0.08), int(W * 0.42), BLUE, 0.28)
    aura(img, int(W * 0.04), int(H * 1.02), int(W * 0.40), (150, 158, 190), 0.55)
    d = ImageDraw.Draw(img)
    pad = 84 * S

    # brand row
    b = badge.resize((84 * S, 84 * S), Image.LANCZOS)
    img.paste(b, (pad, 60 * S), b)
    d.text((pad + 104 * S, 80 * S), "Siva Engineering", font=font(SEMI, 40), fill=INK)
    d.text((pad + 104 * S, 128 * S), "GEAR JOB WORK · COIMBATORE", font=font(REG, 17), fill=MUTE)

    has_photo = bool(p.get("photo"))
    text_w = 620 * S

    # eyebrow
    d.ellipse((pad, 212 * S, pad + 14 * S, 226 * S), fill=BLUE)
    d.text((pad + 28 * S, 208 * S), p["eyebrow"].upper(), font=font(SEMI, 20), fill=MUTE)

    # title + subtitle must fit between y=250 and y=525
    size = 72
    while True:
        tf = font(SEMI, size)
        lines = wrap(d, p["title"], tf, text_w)
        sf = font(REG, 26)
        sub = wrap(d, p["sub"], sf, text_w)
        if len(sub) > 2:
            sub = [sub[0], sub[1].rstrip(' .,;:—-') + '…']
        total = len(lines) * int(size * 1.08) + 16 + len(sub) * 38
        if total <= 270 or size <= 36: break
        size -= 4
    y = 252 * S
    for ln in lines:
        d.text((pad, y), ln, font=tf, fill=INK)
        y += int(size * 1.08 * S)
    y += 16 * S
    for ln in sub:
        d.text((pad, y), ln, font=sf, fill=INK2)
        y += 38 * S

    # footer bar
    d.line((pad, 548 * S, W - pad, 548 * S), fill=LINE, width=2 * S)
    d.text((pad, 568 * S), "WhatsApp / Call  +91 76677 25967", font=font(SEMI, 26), fill=INK)
    rt = "Irugur, Coimbatore"
    f2 = font(REG, 26)
    d.text((W - pad - d.textlength(rt, font=f2), 568 * S), rt, font=f2, fill=MUTE)

    # right visual
    if has_photo:
        ph = Image.open(os.path.join(ROOT, "public", p["photo"].lstrip("/"))).convert("RGB")
        bw, bh = 400 * S, 400 * S
        r = max(bw / ph.width, bh / ph.height)
        ph = ph.resize((int(ph.width * r), int(ph.height * r)), Image.LANCZOS)
        x0, y0 = (ph.width - bw) // 2, int((ph.height - bh) * 0.3)
        ph = ph.crop((x0, y0, x0 + bw, y0 + bh))
        px, py = W - pad - bw, 118 * S
        shadow = Image.new("RGBA", (bw + 120 * S, bh + 120 * S), (0, 0, 0, 0))
        ImageDraw.Draw(shadow).rectangle((60 * S, 70 * S, 60 * S + bw, 70 * S + bh), fill=(0, 0, 0, 70))
        shadow = shadow.filter(ImageFilter.GaussianBlur(28 * S))
        img.paste(shadow, (px - 60 * S, py - 60 * S), shadow)
        img.paste(ph, (px, py))
        d.rectangle((px, py, px + bw, py + bh), outline=LINE, width=2 * S)
    else:
        g = gear.copy()
        gw = 470 * S
        g = g.resize((gw, int(g.height * gw / g.width)), Image.LANCZOS)
        sh = Image.new("RGBA", g.size, (0, 0, 0, 0))
        sh.paste((0, 0, 0, 60), (0, 0), g.split()[3])
        sh = sh.filter(ImageFilter.GaussianBlur(22 * S))
        gx, gy = W - gw + 40 * S, 70 * S
        img.paste(sh, (gx + 10 * S, gy + 24 * S), sh)
        img.paste(g, (gx, gy), g)

    return img.resize((1200, 630), Image.LANCZOS)

def main():
    data = json.load(open(os.path.join(ROOT, "scripts", "og-data.json"), encoding="utf-8"))
    badge = Image.open(os.path.join(ROOT, "public", "brand", "siva-badge-512.png")).convert("RGBA")
    # round the badge
    m = Image.new("L", badge.size, 0); ImageDraw.Draw(m).ellipse((0, 0, badge.width - 1, badge.height - 1), fill=255)
    badge.putalpha(m)
    gear = Image.open(os.path.join(ROOT, "public", "brand", "siva-gear.webp")).convert("RGBA")
    total = 0
    for p in data:
        out = os.path.join(OUT, f"{p['key']}.jpg")
        render(p, badge, gear).save(out, "JPEG", quality=84, optimize=True, progressive=True)
        sz = os.path.getsize(out); total += sz
        if sz > 280 * 1024: print("WARN large:", p["key"], sz // 1024, "KB")
    print(f"{len(data)} images, avg {total // len(data) // 1024} KB")

if __name__ == "__main__":
    main()
