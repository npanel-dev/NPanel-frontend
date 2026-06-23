---
layout: home

tk:
  teekHome: false

hero:
  name: NPanel
  text: Open Modern Control
  tagline: Operate proxy infrastructure with a clear, open-source control plane.
  actions:
    - theme: brand
      text: Install NPanel
      link: /guide/installation/
    - theme: alt
      text: Project Overview
      link: /guide/intro
  image:
    src: /logo.svg
    alt: NPanel

features:
  - icon: 🎯
    title: Complete Management
    details: Provision servers, wire nodes, bundle subscriptions, and launch products from one console.
  - icon: 💼
    title: Business Operations
    details: Automate coupons, campaigns, orders, and announcements with built-in workflows.
  - icon: 👥
    title: User Support System
    details: Rich user directory, ticketing, and docs so teams can resolve requests quickly.
  - icon: 📊
    title: Data Analytics
    details: Twelve log channels surface traffic, balance, and commission insights at a glance.
  - icon: 🔧
    title: Flexible Configuration
    details: Payments, auth policies, ads, and system toggles stay configurable without rebuilds.
  - icon: 🚀
    title: Modern Tech Stack
    details: React 19 + TypeScript + TailwindCSS + shadcn/ui deliver a fast, themeable interface.
  - icon: 🛡️
    title: Hardened Backend
    details: Go 1.21+ service built on go-zero, Gin, Gorm, and Asynq keeps gateways stable and private.
  - icon: 🐳
    title: Turnkey Deployments
    details: Build the backend source with Docker Compose for reproducible NPanel deployments.
---

## Full Stack Overview

NPanel spans three repositories working together:

- **[Frontend](https://github.com/npanel-dev/NPanel-frontend)** — React 19 UI + VitePress docs for both admin and user portals.
- **[NPanel Backend](https://github.com/npanel-dev/NPanel-backend)** — Go APIs focusing on privacy, observability, and multi-protocol orchestration.
- **[NPanel Node](https://github.com/npanel-dev/NPanel-node)** — node-side connectivity service managed from the NPanel admin console.

### Frontend experience

- Responsive dashboards, granular permissions, and live counters designed for daily operator workflows.
- Shared component system (shadcn/ui + TailwindCSS) keeps admin and user spaces visually aligned.
- Documentation and guides live side-by-side with the product so teams always deploy from the latest instructions.

### Backend foundation

- Multi-protocol relay for Shadowsocks, V2Ray, Trojan, and Trojan-Go backed by go-zero generated APIs.
- Node lifecycle automation (heartbeat, registration, version checks, rolling updates) to keep edges healthy.
- Business domains such as subscriptions, billing, payments, orders, and tickets mirror what you configure in the UI.
- Privacy-first defaults — user activity logs stay off unless explicitly enabled; Docker configs live in `configs/config.docker.yaml`.
- Flexible delivery: Go binaries per platform, Makefile targets, and Docker Compose source builds from `npanel-dev/NPanel-backend`.

### Gateway & deployment

The one-click installer clones `npanel-dev/NPanel-backend`, builds the local `npanel:latest` image, and starts MySQL, Redis, HTTP, and gRPC services with Docker Compose.

::: tip Docker quickstart
```bash
curl -fsSL https://npanel.dev/scripts/en/install-docker.sh | sudo bash && \
curl -fsSL https://npanel.dev/scripts/en/install-npanel.sh | bash
```
:::

#### Recommended workflow

1. Run the one-click installer, or clone `npanel-dev/NPanel-backend` and use `docker compose up -d --build`.
2. Review `configs/config.docker.yaml` and `.env` before production use.
3. Upgrade by pulling the backend source and rebuilding the Compose stack.
4. Troubleshoot with `docker compose logs -f npanel`.
