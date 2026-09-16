from pathlib import Path

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Flowable, Paragraph, SimpleDocTemplate
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PHOTO = ROOT.parent / "tmp" / "photo_source" / "0_X4.jpg"
OUTPUT = ROOT / "public" / "Wael-Fezari-CV-EN.pdf"

for name, filename in (("Segoe", "segoeui.ttf"), ("Segoe-Bold", "seguisb.ttf")):
    pdfmetrics.registerFont(TTFont(name, str(Path("C:/Windows/Fonts") / filename)))
pdfmetrics.registerFontFamily(
    "Segoe",
    normal="Segoe",
    bold="Segoe-Bold",
    italic="Segoe",
    boldItalic="Segoe-Bold",
)

INK = HexColor("#172D38")
ACCENT = HexColor("#24767D")
MUTED = HexColor("#52666F")
WIDTH, HEIGHT = A4

styles = {
    "profile": ParagraphStyle(
        "profile", fontName="Segoe", fontSize=10.5, leading=14, textColor=INK, spaceAfter=6
    ),
    "body": ParagraphStyle(
        "body", fontName="Segoe", fontSize=10.3, leading=13.5, textColor=INK, spaceAfter=4
    ),
    "bullet": ParagraphStyle(
        "bullet",
        fontName="Segoe",
        fontSize=10.3,
        leading=13.5,
        textColor=INK,
        leftIndent=10,
        firstLineIndent=-9,
        spaceAfter=4,
    ),
    "job": ParagraphStyle(
        "job",
        fontName="Segoe-Bold",
        fontSize=11,
        leading=14,
        textColor=INK,
        spaceBefore=4,
        spaceAfter=1,
        keepWithNext=True,
    ),
    "date": ParagraphStyle(
        "date",
        fontName="Segoe",
        fontSize=9.2,
        leading=12,
        textColor=MUTED,
        spaceAfter=5,
        keepWithNext=True,
    ),
    "skill": ParagraphStyle(
        "skill", fontName="Segoe", fontSize=10, leading=13, textColor=INK, spaceAfter=4
    ),
    "small": ParagraphStyle(
        "small", fontName="Segoe", fontSize=9.5, leading=12.5, textColor=INK, spaceAfter=5
    ),
}


def paragraph(text, style="body"):
    return Paragraph(text, styles[style])


class Section(Flowable):
    def __init__(self, title):
        super().__init__()
        self.title = title
        self.height = 25
        self.keepWithNext = True

    def wrap(self, available_width, available_height):
        self.width = available_width
        return available_width, self.height

    def draw(self):
        canvas = self.canv
        canvas.setFillColor(ACCENT)
        canvas.setFont("Segoe-Bold", 9)
        canvas.drawString(0, 7, self.title)
        title_width = pdfmetrics.stringWidth(self.title, "Segoe-Bold", 9)
        canvas.setStrokeColor(HexColor("#DAE6E7"))
        canvas.setLineWidth(0.6)
        canvas.line(title_width + 12, 10, self.width, 10)


def draw_header(canvas, document):
    canvas.setFillColor(HexColor("#F0F5F5"))
    canvas.rect(0, HEIGHT - 153, WIDTH, 153, fill=1, stroke=0)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, HEIGHT - 153, 5, 153, fill=1, stroke=0)
    canvas.setFillColor(INK)
    canvas.setFont("Segoe-Bold", 31)
    canvas.drawString(40, HEIGHT - 48, "Wael Fezari")

    role = Paragraph(
        "Full-Stack &amp; AI Developer",
        ParagraphStyle(
            "role", fontName="Segoe-Bold", fontSize=12.3, leading=16, textColor=ACCENT
        ),
    )
    _, role_height = role.wrap(385, 38)
    role.drawOn(canvas, 40, HEIGHT - 59 - role_height)

    canvas.setFont("Segoe", 9.1)
    canvas.setFillColor(INK)
    canvas.drawString(40, HEIGHT - 98, "Marseille  |  France-wide mobility  |  Available immediately")
    canvas.drawString(40, HEIGHT - 114, "waelfezari@gmail.com  |  +33 6 98 36 74 26")

    canvas.setFont("Segoe", 8.4)
    canvas.setFillColor(MUTED)
    links = [
        ("linkedin.com/in/wael-fezari", "https://www.linkedin.com/in/wael-fezari/"),
        ("github.com/wauul", "https://github.com/wauul"),
        ("wael-fezari.vercel.app", "https://wael-fezari.vercel.app/"),
    ]
    x = 40
    for index, (label, url) in enumerate(links):
        canvas.drawString(x, HEIGHT - 132, label)
        link_width = pdfmetrics.stringWidth(label, "Segoe", 8.4)
        canvas.linkURL(url, (x, HEIGHT - 135, x + link_width, HEIGHT - 122), relative=0, thickness=0)
        x += link_width + 13
        if index < 2:
            canvas.drawString(x - 9, HEIGHT - 132, "-")

    center_x, center_y, radius = WIDTH - 83, HEIGHT - 65, 42
    canvas.setFillColor(white)
    canvas.circle(center_x, center_y, radius + 3, fill=1, stroke=0)
    canvas.saveState()
    clip = canvas.beginPath()
    clip.circle(center_x, center_y, radius)
    canvas.clipPath(clip, stroke=0)
    canvas.drawImage(
        str(PHOTO), center_x - radius, center_y - radius, 2 * radius, 2 * radius, mask="auto"
    )
    canvas.restoreState()

    canvas.setFillColor(ACCENT)
    canvas.circle(42, 22, 2, stroke=0, fill=1)
    canvas.setFont("Segoe", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(50, 19, "Wael Fezari")
    canvas.drawRightString(WIDTH - 40, 19, "1 / 1")


story = [
    paragraph(
        "Full-stack developer specializing in AI, with two years of apprenticeship experience at ROKI followed by two years of freelance work. Experienced in Azure RAG chatbots, Microsoft integrations and business-focused JavaScript components. I build complete AI applications, from the interface to backend services.",
        "profile",
    ),
    Section("TECHNICAL SKILLS"),
    paragraph("<b>Development:</b> Python, FastAPI, Flask, JavaScript, TypeScript, React, Next.js, Node.js.", "skill"),
    paragraph("<b>Applied AI:</b> Azure OpenAI, Azure AI Search, RAG, chatbots, LLM integration.", "skill"),
    paragraph("<b>Cloud &amp; data:</b> Azure, GCP, AWS, Docker, SQL, PostgreSQL, Git, GitLab.", "skill"),
    paragraph("<b>Integrations:</b> REST APIs, JSON, XML, SAML SSO, Microsoft Entra ID, Bubble.io.", "skill"),
    Section("PROFESSIONAL EXPERIENCE"),
    paragraph("Full-stack developer &amp; AI integrations", "job"),
    paragraph("Freelance - 2024 to present", "date"),
    paragraph("- Built a native JavaScript Bubble.io planning plugin for architecture teams, with a timeline, draggable and resizable tasks, completion tracking and PDF export.", "bullet"),
    paragraph("- Integrated Lucca to retrieve leave and submit reported time when a task is marked done, while accounting for public holidays, weekends and absences.", "bullet"),
    paragraph("- Delivered a Microsoft integration with SAML SSO, Outlook, Word, Excel and PowerPoint connectivity, plus AI features through Microsoft OpenAI services.", "bullet"),
    paragraph("- Built a Bubble.io business application for inventory, order and delivery management.", "bullet"),
    paragraph("Full-stack developer", "job"),
    paragraph("ROKI - Marseille - Apprenticeship - September 2022 to August 2024", "date"),
    paragraph("- Developed an enterprise chatbot using Azure OpenAI and Azure AI Search for document retrieval and contextual RAG answers, with Bubble.io and Docker.", "bullet"),
    paragraph("- Developed a Python/Flask job-posting distribution module using Azure and XML/JSON exchanges.", "bullet"),
    paragraph("- Contributed to a waste-management application using Node.js, JavaScript, PostgreSQL, AWS and Bubble.io.", "bullet"),
    paragraph("Independent developer", "job"),
    paragraph("Fiverr - 2016 to 2021", "date"),
    paragraph("Web applications with React and Angular, mobile applications with Flutter, and Java desktop software; Next.js portfolio."),
    Section("EDUCATION"),
    paragraph("<b>MSc Pro, Epitech</b> - Marseille - 2022 to 2024<br/>Web, mobile and desktop development, specializing in AI - Master's-level qualification, RNCP level 7.", "small"),
    paragraph("<b>Master's in Information Systems &amp; Decision Support</b> - 2016 to 2021<br/>Badji Mokhtar University, Annaba. Thesis project: a recommendation system applied to student mental health.", "small"),
    Section("LANGUAGES"),
    paragraph("<b>French and English</b> fluent  -  <b>Arabic</b> native language", "small"),
]

document = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    topMargin=165,
    bottomMargin=36,
    leftMargin=40,
    rightMargin=40,
    title="Wael Fezari - Full-Stack & AI Developer",
    author="Wael Fezari",
)
document.build(story, onFirstPage=draw_header, onLaterPages=draw_header)

reader = PdfReader(OUTPUT)
assert len(reader.pages) == 1, f"Expected one page, got {len(reader.pages)}"
text = "".join(page.extract_text() or "" for page in reader.pages)
for token in ("Wael Fezari", "Full-Stack", "TECHNICAL SKILLS", "PROFESSIONAL EXPERIENCE", "EDUCATION", "LANGUAGES", "Azure", "TypeScript"):
    assert token in text, f"Missing expected text: {token}"
assert len(reader.pages[0].images) >= 1, "Expected the profile photograph to be embedded"
print(f"Created {OUTPUT} ({len(text)} extracted characters, one page)")
