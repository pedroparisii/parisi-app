<div align="center">
  <img src="https://i.ibb.co/Z6B3CPLc/pedroparisi.png" alt="parisi" width="70" />
  <h3>Not just a portfolio. A personal platform.</h3>
  <p>A developer site treated as a real product — with a public changelog, live integrations, and a custom admin panel.</p>
  <!-- <a href="https://pedroparisi.dev" target="_blank">Live Preview</a> ·
  <a href="https://github.com/pedroparisii/parisi-app" target="_blank">GitHub</a> -->
</div>

---

## About

This is my personal portfolio, built with the mindset that a developer's site should *be* a product, not a static resume.

Instead of a name, a photo, and a project list, it's a living platform: dedicated case-study pages, real-time presence integrations, a learning board I update as I grow, and a custom admin panel that commits changes straight to this repo.

> [!NOTE]
> There's no traditional database. Content lives as versioned JSON in the repo, edited through an authenticated admin panel that writes back via the GitHub API.

## Features

- 🏠 **Bento home** — featured project, changelog preview, live clock, and integrations in a responsive grid
- 📁 **Work** — hybrid layout of featured cards and a compact list, with per-project case-study pages
- 🎵 **Spotify now-playing** — shows the track I'm listening to live, falling back to my last played
- 🟢 **Discord presence** — real-time online/idle/dnd status via Lanyard WebSocket
- 🧠 **Learning board** — skills I'm mastering, learning, and planning next
- 🔐 **Admin panel** — password-protected control panel to edit projects & skills
- 🌙 **Dark / Light mode** — persisted across sessions

## Technologies

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)

## Tools

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![MDX](https://img.shields.io/badge/MDX-1B1F24?style=for-the-badge&logo=mdx&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

## Architecture

The project keeps a clean separation between data, integrations, and UI:

- **`data/`** — versioned JSON (`projects.json`, `skills.json`) as the content source of truth
- **`lib/`** — server-side helpers: GitHub commit flow, Spotify auth, session handling
- **`content/work/`** — MDX case studies, one file per project page
- **`components/`** + **`app/`** — UI and routes, organized by feature (home, work, about, admin)

Integrations run server-side where secrets are involved (Spotify, GitHub), exposing only safe data to the client. The Discord status connects directly via a public WebSocket.

## Development Notes

This site is an ongoing project, the public changelog is part of the point.

I deliberately avoided a database. After hitting free-tier inactivity pauses on hosted Postgres, I moved to a Git-backed model: content is JSON in the repo, and the admin panel commits edits through the GitHub API, triggering a redeploy. Everything is versioned, free, and never sleeps.

AI was used as a pair programming tool throughout for architecture decisions, debugging, and design exploration. All product decisions and final implementation were my own.

## Challenges

Spotify and Discord both needed careful handling of the auth boundary — keeping refresh tokens server-side while still streaming live data to a client component without leaking credentials.

Several hydration mismatches came from `Math.random()` running in server components; replacing random animation timings with deterministic, index-based values made server and client output identical.