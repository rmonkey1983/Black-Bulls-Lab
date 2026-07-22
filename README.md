This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# bbl

## Liar System Waitlist API

Endpoint per la registrazione degli utenti alla lista d'attesa del sistema Liar System.

### Endpoint: `POST /api/liar-system/waitlist`

#### Payload Request (JSON)
```json
{
  "email": "utente@example.com",
  "name": "Mario Rossi",
  "phone": "+393331234567",
  "city": "Milano",
  "instagram": "@mariorossi",
  "source": "landing_page",
  "metadata": {}
}
```

#### Risposte HTTP
- `201 Created`: Registrazione completata.
- `400 Bad Request`: Email mancante o formato non valido.
- `409 Conflict`: Email già presente nella lista d'attesa.
- `500 Internal Server Error`: Errore del server o connessione Supabase.

### Schema Supabase (`liar_system_waitlist`)
Eseguire lo script SQL in `database/liar_system_waitlist.sql` su Supabase SQL Editor per istanziare la tabella e le policy RLS.

