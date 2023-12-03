# Node.js Example App with SSO and Directory Sync powered by WorkOS

An example application demonstrating how to use the [WorkOS Node.js SDK](https://github.com/workos/workos-node) to authenticate users via SSO.

## Prerequisites

Node.js version 10+

## Node.js Project Setup

1. Clone the repo:

   ```bash
   # HTTPS
   git clone https://github.com/CatsAreMLG/SSO_DS.git
   ```

2. Install the dependencies.
   ```bash
   npm install
   ```

## Configure your environment

3. Grab your API Key, Client ID, Organization ID, Directory ID, and the URL of your app (if you choose to deploy it, not needed for local project) from your WorkOS Dashboard. Note: you will get the Organization ID and Directory ID while following the steps for SSO and Directory Sync listed below. Create a `.env` file at the project root, and store them like so:

   ```bash
   WORKOS_API_KEY=sk_xxxxxxxxxxxxx
   WORKOS_CLIENT_ID=project_xxxxxxxxxxxx
   WORKOS_ORGANIZATION_ID=org_xxxxxxxxxxxxxxxxxxxxxxxxxx
   WORKOS_DIRECTORY_ID=directory_xxxxxxxxxxxxxxxxxxxxxxxxxx
   PRODUCTION_URL=https://example.com
   ```

## SSO Setup with WorkOS

4. Follow the [SSO authentication flow instructions](https://workos.com/docs/sso/guide/introduction) to create a new SSO connection in your WorkOS dashboard.

5. Add `http://localhost:8000/callback` and your desired url used in your PRODUCTION_URL env as a Redirect URI in the Configuration section of the Dashboard.

6. Add the Organization ID located in your organizattion's Single Sign-On settings to your .env file as `WORKOS_ORGANIZATION_ID`

7. Be sure to add the domain of the email your will be using from your okta account in your Work OS Organization's Domain Settings.

## Directory Sync Setup with WorkOS

8. Follow the [Directory Sync flow instructions](https://workos.com/docs/directory-sync/quick-start) Set up a directory and integrate Directory Sync in your WorkOS dashboard.

9. Add the Directory ID located in your organizattion's directory to your .env file as `WORKOS_DIRECTORY_ID`

## Testing the Integration

10. Start the server and head to http://localhost:8000/ to begin the login flow:

```sh
npm start
```

11. Logging in will redirect you to your profile details at `http://localhost:8000/` if you wish to view the list of users in your Directory, you can click the button that shows the list of users at `http://localhost:8000/users`

## Need help?

If you get stuck and aren't able to resolve the issue by reading Work OS's [WorkOS Node.js SDK documentation](https://docs.workos.com/sdk/node), API reference, or tutorials, you can reach out to support@workos.com for a helping hand.
