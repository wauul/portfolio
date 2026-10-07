"""Build the French and English AI engineering CVs from one maintained source."""
from pathlib import Path
import argparse
import shutil
from xml.sax.saxutils import escape

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Flowable, Paragraph, SimpleDocTemplate
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
PHOTO = ROOT / "scripts/assets/cv-portrait.png"
INK, ACCENT, MUTED = map(HexColor, ["#172D38", "#24767D", "#52666F"])
WIDTH, HEIGHT = A4

CONTENT = {
    "fr": {
        "role": "Développeur full-stack | Ingénieur IA / ML",
        "availability": "Marseille | Mobilité France / remote | Disponible immédiatement",
        "profile": "Développeur full-stack spécialisé en IA / ML, avec deux formations orientées IA. Je conçois des assistants métier, des pipelines RAG et des agents Python, de l’intégration API à l’évaluation. Mon parcours associe deux ans d’alternance chez ROKI, des missions freelance et des projets personnels en IA générative et vision par ordinateur.",
        "sections": ["COMPÉTENCES", "EXPÉRIENCE PROFESSIONNELLE", "PROJETS IA SÉLECTIONNÉS", "FORMATION", "LANGUES"],
        "skills": [
            ("Full-stack", "Python, TypeScript / JavaScript, React / Next.js, Node.js, FastAPI / Flask, intégrations API."),
            ("LLM & RAG", "LangChain, LangGraph, Azure OpenAI / AI Search, Groq, embeddings, reranking, sorties structurées / Pydantic."),
            ("Bases de données", "SQL, PostgreSQL, pgvector, Prisma."),
            ("DevOps & cloud", "Git, Docker, GitHub Actions, Azure, Cloudflare, Vercel."),
            ("Machine learning & vision", "PyTorch, scikit-learn, TensorFlow / Keras, CNN, transfer learning."),
            ("Évaluation & monitoring", "Ragas, Langfuse, Sentry, OpenTelemetry, Grafana."),
        ],
        "jobs": [
            ("Développeur full-stack", "Freelance | 2024 - présent", [
                "Développé un assistant IA de planification : tâches à partir de briefs et propositions de replanification tenant compte des dépendances, congés et capacités via Lucca.",
                "Conçu un workflow email vers actions : extraction des demandes et échéances, préparation de mises à jour documentaires et de réponses à valider avec les API Microsoft.",
            ]),
            ("Développeur full-stack", "ROKI, Marseille | Alternance | Sept. 2022 - août 2024", [
                "Développé un assistant documentaire RAG avec Azure OpenAI et Azure AI Search : réponses appuyées sur des passages sources, checklists d’onboarding et signalement d’informations manquantes ou contradictoires.",
                "Développé un module Python / Flask de multidiffusion d’offres sur Azure et des intégrations API pour les services métier Node.js / PostgreSQL.",
            ]),
            ("Développeur indépendant", "Fiverr | 2016 - 2021", [
                "Réalisé des applications web React / Angular, mobiles Flutter et desktop Java pendant mes études.",
            ]),
        ],
        "projects": [
            ("Ragbench", "Construit un laboratoire RAG pour comparer embeddings et reranking, évaluer les réponses avec Ragas et analyser les workflows LangGraph avec Langfuse."),
            ("PatchGoblin", "Développé un agent de correction de CI : diagnostic, patch ciblé, tests en sandbox Docker et pull request à relire."),
            ("QueryOtter", "Développé un agent d’analyse PostgreSQL avec FastAPI et LangGraph : plans d’exécution, réécritures et vérifications avant recommandation."),
            ("Zoidberg-AI", "Comparé des classifieurs de radiographies thoraciques : CNN, transfer learning VGG16, matrices de confusion avec TensorFlow / Keras."),
        ],
        "education": [
            ("MSc Pro, Epitech", "Marseille | 2022 - 2024 | Spécialité IA, Bac+5 / RNCP niveau 7."),
            ("Master Systèmes informatiques et décisions", "Université Badji Mokhtar, Annaba | 2019 - 2021. Projet : recommandation pour la santé mentale étudiante."),
        ],
        "languages": "Français et anglais courants | Arabe : langue maternelle",
    },
    "en": {
        "role": "Full-stack Developer | AI / ML Engineer",
        "availability": "Marseille | France-wide mobility / remote | Available immediately",
        "profile": "Full-stack developer specializing in AI / ML, with two AI-focused degrees. I build business assistants, RAG pipelines and Python agents, from API integration to evaluation. My experience combines two years as an apprentice at ROKI, freelance delivery and personal projects in generative AI and computer vision.",
        "sections": ["SKILLS", "PROFESSIONAL EXPERIENCE", "SELECTED AI PROJECTS", "EDUCATION", "LANGUAGES"],
        "skills": [
            ("Full-stack", "Python, TypeScript / JavaScript, React / Next.js, Node.js, FastAPI / Flask, API integrations."),
            ("LLM & RAG", "LangChain, LangGraph, Azure OpenAI / AI Search, Groq, embeddings, reranking, structured outputs / Pydantic."),
            ("Databases", "SQL, PostgreSQL, pgvector, Prisma."),
            ("DevOps & cloud", "Git, Docker, GitHub Actions, Azure, Cloudflare, Vercel."),
            ("Machine learning & vision", "PyTorch, scikit-learn, TensorFlow / Keras, CNNs, transfer learning."),
            ("Evaluation & monitoring", "Ragas, Langfuse, Sentry, OpenTelemetry, Grafana."),
        ],
        "jobs": [
            ("Full-stack developer", "Freelance | 2024 - present", [
                "Built an AI planning assistant that turns briefs into draft tasks and proposes revised schedules considering dependencies, leave and team capacity through Lucca.",
                "Built email-to-workflow automation: extracting requests and dates, preparing document updates and drafting replies for user review through Microsoft APIs.",
            ]),
            ("Full-stack developer", "ROKI, Marseille | Apprenticeship | Sept. 2022 - Aug. 2024", [
                "Built a RAG knowledge assistant with Azure OpenAI and Azure AI Search: source-grounded answers, onboarding checklists and flags for missing or conflicting information.",
                "Developed a Python / Flask job-posting distribution module on Azure and API integrations for Node.js / PostgreSQL business services.",
            ]),
            ("Independent developer", "Fiverr | 2016 - 2021", [
                "Delivered React / Angular web apps, Flutter mobile apps and Java desktop software alongside my studies.",
            ]),
        ],
        "projects": [
            ("Ragbench", "Built a RAG lab to compare embeddings and reranking, evaluate answers with Ragas and inspect LangGraph workflows through Langfuse."),
            ("PatchGoblin", "Built a CI repair agent: diagnosis, bounded patches, Docker sandbox tests and pull requests for human review."),
            ("QueryOtter", "Built a PostgreSQL investigation agent with FastAPI and LangGraph: execution plans, rewrites and checks before recommendations."),
            ("Zoidberg-AI", "Compared chest X-ray classifiers using CNNs, VGG16 transfer learning and confusion matrices with TensorFlow / Keras."),
        ],
        "education": [
            ("MSc Pro, Epitech", "Marseille | 2022 - 2024 | AI specialization, master's-level qualification / RNCP level 7."),
            ("Master's in Information Systems & Decision Support", "Badji Mokhtar University, Annaba | 2019 - 2021. Thesis: recommendations for student mental health."),
        ],
        "languages": "French and English: fluent | Arabic: native",
    },
}


def register_fonts():
    for name, filename in [("Segoe", "segoeui.ttf"), ("Segoe-Bold", "seguisb.ttf")]:
        pdfmetrics.registerFont(TTFont(name, str(Path("C:/Windows/Fonts") / filename)))
    pdfmetrics.registerFontFamily("Segoe", normal="Segoe", bold="Segoe-Bold", italic="Segoe", boldItalic="Segoe-Bold")


STYLES = {
    "profile": ParagraphStyle("profile", fontName="Segoe", fontSize=10, leading=13, textColor=INK, spaceAfter=3),
    "body": ParagraphStyle("body", fontName="Segoe", fontSize=9.5, leading=12, textColor=INK, spaceAfter=3),
    "job": ParagraphStyle("job", fontName="Segoe-Bold", fontSize=10, leading=12.5, textColor=INK, spaceBefore=3, keepWithNext=True),
    "date": ParagraphStyle("date", fontName="Segoe", fontSize=8.8, leading=11.3, textColor=MUTED, spaceAfter=3, keepWithNext=True),
    "bullet": ParagraphStyle("bullet", fontName="Segoe", fontSize=9.5, leading=12, textColor=INK, leftIndent=9, firstLineIndent=-9, spaceAfter=3),
    "small": ParagraphStyle("small", fontName="Segoe", fontSize=9.1, leading=11.5, textColor=INK, spaceAfter=3),
}


class Section(Flowable):
    def __init__(self, title):
        super().__init__()
        self.title, self.height, self.keepWithNext = title, 22, True

    def wrap(self, available_width, available_height):
        self.width = available_width
        return available_width, self.height

    def draw(self):
        self.canv.setFillColor(ACCENT)
        self.canv.setFont("Segoe-Bold", 9)
        self.canv.drawString(0, 6, self.title)
        self.canv.setStrokeColor(HexColor("#DAE6E7"))
        self.canv.setLineWidth(0.6)
        self.canv.line(pdfmetrics.stringWidth(self.title, "Segoe-Bold", 9) + 12, 9, self.width, 9)


def header(canvas, doc, content):
    canvas.setFillColor(HexColor("#F0F5F5"))
    canvas.rect(0, HEIGHT - 139, WIDTH, 139, fill=1, stroke=0)
    canvas.setFillColor(ACCENT)
    canvas.rect(0, HEIGHT - 139, 5, 139, fill=1, stroke=0)
    canvas.setFillColor(INK)
    canvas.setFont("Segoe-Bold", 29)
    canvas.drawString(38, HEIGHT - 44, "Wael Fezari")
    canvas.setFillColor(ACCENT)
    canvas.setFont("Segoe-Bold", 11.5)
    canvas.drawString(38, HEIGHT - 65, content["role"])
    canvas.setFillColor(INK)
    canvas.setFont("Segoe", 8.6)
    canvas.drawString(38, HEIGHT - 87, content["availability"])
    canvas.drawString(38, HEIGHT - 103, "waelfezari@gmail.com | +33 6 98 36 74 26")
    canvas.linkURL("mailto:waelfezari@gmail.com", (38, HEIGHT-105, 142, HEIGHT-95), thickness=0)
    canvas.linkURL("tel:+33698367426", (151, HEIGHT-105, 258, HEIGHT-95), thickness=0)
    canvas.setFont("Segoe", 8.1)
    canvas.setFillColor(MUTED)
    x = 38
    links = [("linkedin.com/in/wael-fezari", "https://www.linkedin.com/in/wael-fezari/"), ("github.com/wauul", "https://github.com/wauul"), ("wael-fezari.vercel.app", "https://wael-fezari.vercel.app/")]
    for label, url in links:
        canvas.drawString(x, HEIGHT - 121, label)
        width = pdfmetrics.stringWidth(label, "Segoe", 8.1)
        canvas.linkURL(url, (x, HEIGHT-124, x+width, HEIGHT-113), thickness=0)
        x += width + 15
    center_x, center_y, radius = WIDTH - 78, HEIGHT - 59, 37
    canvas.setFillColor(white)
    canvas.circle(center_x, center_y, radius+3, fill=1, stroke=0)
    canvas.saveState()
    clip = canvas.beginPath()
    clip.circle(center_x, center_y, radius)
    canvas.clipPath(clip, stroke=0)
    canvas.drawImage(str(PHOTO), center_x-radius, center_y-radius, 2*radius, 2*radius, mask="auto")
    canvas.restoreState()
    canvas.setFont("Segoe", 8)
    canvas.setFillColor(MUTED)
    canvas.drawString(38, 19, "Wael Fezari")
    canvas.drawRightString(WIDTH-38, 19, f"{doc.page} / 1")


def build(language):
    content = CONTENT[language]
    def p(text, style="body"):
        return Paragraph(text, STYLES[style])
    def entry(label, text, style="body"):
        return p(f"<b>{escape(label)}</b> - {escape(text)}", style)
    sections = content["sections"]
    story = [p(escape(content["profile"]), "profile"), Section(sections[0])]
    story += [entry(label, text) for label, text in content["skills"]]
    story += [Section(sections[2])]
    story += [entry(label, text, "small") for label, text in content["projects"]]
    story += [Section(sections[1])]
    for title, dates, bullets in content["jobs"]:
        story += [p(escape(title), "job"), p(escape(dates), "date")]
        story += [p("- " + escape(text), "bullet") for text in bullets]
    story += [Section(sections[3])]
    story += [entry(label, text, "small") for label, text in content["education"]]
    story += [Section(sections[4]), p(escape(content["languages"]), "small")]
    output = ROOT / "public" / ("Wael-Fezari-CV.pdf" if language == "fr" else "Wael-Fezari-CV-EN.pdf")
    doc = SimpleDocTemplate(str(output), pagesize=A4, topMargin=150, bottomMargin=34, leftMargin=38, rightMargin=38, title=f"Wael Fezari - {content['role']}", author="Wael Fezari")
    doc.build(story, onFirstPage=lambda c,d:header(c,d,content), onLaterPages=lambda c,d:header(c,d,content))
    reader = PdfReader(output)
    assert len(reader.pages) == 1, f"{language}: expected one page, got {len(reader.pages)}"
    text = reader.pages[0].extract_text()
    for token in ["Wael Fezari", *sections, "Azure OpenAI", "LangGraph", "Ragas", "Grafana", "Cloudflare", "Zoidberg-AI", "Pydantic", "Lucca", "Microsoft", "ROKI"]:
        assert token in text, f"{language}: missing {token}"
    assert "60%" not in text and "60 %" not in text
    assert reader.pages[0].images, "Missing portrait"
    assert len(reader.pages[0].get("/Annots", [])) >= 3, "Missing contact links"
    if language == "fr":
        shutil.copy2(output, ROOT / "public/Wael-Fezari-CV-FR.pdf")
    print(f"Built {output.name}: one page, {len(text)} extracted characters")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--lang", choices=["fr", "en", "both"], default="both")
    args = parser.parse_args()
    register_fonts()
    for language in (["fr", "en"] if args.lang == "both" else [args.lang]):
        build(language)


if __name__ == "__main__":
    main()
