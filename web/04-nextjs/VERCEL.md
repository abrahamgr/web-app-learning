# Vercel

Here are some steps to deploy to Vercel using GitHub Actions, so go ahead and create a Vercel account.

- Go to [https://vercel.com/](https://vercel.com/)
- Click on `Sign Up`
- Select `Hobby` (free) as plan type
- Enter your name and complete details
  - You can use GitHub account or sign up with your email

Then proceed to instal `vercel CLI`.

```bash
npm add -g vercel
```

```bash
# login to vercel
vercel login
# create project
vercel project add rick-morty
```

## Database

Now go to [`Vercel`](https://vercel.com/), to create a Database using Postgress:

- Click on your project created
- Click on `Create Database`
- Select `Postgress`
- Enter the name and submit

# Link project

Now we have created a database and project link our local project

```bash

# link local project
vercel link --yes --project rick-morty
```

This will genera a file on `.vercel/project.json` with 2 properties (`projectId` and `orgId`) we will use to create GiHub secrets.

## Secrets

Go to your repository on GitHub

- Under Security section
- Click on `Secrets and Variables`
- Click on `Actions`
- Under Repository Secrets click on `New Repository Secret`
- Add the following values

### VERCEL_ORG_ID

This value from `.vercel/project.json` on `orgId` property.

### VERCEL_PROJECT_ID

This value from `.vercel/project.json` on `projectId` property.

### VERCEL_TOKEN

You need to go to your [Account on Vercel](https://vercel.com/account), click on `Tokens`, enter a token name like: `GitHub Action Rick and Morty`, select scope like `Personal` and expiration date you want (if expiration is different from `No Expiration` make sure you rotate your token) and click on `Generate`.
Copy the value and save somewhere else becayse this is not visible anymore, use this value to generate the secret on GitHub.
