# Mob'in Website

JavaScript-only Next.js 16 site for Mob'in (boarding houses, dormitories, apartments).

## Scripts

```bash
npm run dev    # start dev server
npm run build  # production build
npm run start  # serve production build
npm run lint   # eslint
```

## Routes

- `/` — marketing site
- `/login`, `/signin` — landlord auth
- `/dashboard` — landlord: Properties, Messages, Profile, Plan
- `/admin`, `/admin/login` — super admin: Overview, Landlords, Tenants, Properties, Payments, Reports, Settings

## Project layout

```text
app/                  # routes (all .jsx)
components/
  ui/                 # Logo, UiSelect, SearchInput, AndroidIcon
  layout/             # Header, Footer, Hero, Features, HowItWorks, Pricing, About, Faq, AppDownload
  forms/              # LoginForm, SignupForm, AdminLoginForm, InquiryForm
  admin/              # super-admin tabs
  dashboard/          # landlord tabs
lib/                  # localStorage stores + constants.js (quotas)
animations/           # Lottie JSON
public/               # only assets actually referenced
```

Data persists in `localStorage` keys (`mobin-*`). No TypeScript: path alias `@/*` is configured in `jsconfig.json`.
