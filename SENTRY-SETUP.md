◇   ────────────────────────────────────────────────────────────────────────────────────────────────╮
│                                                                                                   │
│  The Sentry Next.js Wizard will help you set up Sentry for your application.                      │
│  Thank you for using Sentry :)                                                                    │
│                                                                                                   │
│  Version: 3.34.0                                                                                  │
│                                                                                                   │
│  This wizard sends telemetry data and crash reports to Sentry. This helps us improve the Wizard.  │
│  You can turn this off at any time by running sentry-wizard --disable-telemetry.                  │
│                                                                                                   │
├───────────────────────────────────────────────────────────────────────────────────────────────────╯
│
▲  You have uncommitted or untracked files in your repo:
│
│  - INSTRUCTIONS.md
│
│  The wizard will create and update files.
│
◇  Do you want to continue anyway?
│  Yes
│
◇  Do you already have a Sentry account?
│  Yes
│
●  If the browser window didn't open automatically, please open the following link to log into Sentry:
│
│  https://sentry.io/account/settings/wizard/...
│
◇  Login complete.
│
◇  Selected project org-b1/javascript-nextjs
│
◇  Installed @sentry/nextjs@^8 with NPM.
│
◇  Do you want to route Sentry requests in the browser through your Next.js server to avoid ad blockers?
│  No
│
●  Sounds good! We'll leave the option commented for later, just in case :)
│
◇  Do you want to enable React component annotations to make breadcrumbs and session replays more readable?
│  Yes
│
◇  Do you want to enable Tracing to track the performance of your application?
│  Yes
│
◇  Do you want to enable Sentry Session Replay to get a video-like reproduction of errors during a user session?
│  Yes
│
◆  Created fresh sentry.server.config.ts.
│
◆  Created fresh sentry.client.config.ts.
│
◆  Created fresh sentry.edge.config.ts.
│
◆  Added new instrumentation.ts file.
│
◆  Added Sentry configuration to next.config.mjs. (you probably want to clean this up a bit!)
│
◆  Created app\global-error.tsx.
│
◇  Do you want to create an example page ("/sentry-example-page") to test your Sentry setup?
│  Yes
│
◆  Created app\sentry-example-page\page.tsx.
│
◆  Created app\api\sentry-example-api\route.ts.
│
◆  Created .env.sentry-build-plugin with auth token for you to test source map uploading locally.
│
◆  Added .env.sentry-build-plugin to .gitignore.
│
◇  Are you using a CI/CD tool to build and deploy your application?
│  Yes
│
◇  Add the Sentry authentication token as an environment variable to your CI setup:

SENTRY_AUTH_TOKEN=sntrys_...

│
▲  DO NOT commit this auth token to your repository!
│
◇  Did you configure CI as shown above?
│  Yes, continue!
│
└
Successfully installed the Sentry Next.js SDK!

You can validate your setup by (re)starting your dev environment (e.g. npm run dev) and visiting "/sentry-example-page"  

If you encounter any issues, let us know here: https://github.com/getsentry/sentry-javascript/issues