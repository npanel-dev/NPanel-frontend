<a name="readme-top"></a>

<div align="center">

<img width="160" src="./assets/logo.png" alt="NPanel logo">

<h1>NPanel 前端</h1>

**为 NPanel 打造的现代化 Web 工作台，清晰、开放、适合长期运营。**

[English](./README.md)
.
[报告问题][issues-link]
.
[请求功能][issues-link]

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

## 项目简介

NPanel Frontend 是 [NPanel][profile-link] 的官方前端工作区，将用户端、管理端、支付门户和文档站放在同一个 React monorepo 中维护，帮助团队用统一的代码库交付一致的产品体验。

项目面向真实运营场景：快速部署、多语言界面、响应式仪表盘、清晰的订阅与支付流程，以及可复用的 UI 与服务层封装。

当前默认版本：**1.0.5**。

---

## 应用列表

| 应用 | 预览 |
| :--- | :--- |
| [**NPanel 用户端**][NPanel-user-web-github]<br/>面向用户的门户，覆盖账号、订阅、支付、文档、工单与流量信息。<br/>[![一键部署](https://img.shields.io/badge/Deploy%20with-Vercel-blue?style=for-the-badge)][NPanel-user-web-deploy] | [![预览][NPanel-user-web-cover]][NPanel-user-web-preview] |
| [**NPanel 管理端**][NPanel-admin-web-github]<br/>面向运营者的控制台，覆盖节点、产品、用户、订单、工单、公告、日志与系统配置。<br/>[![一键部署](https://img.shields.io/badge/Deploy%20with-Vercel-blue?style=for-the-badge)][NPanel-admin-web-deploy] | [![预览][NPanel-admin-web-cover]][NPanel-admin-web-preview] |

---

## 本地开发

你可以使用 GitHub Codespaces 进行在线开发：

[![][codespaces-shield]][codespaces-link]

也可以克隆到本地开发：

```bash
git clone https://github.com/npanel-dev/NPanel-frontend.git
cd NPanel-frontend

# 安装依赖
bun install

# 启动用户端开发服务器
bun run dev --filter=NPanel-user-web

# 启动管理端开发服务器
bun run dev --filter=NPanel-admin-web

# 启动支付门户开发服务器
bun run dev --filter=NPanel-payment-portal

# 启动文档站开发服务器
bun run docs:dev
```

---

## 构建

```bash
# 构建所有应用
bun run build

# 构建文档站
bun run docs:build
```

---

## 参与贡献

NPanel Frontend 欢迎 Bug 反馈、文档改进、翻译、功能建议和代码贡献。

[![][pr-welcome-shield]][pr-welcome-link]

[![][contributors-contrib]][contributors-url]

<div align="right">

[![][back-to-top]](#readme-top)

</div>

---

## 许可证

版权所有 © 2026 [NPanel Development Team][profile-link]。<br />
本项目使用 [GNU 通用公共许可证](./LICENSE)。

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
