# Personal project demos

Place recordings here as `rag-bench.gif`, `study-room.gif`, `watchtower.gif`,
`are-we-vibing.gif`, `recipe-buddy.gif`, and `hooka-relay.gif`.

Set the corresponding `demo` field in `src/app/lib/personal-projects.js` to
`/demos/<filename>.gif`. Until then, each project displays a designed placeholder.
GIFs play only when the visitor chooses Play demo and can be stopped. Failed
images return to a readable placeholder. Recordings are shown without cropping.

The section pins one stage below the site header while scrolling through all six
projects. Vertical scrolling moves complete projects horizontally like a carousel,
with a slight additional depth offset on the demo panel. The timing uses the same
chapter function as My Journey, including a reading pause on the final project.
Numbered controls jump to a project.
When scrolling stops during a transition, the carousel settles smoothly onto the
nearest complete project. Touch gestures finish before settling; scrolling beyond
the section is never pulled back.
Short and narrow viewports retain the pinned carousel; longer copy can scroll
within its panel. Reduced motion switches directly between individual projects
without sliding. Only the no-JavaScript fallback uses a vertical list. Inactive
projects are excluded from keyboard focus and assistive technology. The GIF panel
itself moves with each transition.
