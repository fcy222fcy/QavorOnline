# Qavor — Project Showcase / Landing Page

Qavor 项目展示官网（Demo Landing Page），用于 GitHub 项目主页展示、校招简历 Demo，以及让技术面试官快速了解项目是什么、解决什么问题、用了什么技术、作者负责什么。

> 展示项目本身：**Qavor** — 面向开发者的 AI Agent 构建、扩展、运行与观测平台。
> 真实仓库：<https://github.com/6moran/Qavor>

本站为**纯静态单页应用**，无后端、无数据库，所有演示数据均为 Mock，最终通过 **GitHub Pages** 免费部署。

---

## 技术栈

- **Vue 3** + **TypeScript** + **Vite**
- **Tailwind CSS v4**（通过 `@tailwindcss/vite` 插件）
- **Lucide Icons**（图标）
- 轻量交互：滚动揭示（IntersectionObserver）、Hover 态、锚点平滑滚动，**未引入任何动画库**

## 目录结构

```text
.
├── .github/workflows/deploy.yml   # GitHub Pages 自动部署
├── public/
│   ├── favicon.svg
│   └── screenshots/               # 真实截图放入此目录（缺失则用 Mock 占位）
├── src/
│   ├── components/                # 各页面区块组件（Navbar / Hero / Features / Architecture / RagPipeline / Trace / Evaluation / Screenshots / Contribution / TechStack / EngineeringHighlights / Footer / Overview）
│   ├── data/project.ts            # ★ 全部文案与数据集中在此（含 GitHub / Demo 链接）
│   ├── directives/reveal.ts       # 滚动揭示指令
│   ├── App.vue
│   ├── main.ts
│   └── style.css                  # 设计令牌（深色主题）
├── index.html
├── vite.config.ts                 # ★ 自动推断 GitHub Pages base 路径
└── package.json
```

---

## 本地运行

要求 Node.js ≥ 20.19（推荐 22）。

```bash
npm install
npm run dev          # 开发服务器，默认 http://localhost:5173
npm run build        # 类型检查 + 生产构建，产物在 dist/
npm run preview      # 本地预览构建产物
```

> 类型检查通过 `vue-tsc --noEmit`；若只想构建可临时将 `package.json` 的
> `build` 脚本改为 `vite build`。

---

## 部署到 GitHub Pages

1. 把本仓库推送到 GitHub（默认监听 `main` 分支的 push）。
2. 仓库 **Settings → Pages → Build and deployment → Source** 选择
   **GitHub Actions**。
3. 推送后 Actions 会自动执行 `npm ci` → `npm run build` → 上传 `dist` → 部署。
4. 访问 `https://<user>.github.io/<repo>/`。

### base 路径如何确定

`vite.config.ts` 会**自动从 git remote 推断仓库名**来设置 `base`：

- 普通项目仓库 `<user>/<repo>` → base = `/<repo>/`
- 用户/组织页 `<user>/<user>.github.io` → base = `/`

如需强制指定，修改 `vite.config.ts` 中 `inferRepo()` 的 fallback 值即可，
**不要**把仓库名散落到多个文件。

---

## 你需要替换的内容

所有可替换项都集中在 `src/data/project.ts` 顶部与 `site` 对象：

| 位置 | 说明 |
| --- | --- |
| `site.githubUrl` | 项目 GitHub 地址（当前指向 `6moran/Qavor`） |
| `site.liveDemoUrl` | “Live Demo” 按钮目标，默认页面内锚点 `#screenshots`，可改为真实 Demo 链接 |
| `public/screenshots/*.png` | 真实截图；缺失时自动显示 Mock UI |
| `hero.*` / `features` / `contribution.*` 等 | 文案、技术标签、个人贡献等 |

> 文案均依据 Qavor 真实仓库 README 提取；凡属“预留 / 未实现”的能力在页面中以
> Mock / 占位明确区分，未作伪造成已完成的呈现。

---

## 设计要点

- 深色主题（`#080A0C` 背景、`#111418` 卡片、低透明度灰边框），蓝色 / Cyan / Emerald 点缀。
- 大量使用等宽字体（JetBrains Mono）呈现技术标签、TraceID、SpanID、指标值。
- 无 emoji、无紫色渐变、无卡通插画，偏向 Developer Infrastructure 视觉语言。
- 响应式：PC 优先，移动端导航折叠为抽屉、架构图与流水线简化为纵向堆叠。
