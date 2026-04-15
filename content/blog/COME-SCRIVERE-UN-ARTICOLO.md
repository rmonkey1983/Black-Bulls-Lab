# Come scrivere un articolo per il blog di Black Bulls Lab

## Struttura del file

Ogni articolo è un file .mdx nella cartella content/blog/
Nome file: tutto-minuscolo-con-trattini.mdx

## Frontmatter obbligatorio

---
title: "Titolo dell'articolo (max 60 caratteri per SEO)"
description: "Descrizione per Google (max 155 caratteri)"
date: "YYYY-MM-DD"
category: "seo"        # oppure: "eventi" oppure "team"
author: "Julian Halili"  # o nome membro del team
coverImage: "/images/brand/bg-venue-crowd.webp"
---

## Categorie disponibili

- **seo** → Articoli per Google: "cosa fare Torino", "cena aziendale originale", ecc.
- **eventi** → Aggiornamenti sui format, prossime date, annunci
- **team** → Dietro le quinte, storie del team, processo creativo

## Regole per SEO

1. Titolo: includi sempre una keyword locale (es. "Torino", "cena aziendale")
2. Primo paragrafo: menziona la keyword principale entro le prime 100 parole
3. H2 e H3: usa keyword correlate nei sottotitoli
4. Link interni: collega sempre almeno un formato con Link href="/format/..."
5. Lunghezza ideale: 600-1200 parole

## Markdown disponibile

- **grassetto** con **testo**
- *corsivo* con *testo*
- Link: [testo](url)
- Liste con -
- Citazioni con >
- Sottotitoli con ## e ###
- Immagini: ![alt](/images/brand/nome.webp)

## Pubblicare

1. Crea il file .mdx in content/blog/
2. Salva e il sito si aggiorna automaticamente al prossimo deploy
3. L'articolo appare in homepage (ultimi 3) e nella pagina /blog
