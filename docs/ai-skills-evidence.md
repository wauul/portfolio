# AI engineering skills update

## Current presentation

At the owner's request, the two skills displays are merged into a single “Compétences & outils / Skills & tools” section. Six compact groups now run in this order: full-stack development, LLM/RAG, databases, DevOps/cloud, ML/vision, evaluation/monitoring. Full-stack leads to preserve the owner's developer identity; LLM/RAG follows for the target AI engineering jobs, with database and deployment skills in the middle. The CV uses the same order, and the hero and page titles also put full-stack development first. SkillTrail and Zoidberg-AI remain portfolio project references. The separate “Outils de travail” rail, its duplicate data and its reveal observer were removed. The notes below document the research and earlier iterations, not additional visible skills or assertions of completed model training.

Reviewed on 2026-10-07. The visible portfolio has a bilingual, navigable skills section before work and experience. The French and English CVs target AI/ML engineer positions while leading with full-stack development and using the same core skills. They select Ragbench, PatchGoblin, QueryOtter and Zoidberg-AI as project examples.

The owner's follow-up supplies three professional AI features used in both the CVs and bilingual portfolio: planning/rescheduling with dependency, leave and capacity checks; a source-grounded ROKI knowledge/onboarding assistant; and email-to-workflow automation with user-reviewed document updates and replies. These descriptions are owner-provided experience, rather than claims independently verified from public client code. Other suggested features, including stock forecasting, campaign analytics and background-task diagnosis, were not added. Historical job titles and dates are preserved. Azure AI Search, embeddings, reranking, Pydantic, Flask, SQL and API integration complete the visible skills to match the CV.

Synchronization correction: fetched GitHub and fast-forwarded `main` from `3003b14` to `7cc242c` (eight commits). Preserved the upstream grouped signal rail, reveal behavior, legacy cleanup and dependency changes. Added AI and monitoring tools to that rail alongside the detailed section. Reapplied the pre-existing local CV edits and untracked files; the complete pre-sync state is retained in the named Git stash `portfolio-before-sync-ai-skills-2026-10-07`.

## Implementation evidence

Source paths below are relative to `C:/Users/Waul/Documents/ChatGPT/` unless otherwise noted. Repository code establishes implementation, not provider availability or production outcomes.

| Area | Evidence inspected |
| --- | --- |
| LangChain / LangGraph | `PatchGoblin/worker/decision_graph.py`: RunnableLambda nodes, bounded StateGraph and validation. `QueryOtter/backend/generation.py`: schema-grounded generation and StateGraph. `Ragbench/backend/graph_pipeline.py`, `investigator.py`, `optimization.py`, `debugger.py`: checkpointed benchmark and investigative workflows. |
| Structured outputs / guardrails | `QueryOtter/backend/generation.py`: Pydantic Draft, JSON response format, bounded read-only queries, clarification on unresolved metadata. `PatchGoblin/worker/decision_graph.py`: explicit prepare/infer/validate workflow. |
| RAG / embeddings / reranking | `Ragbench/backend/retrieval.py`: SentenceTransformer and CrossEncoder. `Ragbench/backend/chains.py`, `graph_index.py`: retrieval and Chroma. `Study Room/lib/rag/embeddings.ts`, `ingest.ts`, `retrieval.ts`: local embeddings and PostgreSQL vector retrieval. Enterprise Azure OpenAI / Azure AI Search work is documented in the existing portfolio's `professional-work.js`. |
| Evaluation / LLMOps | `Ragbench/backend/prompts.py`: versioned prompt snapshots, Ragas faithfulness, relevancy, precision and recall. `Ragbench/backend/observability.py`: optional metadata-only Langfuse. `PatchGoblin/worker/evaluate.py`, `llmops.py`: evaluation and Langfuse integration. `QueryOtter/backend/llmops.py` and `tests/test_llmops.py`: observability and evaluation checks. |
| Monitoring | GetRatchet and Hooka Relay package manifests and telemetry implementations include Sentry and OpenTelemetry. PatchGoblin's `telemetry/` and worker telemetry plus QueryOtter's monitoring tests demonstrate instrumentation. Study Room's `lib/telemetry/` covers RAG operations. PatchGoblin and QueryOtter web entry points include Vercel Analytics / Speed Insights. LangSmith automatic tracing is explicitly disabled in inspected workflows, so it is not listed as an implemented monitoring destination. |
| Supporting engineering | Existing project manifests, code and portfolio project records establish Python, TypeScript, FastAPI, Pydantic, React, Next.js, Node.js, SQL/PostgreSQL, Prisma, Docker, GitHub Actions, RabbitMQ and Vercel. |
| SkillTrail / machine learning | The owner requested a standard ML skills group with SkillTrail as its project reference. The available pack at `C:/Users/Waul/Documents/Codex/2026-10-07/i-x20/outputs/skilltrail/` documents PyTorch, scikit-learn, LightGBM, knowledge tracing, ranking, calibration and temporal validation. `prompts/01_train_correctness_baseline.md` specifies MLflow experiments and DVC provenance. The public UI lists the owner's stack without development-status copy; these local documents alone do not establish completed training or model-serving results. |
| Zoidberg-AI / computer vision | Inspected the GitHub repository's README and notebooks on 2026-10-07 using authenticated read access. `notebooks/zoidberg-vcg-transfer-learning.ipynb` imports TensorFlow/Keras, NumPy, scikit-learn, Pillow and Matplotlib; creates an ImageNet-pretrained VGG16 classifier; freezes/unfreezes base-model layers; and generates confusion matrices and classification reports. The README also documents a CNN classifier. No accuracy or clinical-use claims were copied into the portfolio. |

No proficiency percentages, production metrics, completed model-training claims or Kubernetes expertise were added. Machine Learning and Computer Vision now use the same grouped skills presentation as the other disciplines, with SkillTrail and Zoidberg-AI as their project references. Both are also represented in the grouped signal rail. The existing nine personal showcase projects and their hero assets remain intact.

The follow-up “Outils de travail” update expands the rail to ten groups, separating RAG/retrieval from evaluation/LLMOps and including the full ML, computer vision and monitoring vocabulary. It also adds Pydantic, Prisma, SQL, RabbitMQ and Vercel from the existing project-backed engineering skills. Existing cloud, mobile and DevOps tools remain visible.

## Current hiring signals

A qualitative sample of employer job listings guided emphasis, not claims of market-wide prevalence:

- [Creatio AI Engineer](https://jobs.eu.lever.co/creatio/2c0c0c2d-cffb-40db-8b38-0068aefa1696): agent orchestration, structured outputs, RAG, embeddings, reranking, evaluation, tracing, cost control and privacy/security.
- [Build AI Engineer — Harness & Evals](https://jobs.ashbyhq.com/build/cdf0c29b-157e-4b85-a767-e72211022c96/): retrieval, tool orchestration, evaluation and tracing in the indexed listing; the direct page requires JavaScript.
- [Jeeves Senior AI Engineer](https://jobs.lever.co/tryjeeves/66241934-7138-4d7d-8b05-a211ec5d6e24): LLM APIs, distributed tracing and AI system health in the indexed listing.

## Verification

- `npm run lint`: passed.
- `npm test`: all 28 existing tests passed.
- `npm run build`: production build passed.
- Impeccable detector for the new component and modified page/styles: no findings.
- Built app at `http://localhost:3017/#skills`: initial layout inspected in English desktop/light and French mobile/dark at 390 × 844; mobile navigation closes and reaches the section, with no horizontal document overflow. Follow-up adds the Machine Learning and Computer Vision groups and removes the separate SkillTrail aside.
- `git diff --check`: passed. The initial skills iteration did not include a commit, push or deployment.

## CV and portfolio follow-up verification

- Regenerated both CV languages with `scripts/build_cv.py`; each has one page, selectable text, portrait and working link annotations. The French alias is identical to the default French PDF.
- Rendered and visually inspected both complete pages: no clipped text, overlaps or missing glyphs.
- Re-ran lint, all 28 tests and the production build successfully after the bilingual professional-feature and skills updates.
- Checked the built app at `http://localhost:3024`: both `/api/cv?lang=fr` and `/api/cv?lang=en` return PDF bytes identical to their regenerated files, with the correct download filename.
- Headless browser checks covered French mobile (390 × 844) and English desktop (1440 × 1000): skills, all three selected professional features, language-specific CV links and no horizontal document overflow. Final screenshots were inspected locally.
- The job shortlist records three accessible employer listings and separates inferred fit from explicit requirements. No applications were submitted.
