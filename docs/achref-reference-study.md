# Reference study and hero direction

Reference: [Achraf Arabi portfolio](https://www.achref.dev/), inspected in the live browser on 1 October 2026. Observations describe the rendered experience, not an audit of its private implementation. Scope agreed with Wael: hero and transition into projects. Subsequent direction: extend the parallax journey, change the WF treatment, strengthen pointer interaction and the sense of discovery.

## What makes the reference work

The opening is an experience that occupies the whole viewport. An enormous red pixel monogram sits behind oversized black type on pale green. Small biographical details sit at opposite upper edges. Navigation is quiet; the composition has one dominant artifact rather than a text column alongside an illustration.

Its five hero chapters create a narrative: a flat identity gains depth, becomes a studio with a desk and monitor, opens a threshold, leads through to a spatial project gallery, and finishes with a hands-on sculpture. The important mechanism is continuity: the red pixels, portal and camera connect the scenes. Moving foreground cubes, distant screens and a floor establish different depths. Typography stays at the edge of the scene, and a small chapter rail gives visitors a way to skip ahead. The fifth chapter offers shape controls and a pixel-lens option.

The pale outside world and dark gallery make crossing the threshold feel consequential. Lighting, rounded edges, physical materials and object scale sell the three-dimensional space. Large headings communicate short ideas; supporting text stays relatively small. The result is closer to entering an exhibition than reading a standard developer landing page.

After the hero, the process section uses footage of the maker and three clear steps. The about section adds a stylized character, audio introduction and a short account of interests. These human elements make the technical display feel personal. Work uses large, visually distinct project worlds instead of repeated small cards. The nine project destinations cover different categories and aesthetics. Contact returns to an oversized invitation, a direct email link and a minimal closing identity.

One inspected project, Gyraya, extends that idea into its own branded experience: Greek terrace illustration, strong blue and pink, actual mobile screens, a screen selector, interactive food composition and loyalty-level exploration. This shows that the portfolio's projects are experiences themselves rather than just screenshots in a list. Other project detail pages were not individually audited.

## Translation into Wael's identity

Keep graphite/chalk, vermilion, Space Grotesk, French/English content and the full-stack/AI/systems positioning. The full-viewport exhibition is an extension of Signal Atlas. Its geometry, handwritten WF signature, story and artwork are original. The reference's monogram, studio, character, branding and copy are not reused. Later user-supplied Libou and Karnain screenshots informed the direction of the cinematic project advertisements; they are visual references, not copied artwork or audited implementations.

| Movement | Wael's scene | Job |
| --- | --- | --- |
| Identity | Handwritten WF signature from authored cubic strokes and flourish, built from 6,111 shared particles; orbiting visit context | Personal first impression, pointer scatter and spring return |
| Journey | The same particles become a gaming screen/controller, code terminal, neural brain, connected team and delivered application | Tell five factual stages of the personal journey |
| Threshold | Camera zoom through a particle portal | Connect the story to the project exhibition |
| Projects | Nine successive full-bleed original artwork advertisements, with shared particles morphing through project contour forms behind them | Give every project a distinct symbolic world and a direct path to its details |
| Invitation | Last project returns to the signature, which pulses, bursts apart and reforms before an open “Your idea” composition | Carry the same identity into an orbiting seed and contact CTA |

The native sticky track is 1800svh on desktop and 1600svh on mobile. Scroll input has a short interpolation tail; native page scrolling remains intact. Chapter controls bypass the long journey, the site navigation reaches readable work, and the CV remains available in the opening. There is no mandatory loader or timed introduction. Pause stops ambient and pointer motion while chapter navigation remains available. Reduced motion or renderer failure collapses the track into a readable identity with expandable full journey text and access to the detailed project lab below.

The opening context displays local time, approximate IP location, local weather and IP in a slow orbit and fades on departure. Loading and unavailable states are explicit. The former lower visitor panel and separate Connect pieces section are removed. Work and experience now group professional projects under their actual roles, with education retained.

Each project advertisement places its title, one phrase and CTA over a generated raster with cinematic three-dimensional lighting and materials. These are symbolic artworks, not application screenshots and not animated models of their depicted subjects. Subtle image drift and bounded pointer pan/tilt, hover zoom, lighting and CTA response animate the presentation. Desktop uses landscape framing; mobile uses a portrait crop and bottom overlay. The advertisement sequence has no next-project arrows or repeated scroll prompts. Its exact project ID is sent through the portfolio-project event and reflected in the matching URL hash. The detailed personal lab retains actual screenshots and demonstrations, technologies, factual descriptions and public links.

## Implementation and practical limits

Three.js is loaded separately from the main UI. A bounded shared point cloud, capped pixel ratio, visibility checks and explicit disposal limit the rendering cost. The particles morph continuously across signature, five personal shapes, portal and nine original contour forms; camera and ambient motion provide depth. The advertising images are nine original built-in image_gen rasters in public/hero-art. Their exact prompts and generated origins are recorded in [hero-art-prompts.json](hero-art-prompts.json); embedded prompt metadata was checked across all nine files with none missing.

Production build, lint and 27 tests passed. Tests cover finite and unique project particle forms, continuous handoffs and the final burst returning before the invitation appears. Native wheel traversal visited all nine project names in order; all nine images were complete with nonzero natural width. Desktop and mobile screenshots were inspected, and pointer wake variables and visible artwork zoom were observed. Exact detail jumps were checked for GetRatchet on the current desktop build, and earlier for RecipeBuddy on desktop and Hooka Relay on mobile with unchanged handlers. The current reduced-motion build reported data-static=true with a collapsed 896px hero; clearing the preference restored the normal journey. The current browser error check returned no errors.

Pointer scatter and native-wheel explosion were observed before the final handwritten signature geometry update; that update changed geometry only. These checks establish the sampled behavior, not a frame-rate guarantee on physical devices or an audit of all nine detailed projects. Current evidence is summarized in [hero-verification.md](hero-verification.md); the valid finish captures are the world-* files in .impeccable/review, not obsolete art-* captures.
