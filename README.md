<a name="readme-top"></a>

<div align="center">

<img width="160" src="./assets/logo.png" alt="NPanel logo">

<h1>NPanel Frontend</h1>

**Modern web interfaces for a clean, open, and operator-friendly proxy panel.**

[中文](./README.zh-CN.md)
.
[Report Bug][issues-link]
.
[Request Feature][issues-link]

[官网 Website](https://npanel.dev/) | [Telegram 频道](https://t.me/mynpanel) | [Telegram 群组](https://t.me/NPanelChat)

[![][version-shield]][repo-link]
[![][github-action-test-shield]][github-action-test-link]
[![][github-contributors-shield]][github-contributors-link]
[![][github-forks-shield]][github-forks-link]
[![][github-stars-shield]][github-stars-link]
[![][github-issues-shield]][github-issues-link]
[![][github-license-shield]][github-license-link]

![][split]

</div>

---

## About

NPanel Frontend is the official web workspace for [NPanel][profile-link]. It brings the user portal, admin console, payment portal, and documentation into one React monorepo so teams can ship a consistent product experience from one codebase.

The project is built for real operators: fast setup, multilingual interfaces, responsive dashboards, clear subscription flows, and maintainable UI packages shared across apps.

Current default version: **1.0.5**.

---

## Applications

| Application | Preview |
| :--- | :--- |
| [**NPanel User Web**][NPanel-user-web-github]<br/>A clean user portal for account access, subscriptions, payments, documents, tickets, and traffic visibility.<br/>[![One-Click Deploy](https://img.shields.io/badge/Deploy%20with-Vercel-blue?style=for-the-badge)][NPanel-user-web-deploy] | [![Preview][NPanel-user-web-cover]][NPanel-user-web-preview] |
| [**NPanel Admin Web**][NPanel-admin-web-github]<br/>An operator console for nodes, products, users, orders, tickets, announcements, logs, and system configuration.<br/>[![One-Click Deploy](https://img.shields.io/badge/Deploy%20with-Vercel-blue?style=for-the-badge)][NPanel-admin-web-deploy] | [![Preview][NPanel-admin-web-cover]][NPanel-admin-web-preview] |

---

## Local Development

You can use GitHub Codespaces for online development:

[![][codespaces-shield]][codespaces-link]

Or clone it for local development:

```bash
git clone https://github.com/npanel-dev/NPanel-frontend.git
cd NPanel-frontend

# Install dependencies
bun install

# Start the user portal dev server
bun run dev --filter=NPanel-user-web

# Start the admin portal dev server
bun run dev --filter=NPanel-admin-web

# Start the payment portal dev server
bun run dev --filter=NPanel-payment-portal

# Start the docs dev server
bun run docs:dev
```

---

## Build

```bash
# Build all applications
bun run build

# Build documentation
bun run docs:build
```

---

## Contributing

NPanel Frontend welcomes bug reports, documentation improvements, translations, feature proposals, and code contributions.

[![][pr-welcome-shield]][pr-welcome-link]

[![][contributors-contrib]][contributors-url]

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

## License

Copyright © 2026 [NPanel Development Team][profile-link].<br />
This project is licensed under the [GNU General Public License](./LICENSE).

<!-- LINK GROUP -->

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square
[codespaces-link]: https://codespaces.new/npanel-dev/NPanel-frontend
[codespaces-shield]: https://github.com/codespaces/badge.svg
[contributors-contrib]: https://contrib.rocks/image?repo=npanel-dev/NPanel-frontend
[contributors-url]: https://github.com/npanel-dev/NPanel-frontend/graphs/contributors
[github-action-test-link]: https://github.com/npanel-dev/NPanel-frontend/actions/workflows/test.yml
[github-action-test-shield]: https://img.shields.io/github/actions/workflow/status/npanel-dev/NPanel-frontend/test.yml?label=test&labelColor=black&logo=githubactions&logoColor=white&style=flat-square
[github-contributors-link]: https://github.com/npanel-dev/NPanel-frontend/graphs/contributors
[github-contributors-shield]: https://img.shields.io/github/contributors/npanel-dev/NPanel-frontend?color=c4f042&labelColor=black&style=flat-square
[github-forks-link]: https://github.com/npanel-dev/NPanel-frontend/network/members
[github-forks-shield]: https://img.shields.io/github/forks/npanel-dev/NPanel-frontend?color=8ae8ff&labelColor=black&style=flat-square
[github-issues-link]: https://github.com/npanel-dev/NPanel-frontend/issues
[github-issues-shield]: https://img.shields.io/github/issues/npanel-dev/NPanel-frontend?color=ff80eb&labelColor=black&style=flat-square
[github-license-link]: https://github.com/npanel-dev/NPanel-frontend/blob/main/LICENSE
[github-license-shield]: https://img.shields.io/github/license/npanel-dev/NPanel-frontend?color=white&labelColor=black&style=flat-square
[github-stars-link]: https://github.com/npanel-dev/NPanel-frontend/stargazers
[github-stars-shield]: https://img.shields.io/github/stars/npanel-dev/NPanel-frontend?color=ffcb47&labelColor=black&style=flat-square
[issues-link]: https://github.com/npanel-dev/NPanel-frontend/issues/new/choose
[pr-welcome-link]: https://github.com/npanel-dev/NPanel-frontend/pulls
[pr-welcome-shield]: https://img.shields.io/badge/pr_welcome-%E2%86%92-ffcb47?labelColor=black&style=for-the-badge
[profile-link]: https://github.com/npanel-dev
[repo-link]: https://github.com/npanel-dev/NPanel-frontend
[split]: https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/rainbow.png
[version-shield]: https://img.shields.io/badge/version-1.0.5-blue?labelColor=black&style=flat-square
[NPanel-user-web-github]: https://github.com/npanel-dev/NPanel-frontend/tree/main/apps/user
[NPanel-user-web-cover]: https://urlscan.io/liveshot/?width=1920&height=1080&url=https://user.npanel.dev
[NPanel-user-web-preview]: https://user.npanel.dev
[NPanel-user-web-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnpanel-dev%2FNPanel-frontend&root-directory=apps%2Fuser&project-name=npanel-user-web&repository-name=NPanel-frontend&skippable-integrations=1
[NPanel-admin-web-github]: https://github.com/npanel-dev/NPanel-frontend/tree/main/apps/admin
[NPanel-admin-web-cover]: https://urlscan.io/liveshot/?width=1920&height=1080&url=https://admin.npanel.dev
[NPanel-admin-web-preview]: https://admin.npanel.dev
[NPanel-admin-web-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnpanel-dev%2FNPanel-frontend&root-directory=apps%2Fadmin&project-name=npanel-admin-web&repository-name=NPanel-frontend&skippable-integrations=1
