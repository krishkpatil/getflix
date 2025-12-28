# Netlify Environment Variables Setup

Your Netlify build is failing because it doesn't have access to the required environment variables.

## Required Environment Variables

You need to add these in your Netlify dashboard:

### TMDB API Variables
- `NEXT_PUBLIC_TMDB_API_KEY` = `04c35731a5ee918f014970082a0088b1`
- `NEXT_PUBLIC_TMDB_BASE_URL` = `https://api.tmdb.org/3`
- `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL` = `https://image.tmdb.org/t/p/w1280`

### Firebase Variables
- `NEXT_PUBLIC_FIREBASE_API_KEY` = `AIzaSyDbp_4D9B1TKlT_QFZWOwGrlLbIPAcZW3w`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` = `getflix-7b146.firebaseapp.com`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID` = (check your .env.local)
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` = (check your .env.local)
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` = (check your .env.local)
- `NEXT_PUBLIC_FIREBASE_APP_ID` = (check your .env.local)

## How to Add Environment Variables in Netlify

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site (getflix)
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add each variable from the list above
6. After adding all variables, trigger a new deploy

## Alternative: Use Netlify CLI

```bash
# Install Netlify CLI if you haven't
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link your site
netlify link

# Set environment variables
netlify env:set NEXT_PUBLIC_TMDB_API_KEY "04c35731a5ee918f014970082a0088b1"
netlify env:set NEXT_PUBLIC_TMDB_BASE_URL "https://api.tmdb.org/3"
netlify env:set NEXT_PUBLIC_TMDB_IMAGE_BASE_URL "https://image.tmdb.org/t/p/w1280"
# ... add the rest
```

After adding the environment variables, your build should succeed!
