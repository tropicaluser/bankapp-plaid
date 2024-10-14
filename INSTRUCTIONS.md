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
7. ⚙️ [Sentry Security](#sentry-security)
8. ⚙️ [Plaid Functionality](#plaid-functionality)
9. ⚙️ [Dwolla Environment](#dwolla-environment)
10. ⚙️ [Display Real Bank Data](#display-real-bank-data)
11. ⚙️ [Recent Transactions](#recent-transactions)
12. ⚙️ [Connect Multiple Bank Accounts](#connect-multiple-bank-accounts)
13. ⚙️ [Transaction History Page](#transaction-history-page)
14. ⚙️ [My Banks Page](#my-banks-page)

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
string - state - size: 1000 - req
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

commit: add footer & logout

## <a name="sentry-security">⚙️ Sentry Security</a>

https://sentry.io/welcome/ - sign in - quick start
create a project
```
platform: nextjs
> continue
npx @sentry/wizard@latest -i nextjs --saas --org org-b1 --project javascript-nextjs
MORE INFO @ SENTRY-SETUP.md
```

visit: localhost/sentry-example-page
click "throw error"
visit: https://org-b1.sentry.io/issues/
click "replays" - "open replay" 

## <a name="plaid-functionality">⚙️ Plaid Functionality</a>

visit: https://plaid.com - get started - business or developer - enter credentials - create account - verify email
click "Learn how to build with Plaid - quickstart" - 
click "platform - developers" - keys - "enable two-auth app" - 
copy to . env
```
# PLAID
PLAID_CLIENT_ID= (client_id)
PLAID_SECRET= (sandbox)
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions,identity
PLAID_COUNTRY_CODES=US,CA
```

`npm i plaid react-plaid-link dwolla-v2`

visit: https://plaid.com/docs/link/web/#create - Link Web SDK

visit: https://developers.dwolla.com/docs/balance/transfer-money-between-users/create-transfer

visit: https://cloud.appwrite.io/ - databases - bank - banks - create attributes
```
string - accountId - size: 2000 - req
string - bankId - size: 2000 - req
string - accessToken - size: 2000 - req
string - fundingSourceUrl - size: 2000 - req
string - shareableId - size: 2000 - req
relationship - one-way - users - many-to-one (change attribute key to userId) - on delete set null
```

click databases - banks - users - (should be empty)
click auth - remove all users

## <a name="dwolla-environment">⚙️ Dwolla Environment</a>

visit: <https://accounts-sandbox.dwolla.com/login> - create an account - verify email
click applications - copy key and secret to .env

visit: localhost/sign-up

<!--> 4 Errors (fixed in edited version)
--- 1. error "invalid state attr" ---
visit: <https://cloud.appwrite.io/> - databases - bank - banks - users - attributes
`string - state - size: 1000 - req`

- auth - remove users

visit: <https://dashboard-sandbox.dwolla.com/applications-legacy>

- customers - deactivate new customer

visit: localhost/sign-up

--- 2. error: "invalid password attr" ---

lib/actions/user.actions.ts - signup - change parameters

visit: <https://cloud.appwrite.io/>

- auth - remove users

visit: <https://dashboard-sandbox.dwolla.com/applications-legacy>

- customers - deactivate new customer

--- 3. error: "plaidlink component" ---
fix code in onSuccess function

--- 4. error: "user.actions - createLinkToken" ---
change client_name: user.name
to client_name: `${user.firstName} ${user.lastName}`,

<!-->

visit: localhost/sign-up - create account

```
first name: dev
last name: gonna
address: 1234 main st
city: New York City
state: NY
postal code: 11101
date of birth: 1984-01-01
ssn: 1234
email: email@email.com
password: password
```

- link account should be visible
- click connect bank - plaid link should be visible
- continue
```
select chase - continue to login
- enter username / password (coming from plaid dashboard)

visit: https://dashboard.plaid.com/overview
- developers - sandbox
```
username: user_good
password: pass_good
```

- integrations - enable dwolla

- first platypus bank - sign in with credentials
- (mobile) get code - submit
- select checking & saving
- tick boxes - continue
- tick terms - continue

- (success message) - continue
- automatically redirect to dashboard
```

## <a name="display-real-bank-data">⚙️ Display Real Bank Data</a>

visit: localhost

<!--> X Errors (fixed in edited version)

--- 1. error: "undefined accessToken" ---

--- 2. error: "Invalid query: Query value is invalid for attribute "$id"" ---

lib/actions/user.actions.ts - signin - create getUserInfo

<!-->

## <a name="recent-transactions">⚙️ Recent Transactions</a>

`npx shadcn@latest add tabs table`

## <a name="connect-multiple-bank-accounts">⚙️ Connect Multiple Bank Accounts</a>

visit: localhost
- click connect bank - continue - chase - continue to login - sign in with (user_good / pass_good)
- get code - submit - tick plaid saving - continue - tick terms - continue
- plaid saving should be visible

## <a name="transaction-history-page">⚙️ Transaction History Page</a>

...

## <a name="my-banks-page">⚙️ My Banks Page</a>

...

## <a name="transfer-payment-page">⚙️ Transfer Payment Page</a>

`npx shadcn@latest add select textarea`

appwrite - transactions attributes

```bash
string - name - size 100 - req (200)
string - amount size 100 - req
string - channel - size 100 - req
string - category - size 100 - req
string - senderId - size 1000 - req
string - recieverId - size 1000 - req
string - senderBankId - size 1000 - req
string - receiverBankId - size 1000 - req
string - email - size 100 - req
```

transfer money from savings to checking

visit: localhost/my-banks - copy savings (2nd) id
visit: localhost/payment-transfer
```
source: plaid checking
note: test transfer
email: email@email.com
sharable id: <copied id>
amount: 10.00
```
click "transfer funds"

- show up under recent transactions "test transfer" - processing

- appwrite - transactions document - one document created
- https://accounts-sandbox.dwolla.com/ - transfers - one document in processed (no new)
- customers - enter user - 10.00 pending
