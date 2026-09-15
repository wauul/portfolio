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
Reduced motion, no JavaScript, and viewports too short to fit the content use a
readable vertical layout. Inactive pinned projects are excluded from keyboard
focus and assistive technology. The GIF panel itself moves with each transition.
