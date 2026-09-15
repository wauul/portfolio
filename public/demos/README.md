# Personal project demos

Place recordings here as `rag-bench.gif`, `study-room.gif`, `watchtower.gif`,
`are-we-vibing.gif`, `recipe-buddy.gif`, and `hooka-relay.gif`.

Set the corresponding `demo` field in `src/app/lib/personal-projects.js` to
`/demos/<filename>.gif`. Until then, each project displays a designed placeholder.
GIFs play only when the visitor chooses Play demo and can be stopped. Failed
images return to a readable placeholder. Recordings are shown without cropping.

The section pins one stage below the site header while scrolling through all six
projects. Demo panels move and scale during each transition; body copy stays in
place and switches to the current project. Numbered controls jump to a project.
Reduced motion, no JavaScript, and viewports too short to fit the content use a
readable vertical layout. Inactive pinned projects are excluded from keyboard
focus and assistive technology. The GIF panel itself moves with each transition.
