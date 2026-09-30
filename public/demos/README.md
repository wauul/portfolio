# Personal project demos

Place recordings here as `rag-bench.gif`, `study-room.gif`, `watchtower.gif`,
`are-we-vibing.gif`, `recipe-buddy.gif`, and `hooka-relay.gif`.

Each recording is mapped to `/demos/<id>.gif` in
`src/app/lib/personal-projects.js`. Recordings are shown without cropping.
Static first frames live in `stills/<id>.webp`. Only a visible, active demo
animates; each recording has a play/pause control. Reduced motion starts with
the still frame. Failed images retain a readable placeholder.

Actual static previews live in `previews/`: QueryOtter's published investigation
screen and PatchGoblin's verified repair screen come from their public repository
documentation; GetRatchet was captured from its public synthetic demo console at
`https://getratchet.app/dashboard?demo=1`. These are labelled interface previews
or a sample workspace, with no video playback control. No private user data or
private repository destination is included.

The section pins one stage below the site header while scrolling through all nine
projects. Vertical scrolling moves complete projects horizontally like a carousel,
with a slight additional depth offset on the demo panel. The timing uses the same
chapter function as My Journey, including a reading pause on the final project.
Numbered controls jump to a project. Track height scales with the project count;
the mobile chapter rail scrolls horizontally and keeps the selected number visible.
When scrolling stops during a transition, the carousel settles smoothly onto the
nearest complete project. Touch gestures finish before settling; scrolling beyond
the section is never pulled back.
At 760px and below, the section becomes a native horizontal swipe carousel with
the same chapter controls. Desktop reduced motion uses a normal vertical list.
Long desktop copy can scroll within its panel. Inactive pinned projects are
excluded from keyboard focus and assistive technology. The GIF panel itself moves
with each transition. Chapter jumps suppress settling so the chosen project stays
selected.
