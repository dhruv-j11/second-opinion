# Second Opinion

**Understand your health. Not just your diagnosis.**

An AI-powered health literacy companion that helps you understand lab results, track biomarkers, check medication interactions, and prepare for doctor visits.

> Second Opinion is an educational tool — not a medical device. Always consult your healthcare provider.

---

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is ready, go to **Settings > API** and copy:
   - `Project URL` → this is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon/public` key → this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → this is your `SUPABASE_SERVICE_ROLE_KEY`
3. Go to **SQL Editor** and paste the contents of `supabase-schema.sql` — then click **Run**
4. Go to **Storage** and create a new bucket called `lab-uploads` (set it to **private**). Then in **SQL Editor** run the storage policy block from `supabase-schema.sql` (the section starting with "Storage: lab-uploads bucket + RLS policies") so uploads are allowed for logged-in users.
5. (Optional) Go to **Authentication > Providers** and enable Google OAuth

### 3. Set Up OpenAI

1. Go to [platform.openai.com](https://platform.openai.com) and get an API key
2. Make sure your account has access to **GPT-4o** (requires billing enabled)

### 4. Create Environment File

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=your_openai_key
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**If you see "new row violates row-level security policy" when uploading:** the `lab-uploads` bucket needs storage policies. In Supabase go to **SQL Editor**, paste and run the "Storage: lab-uploads bucket + RLS policies" section from `supabase-schema.sql` (the four `create policy "Users can ..." on storage.objects` blocks). That allows logged-in users to upload and read their own files.

---

## Deploying to Vercel

1. Push to GitHub
2. Import your repo at [vercel.com](https://vercel.com)
3. Add all 4 environment variables in the Vercel dashboard
4. Deploy

---

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** + shadcn/ui
- **Supabase** (Auth, Database, Storage)
- **OpenAI GPT-4o** (Text analysis + Vision for PDF/image parsing)
- **Recharts** (Biomarker tracking charts)
- **Framer Motion** (Animations)

---

## Features

| Feature | Route | Description |
|---------|-------|-------------|
| Landing Page | `/` | Hero, features, waitlist |
| Auth | `/login` | Email/password + Google OAuth |
| Dashboard | `/dashboard` | Overview, recent reports, quick actions |
| Upload | `/upload` | Image/PDF upload or manual entry |
| Report | `/report/[id]` | AI analysis with expandable biomarker cards |
| History | `/history` | Biomarker tracking over time with charts |
| Medications | `/medications` | Medication list + interaction checker |
| Prepare | `/prepare` | Appointment brief generator |
| Settings | `/settings` | Profile and health context |

---

## Future Additions (Not in MVP)

- Stripe payments for premium tier
- PDF export of reports
- Share-as-image feature
- Email notifications
- Mobile app wrapper
