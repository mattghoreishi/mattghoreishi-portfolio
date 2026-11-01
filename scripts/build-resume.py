"""Build the public CV from the same records used by the HTML CV.

Install scripts/requirements-resume.txt and the DejaVu Sans fonts first.
Run from any directory: python3 scripts/build-resume.py
"""

import hashlib
import json
import os
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import HRFlowable, PageBreak, Paragraph, SimpleDocTemplate, Spacer

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/assets/Matt-Ghoreishi-CV.pdf"
SOURCES = ["data/career.json", "data/resume.json", "scripts/build-resume.py"]
career = json.loads((ROOT / SOURCES[0]).read_text())
resume = json.loads((ROOT / SOURCES[1]).read_text())
font_dir = Path(os.environ.get("RESUME_FONT_DIR", "/usr/share/fonts/truetype/dejavu"))
for name, filename in [("DejaVu", "DejaVuSans.ttf"), ("DejaVuBold", "DejaVuSans-Bold.ttf")]:
    font = font_dir / filename
    if not font.is_file():
        raise SystemExit(f"Missing font: {font}. Install DejaVu Sans or set RESUME_FONT_DIR.")
    pdfmetrics.registerFont(TTFont(name, str(font)))
pdfmetrics.registerFontFamily("DejaVu", normal="DejaVu", bold="DejaVuBold")

ink = HexColor("#16343c")
muted = HexColor("#4b626b")
link_color = "#086b76"
rule = HexColor("#bdcbcd")
base = dict(fontName="DejaVu", textColor=ink, leading=15)
styles = {
    "name": ParagraphStyle("name", **{**base, "fontName": "DejaVuBold", "fontSize": 29, "leading": 34, "spaceAfter": 8}),
    "title": ParagraphStyle("title", **{**base, "fontSize": 14, "spaceAfter": 9}),
    "small": ParagraphStyle("small", **{**base, "fontSize": 8, "leading": 12, "textColor": muted}),
    "body": ParagraphStyle("body", **{**base, "fontSize": 9.3, "leading": 15, "spaceAfter": 8}),
    "section": ParagraphStyle("section", **{**base, "fontName": "DejaVuBold", "fontSize": 10, "textColor": HexColor(link_color), "leading": 16, "spaceBefore": 16, "spaceAfter": 8}),
    "company": ParagraphStyle("company", **{**base, "fontName": "DejaVuBold", "fontSize": 13, "leading": 18, "spaceAfter": 4}),
    "role": ParagraphStyle("role", **{**base, "fontName": "DejaVuBold", "fontSize": 9.5, "leading": 15, "spaceAfter": 5}),
    "bullet": ParagraphStyle("bullet", **{**base, "fontSize": 9.3, "leading": 14, "leftIndent": 10, "firstLineIndent": -8, "spaceAfter": 4}),
}


def clean(text):
    return escape(text.replace("–", "-").replace("→", "to").replace("’", "'"))


def paragraph(text, style="body", markup=False):
    return Paragraph(text if markup else clean(text), styles[style])


def link(label, href):
    return f'<link href="{escape(href, {chr(34): "&quot;"})}" color="{link_color}">{clean(label)}</link>'


def section(title):
    return [paragraph(title.upper(), "section"), HRFlowable(width="100%", thickness=0.5, color=rule, spaceAfter=9)]


def career_item(item):
    return [paragraph(item["company"], "company"), paragraph(item["role"], "role"), paragraph(item["period"], "small"), Spacer(1, 8), paragraph(item["detail"])] + [paragraph("• " + point, "bullet") for point in item["points"]] + [Spacer(1, 15)]


def work_item(item):
    return paragraph(f'<b>{link(item["title"], resume["siteUrl"] + item["href"])}.</b> {clean(item["description"])}', markup=True)


def footer(canvas, document):
    canvas.setStrokeColor(rule)
    canvas.line(48, 42, A4[0] - 48, 42)
    canvas.setFont("DejaVu", 8)
    canvas.setFillColor(muted)
    canvas.drawString(48, 28, f'{resume["name"]} | mattghoreishi.com | {resume["updated"]}')
    canvas.drawRightString(A4[0] - 48, 28, f"{document.page} / 2")


story = [
    paragraph(resume["name"], "name"),
    paragraph(resume["title"], "title"),
    paragraph(f'{clean(resume["location"])} | {link(resume["email"], "mailto:" + resume["email"])}', "small", markup=True),
    paragraph(f'{link("mattghoreishi.com", resume["siteUrl"])} | {link("linkedin.com/in/mattghoreishi", resume["linkedinUrl"])}', "small", markup=True),
    Spacer(1, 19),
    paragraph(resume["summary"]),
]
story += section("Experience")
for item in career[:3]:
    story += career_item(item)
story += [PageBreak(), paragraph(resume["name"], "company"), paragraph(resume["title"] + " | Career summary, continued", "small")]
story += section("Experience, continued")
for item in career[3:]:
    story += career_item(item)
story += section("Selected product work")
story += [work_item(item) for item in resume["selectedWork"]]
story += section("Education and languages")
story += [paragraph(resume["education"]), paragraph(" | ".join(resume["languages"][:3]) + "<br/>" + clean(resume["languages"][3]), markup=True)]
story += section("Independent work")
story += [work_item(item) for item in resume["independentWork"]]

document = SimpleDocTemplate(
    str(OUTPUT), pagesize=A4, leftMargin=48, rightMargin=48, topMargin=45, bottomMargin=58,
    title=resume["name"] + " | " + resume["title"], author=resume["name"], invariant=1,
)
document.build(story, onFirstPage=footer, onLaterPages=footer)
if document.page != 2:
    raise SystemExit(f"Expected two CV pages, produced {document.page}. Review the layout before committing.")

manifest = {
    "sources": {path: hashlib.sha256((ROOT / path).read_bytes()).hexdigest() for path in SOURCES},
    "pdfSha256": hashlib.sha256(OUTPUT.read_bytes()).hexdigest(),
    "pages": document.page,
}
(ROOT / "data/resume-pdf.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(f"Built {OUTPUT.relative_to(ROOT)} ({document.page} pages). Render and inspect both pages before committing.")
