# Archivio

File tolti dalla base del sito il 28 novembre 2026. Niente qui viene compilato,
analizzato da lint o pubblicato: la cartella è esclusa in `tsconfig.json` ed
`eslint.config.mjs`.

| Percorso | Cosa | Perché |
|---|---|---|
| `middleware.ts` | Vecchio middleware alla radice | Next.js usa solo `src/proxy.ts`; questo file era ignorato dalla build |
| `wip-checkout-talents/` | Migrazioni e test Supabase, script di test dei form | Lavoro non finito; la versione completa, con le modifiche al codice, è nel branch `archivio/wip-checkout-talents` |
| `output/` | Log e screenshot di Playwright | Risultati di audit passati |
| `docs/` | Report di audit del 9 settembre e del 24 novembre | Documenti di lavoro |

Lo stato completo prima della pulizia è nel branch `backup/stato-2026-11-28`.
