### Pre-setup

Figma File: https://resource.jsmastery.pro/banking-app
Flow Diagram: https://resource.jsmastery.pro/banking-app-flow

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Setup](#setup)
2. ⚙️ [File & Folder Structure](#file-structure)
3. ⚙️ [Home Page UI](#home-page-ui)
4. ⚙️ [Sidebar](#sidebar)
5. ⚙️ [Auth Page UI](#auth-page-ui)

## <a name="setup">🤖 Setup</a>

npx create-next-app@latest ./ --typescript --tailwind --eslint

```bash
√ Would you like to use `src/` directory? ... No
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to customize the default import alias (@/*)? ... No
```

`cd folder`

gh repo create bankapp-plaid --public --source=. --remote=origin

npx shadcn@latest init

```bash
✔ Preflight checks.
✔ Verifying framework. Found Next.js.
✔ Validating Tailwind CSS.
✔ Validating import alias.
√ Which style would you like to use? » Default
√ Which color would you like to use as the base color? » Slate
√ Would you like to use CSS variables for theming? ... yes
```

`npx shadcn@latest add button`

Copy assets from https://github.com/adrianhajdin/banking/blob/main/README.md - Assets
put into root folder.

## <a name="file-structure">🤖 File structure</a>

...

## <a name="home-page-ui">⚙️ Home Page UI</a>

npm i query-string react-countup chart.js react-chartjs-2

## <a name="sidebar">⚙️ Sidebar</a>

commit: "add sidebar right"
`npx shadcn@latest add sheet`

commit: "add sidebar left"

...

## <a name="auth-page-ui">⚙️ Auth Page UI</a>

`npx shadcn@latest add form input`
