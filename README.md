# Sports Display

A simple Netlify-hosted digital signage page to show live sports fixtures from Fanzo XML feed.

## 🛠 Features
- Serverless function fetches and parses XML
- Displays fixtures in real time
- Auto-refresh every 60 seconds
- Clean, large-font UI for screen visibility

## 🚀 Deployment (Netlify)

### Option 1: Deploy from GitHub
1. Push this folder to a GitHub repository
2. Go to [https://app.netlify.com](https://app.netlify.com)
3. Click **"Add new site" → "Import from Git"**
4. Set the build settings:
   - Build command: *(leave blank)*
   - Publish directory: `.`  
   - Functions directory: `netlify/functions`

### Option 2: Deploy with Netlify CLI
1. Run:
\`\`\`bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
\`\`\`

## 📂 Folder Structure
```
sports-display/
├── index.html
├── package.json
├── .gitignore
├── README.md
└── netlify/
    └── functions/
        └── get-fixtures.js
```
