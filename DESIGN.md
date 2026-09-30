# Signal Atlas

## Product and audience

Wael Fezari's portfolio helps recruiters and technical clients evaluate full-stack and applied AI work, download a CV, and make contact. Project records, experience, social destinations, routes and contact payloads remain factual. Main surface: Experience; CV and contact: Operate.

## Three directions considered

- **Signal Atlas, chosen:** an engineering exhibition. Asymmetric type and orbit geometry connect interfaces, intelligence and integrations. Space Grotesk with IBM Plex Mono for measurement. Graphite `#111214`, chalk `#f4f5f7`, vermilion `#ff5c39`. Precise circular linework, square controls with 8px corners, scroll-controlled spatial transitions. Recognizable by its three-strand signal sculpture, outlined display words and signal rails.
- **Code Workshop:** a tactile build notebook. Compact two-column annotations, instrument photography and sectional diagrams. Warm white `#faf8f2`, navy `#132338`, yellow `#f4b942`. Humanist sans, tabular annotations, hard rectangular panels, mechanical sliding reveals. Approachable for client work, less suited to the requested cinematic motion.
- **Motion Poster:** a typographic exhibition. Oversized stacked lettering, edge-to-edge demo cuts, restrained navigation and bold lateral wipes. White `#ffffff`, black `#101010`, pink `#e93875`. Condensed sans, sharp angles and kinetic letter sequences. Expressive, but less efficient for assessing technical breadth.

Signal Atlas makes the connected-systems specialty visible while giving actual applications and project descriptions room to lead. Motion intensity 8, composition variance 7, density 4. No speculative claims or fabricated proof.

## System

| Role | Light | Dark |
| --- | --- | --- |
| Background | `#f4f5f7` | `#111214` |
| Raised surface | `#ffffff` | `#1b1d21` |
| Secondary surface | `#e9ebef` | `#24272d` |
| Text | `#17191e` | `#f1f2f4` |
| Muted text | `#555c68` | `#afb4be` |
| Border | `#cbd0d8` | `#3c414b` |
| Accent | `#bb351d` | `#ff785b` |
| Accent fill | `#bb351d` | `#ff785b` |
| Text on accent | `#ffffff` | `#151515` |
| Error | `#ae213d` | `#ff99ae` |
| Success | `#247345` | `#91d4ac` |

Font: self-hosted Space Grotesk variable (body/display), IBM Plex Mono regular (coordinates, technology notation, counters). Body 16px minimum, 1.65 line height, measure about 65ch. Display 48–96px, tracking -0.04em maximum. No mixed serif emphasis. Tokens own both modes; system preference is used unless a saved override exists.

Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Container 1380px maximum with 48px desktop and 20px mobile gutters. Borders 1px. Main surfaces use open composition, not repeated nested cards. Demo framing is a functional viewport. Control radius 8px; major project frames 16px. Feather icons from the existing react-icons library. Status messages use text plus semantic color. Layers: content 0, sticky header 20, menu 30.

Voice: concrete and personal. Titles identify work; buttons state actions. Complete sentences keep punctuation; short headings and labels omit decorative periods. External-link indicators only for external destinations. No version strings, made-up metrics or decorative badges.

## Motion thesis

Focal moment: a three-dimensional signal sculpture made of three interwoven point/line strands. It rotates gently, responds to pointer position and separates into depth as the hero scrolls. Labels tie the geometry to interfaces, AI and integrations. The authored geometry is rendered in a bounded canvas; it stops offscreen, when hidden, and for reduced motion. A static geometric fallback remains without JavaScript.

Continuity: the hero knot unwinds into three ribbons as it leaves the page. The desktop project reel follows a curved 3D path with depth, banking and gentle rotation; mobile remains a native swipe carousel. Scroll rendering follows the input with a short interpolation tail, without replacing native scrolling. Chapter controls jump directly to a readable composition.

The journey keeps one continuous set of 2,037 vertices across all five chapters. Its artwork morphs from a gaming screen/controller to a code terminal, a folded neural brain, a connected team and a delivered application with client feedback. The geometry changes continuously; camera movement, depth sorting and a small transition curl make the transformation spatial. Only the active chapter text is shown, avoiding overlapping paragraphs. Rendering stops offscreen and in hidden tabs; unchanged frames reuse the existing bitmap. Reduced motion keeps five readable static chapter diagrams.

Professional illustrations describe actual work: team scheduling and Lucca sync, document retrieval and Azure OpenAI, and Microsoft SAML/Office alongside a separate Bubble operations application. They are labelled feature schematics. Flow lines animate only while visible. Reduced motion stops ornamental movement while retaining functional navigation. Individual demo recordings retain play/pause controls.

Feedback: 150ms press feedback, 220ms control changes, 600ms spatial settling, cubic-bezier(0.16,1,0.3,1). Page content is visible by default. No custom cursor, scroll hijacking, timer-driven slide advance or compulsory intro. Reduced motion presents the journey as a normal readable list and stops autoplay demos until the visitor chooses to play them.

## Implementation coverage checklist

- [x] Header, navigation, mobile menu, language popover, theme controls and system reduced-motion support
- [x] Hero, sculpture, CV links, technology strip
- [x] Professional projects, bilingual type tags and detail disclosures
- [x] Nine personal projects ordered by depth and usefulness, bilingual type tags, six animated demos and three actual interface previews, chapter controls, image failure, mobile swipe
- [x] About, skills, experience and education
- [x] Personal story and reduced-motion alternative
- [x] Visitor panel, loading, partial failure and retry
- [x] Contact validation, disabled/sending, success/error and direct email fallback
- [x] Footer, 404/error surfaces, metadata, favicon and social image
- [x] Light/dark, French/English, mobile/tablet/desktop, keyboard, focus, overflow and reduced motion
- [x] Build, lint, existing functional tests and local endpoint checks

Verification details and explicit limits are recorded in [docs/redesign-verification.md](docs/redesign-verification.md).

## References used

Read [Taste](https://github.com/Leonxlnx/taste-skill/blob/main/skills/taste-skill/SKILL.md), [Impeccable](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/SKILL.md) and its craft/motion references, and [UI UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md) with its interaction quick reference. Their generic defaults are subordinate to the supplied brief. No external skill launcher was installed or run.

Browsed [21st parallax components](https://21st.dev/community/components/explore/parallax-components) and [magnetic interaction guidance](https://21st.dev/blog/react-magnetic-cursor-effects). Used spatial continuity and bounded pointer response as reference, with original implementation; no registry component code was copied. Reviewed [awesome-ai-tools-for-ui](https://github.com/maxbogo/awesome-ai-tools-for-ui) and followed its [Zajno motion reference](https://motion.zajno.com/). Other directory tools were not installed or claimed as used. Local browser tools provide verification.
