### Pre-setup

Figma File: https://resource.jsmastery.pro/banking-app
Flow Diagram: https://resource.jsmastery.pro/banking-app-flow

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Setup](#setup)
2. ⚙️ [File & Folder Structure](#file-structure)
3. ⚙️ [Home Page UI](#home-page-ui)
4. ⚙️ [Sidebar](#sidebar)
5. ⚙️ [Auth Page UI](#auth-page-ui)
6. ⚙️ [Appwrite Authentication](#appwrite-authentication)

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

commit: "auth pages & skeleton auth form"

`npx shadcn@latest add form input`

commit "custom input"

...

## <a name="appwrite-authentication">⚙️ Appwrite Authentication</a>

commit: add appwrite authentication & database

https://appwrite.io/ - get started - create project 
```
name:jsm_banking
region: frankfurt
```
copy project id to .env NEXT_PUBLIC_APPWRITE_PROJECT

add .env NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1

click "API key" - "name: jsm_bank_node" - "select all" - create
copy api key secret to .env NEXT_APPWRITE_KEY

click "overview" - databases - create database - "bank" - create
copy database id to .env APPWRITE_DATABASE_ID

click "create collection" - "users" - "create"
copy users id to .env APPWRITE_USER_COLLECTION_ID

click "create collection "banks" - create
click "create collection "transactions" - create

set users attributes
```
email - email - req
string - userId - size: 2000 - req
string - dwollaCustomerUrl - size: 2000 - req
string - dwollaCustomerId - size: 2000 - req
string - firstName - size: 100 - req
string - lastName - size: 100 - req
string - address1 - size: 100 - req
string - city - size: 100 - req
string - postalCode - size: 10 - req
string - dateOfBirth - size: 100 - req
string - ssn - size: 50 - req
```

visit: https://appwrite.io/docs/tutorials/nextjs-ssr-auth/step-1
click "step2"
click "step3" - Initialize SDK - copy to "lib/appwrite.js" (edited)

`npm i node-appwrite`

click "step4" - Get the logged in user - copy to lib/actions/user.actions.ts
click "step5" - Create sign up page - signUpWithEmail - copy line 17-27 - copy to lib/actions/user.actions.ts - signup (edited)

visit: localhost/sign-up - create an account - Link Account should be visible

commit: add sign-in

visit localhost/sign-in - login


