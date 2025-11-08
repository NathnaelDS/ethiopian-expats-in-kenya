# 🇪🇹 ETinKE Member Directory

A simple, searchable directory for Ethiopian expats in Kenya. Members can register via Google Form, and their information is automatically displayed on this beautiful, mobile-friendly website.

## ✨ Features

- **Searchable Directory** - Search by name, profession, or skills
- **Smart Filters** - Filter by industry and location
- **Mobile-Friendly** - Click-to-call phone numbers on mobile
- **LinkedIn Integration** - Direct links to member profiles
- **Real-time Updates** - Connected to Google Sheets (updates on rebuild)
- **Privacy-First** - No authentication required (link-only access)

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- A Google account (for the form/sheet)

### 2. Setup Google Form & Sheets
Follow the detailed guide in `../GOOGLE_SHEETS_SETUP.md` to:
1. Create your Google Form
2. Connect it to Google Sheets
3. Make the sheet public (read-only)
4. Get your Sheet ID

### 3. Configure the Site
Edit `src/lib/sheets.ts` and replace `YOUR_SHEET_ID_HERE` with your actual Google Sheet ID:

```typescript
const SHEET_ID = 'YOUR_ACTUAL_SHEET_ID_HERE';
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) to see your directory!

## 📦 Deployment

### Option 1: Netlify (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"

3. **Auto-Updates**
   - Set up a webhook or cron job to trigger rebuilds
   - Or manually trigger rebuilds when you want to sync new members

### Option 2: Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to deploy

### Option 3: Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect your GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy!

## 🔄 Updating Member Data

The directory automatically fetches data from your Google Sheet when built. To update the live site:

1. **New members submit the form** → Data goes to Google Sheets
2. **Trigger a rebuild**:
   - **Netlify**: Deploy → "Trigger deploy" → "Deploy site"
   - **Vercel**: Redeploy from dashboard or run `vercel --prod`
   - **Cloudflare**: Deployments → "Retry deployment"

**Pro Tip**: Set up a weekly cron job (e.g., via GitHub Actions) to auto-rebuild and sync new members!

## 🛠️ Customization

### Change Colors
Edit the header gradient in `src/pages/index.astro`:
```html
<header class="bg-gradient-to-r from-green-600 to-yellow-500">
```

### Add More Fields
1. Add a question to your Google Form
2. Update the `Member` interface in `src/lib/sheets.ts`
3. Update the CSV parsing in `parseCSV()`
4. Display the new field in `src/pages/index.astro`

### Customize Meeting Info
Edit the header in `src/pages/index.astro`:
```html
<p class="text-green-100 text-sm mt-2">
  Next meetup: First Friday of the month
</p>
```

## 📁 Project Structure

```
expat-ke-directory/
├── src/
│   ├── lib/
│   │   └── sheets.ts          # Google Sheets data fetcher
│   ├── pages/
│   │   └── index.astro        # Main directory page
│   └── styles/
│       └── global.css         # TailwindCSS styles
├── public/                     # Static assets
├── astro.config.mjs           # Astro configuration
└── package.json
```

## 🧞 Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |

## 🔒 Privacy & Security

- **No Authentication**: The site has no password protection by default
- **Link-Only Access**: Share the URL only in your WhatsApp group
- **Member Consent**: Only show information members explicitly provide
- **Public Sheet**: The Google Sheet is public but read-only
- **No PII Storage**: No data stored on the server (statically generated)

## 🆘 Troubleshooting

**Q: Members aren't showing up**
- Check that your Sheet ID is correct in `src/lib/sheets.ts`
- Verify the sheet is public (Anyone with link → Viewer)
- Rebuild the site after adding new members

**Q: Styling looks broken**
- Make sure TailwindCSS is properly installed
- Check that `global.css` is imported in `index.astro`
- Run `npm run dev` and check console for errors

**Q: Search isn't working**
- The search works client-side (no server needed)
- Check browser console for JavaScript errors
- Verify the script tag in `index.astro` is present

## 📞 Support

For issues or questions about ETinKE directory:
- Check `../GOOGLE_SHEETS_SETUP.md` for setup help
- Review [Astro docs](https://docs.astro.build)
- Check your browser console for errors

## 📝 License

Free to use and modify for your community!
