# Verifica Black Bulls Lab — 8–9 settembre 2026

## Stato

Correzioni nel progetto locale. **Nessun commit, push, deploy o modifica al database remoto.**
La modifica preesistente a `src/app/case-study/page.tsx` è stata preservata.

**NO-GO alla pubblicazione del checkout prima della migrazione e della verifica di staging.**
Non equivale a una certificazione che ogni possibile bug del sito sia stato eliminato.

## Copertura

- Crawl di 28 pagine pubbliche/accessibili senza login, più `robots.txt` e `sitemap.xml`.
- Homepage, quattro format, aziende, privati, partner, contatti, calendario, chi siamo, blog e quattro articoli, tre profili team, pagine informative e accessi Admin/check-in.
- Tutte queste pagine online: HTTP 200. URL inesistente: 404. `/events`: redirect permanente 308.
- Primo controllo browser online: 8 pagine a 375, 768 e 1440 px; nessun overflow orizzontale rilevato.
- Lettura schema remoto limitata a metadati e query senza righe; nessuna modifica di dati.
- Form attivi: contatti, aziende, privati, partner, casting Golden Voice, lista d'attesa A Cena con il Bugiardo. Checkout e webhook verificati con dipendenze simulate.
- Controlli Admin: lettura del codice, protezioni di accesso e correzioni locali; nessuna operazione autenticata su dati reali.

## Correzioni

| Area | Problema riscontrato e correzione |
|---|---|
| Privati | `event.currentTarget` usato dopo `await`, con possibile errore durante il reset. Riferimento al form conservato prima dell'invio. |
| Aziende, privati, partner | Aggiunti blocco invii concorrenti, stato di caricamento, gestione errori di rete, mantenimento dati dopo errore e reset dopo successo. |
| Contatti | Etichette associate ai campi, errori annunciati, selezione esperienza accessibile e guardia durante l'invio. |
| API contatti | JSON malformato restituisce 400; honeypot preservato; numero partecipanti non più perso nel form corporate. |
| Validazione contatti | Email, tipo richiesta, dimensione e formato dei dati verificati sul server; tipi ereditati come `toString` non accettati. |
| Casting | Età facoltativa salvata come `null`, non stringa vuota; validazione età/email/link, escaping HTML nelle email, gestione errore di rete e pulsante mobile. Fallimento email non annulla candidatura salvata. |
| Cookie | Riapertura preferenze ripristina le scelte salvate; checkbox etichettate; pannello scorrevole su schermi bassi. |
| Responsive blog/team | Titoli lunghi del blog vanno a capo; decorazione dei profili team contenuta nel proprio layout, senza scroll orizzontale. |
| Blog/team/talenti | Canonical specifici invece di quello ereditato dalla homepage. Rimosso secondo H1 nell'articolo di benvenuto. |
| Sitemap/conferma | `/success` esclusa dalla sitemap e impostata `noindex`. |
| Checkout | Ricerca evento con uguaglianza su UUID oppure slug, senza OR che può provocare cast UUID errati. Validazione payload e niente troncamento del JSON dei nomi ospiti. |
| Prezzi | Rimosso fallback inventato di €50. Prezzo mancante: pagamento non mostrato e collegamento ai contatti. Campo prezzo esplicito nell'Admin. |
| Calendario | Orari resi nel fuso Europe/Rome, gerarchia titoli e barra disponibilità protetta dalla divisione per zero. |
| Conferma ordine | Conferma corporate subordinata a verifica Stripe. La pagina di ritorno non crea più prenotazioni/biglietti e non scala posti. |
| Webhook | Accetta pagamenti effettivamente pagati. Prenotazione, biglietti e disponibilità in una transazione idempotente; errori restituiscono risposta ritentabile. |
| Email biglietti | Mittente BBL al posto del mittente di test Resend, URL pubblico invece di localhost, data dell'evento invece di acquisto. Rendering compatibile con React 19; chiave idempotenza per i ritentativi. |
| Admin eventi | Modifica preserva slug e posti già prenotati. Confronto atomico della disponibilità impedisce di sovrascrivere un pagamento concorrente. Upload immagine fallito interrompe il salvataggio. |

## Test ripetibili

- `scripts/test-site-forms.ts`: 19 verifiche con rete intercettata e credenziali fittizie. Contatti, casting, lista d'attesa, validazione checkout e webhook firmati. Nessun pagamento o invio email reale in questa suite.
- `supabase/tests/site_checkout_integrity.sql`: test su PostgreSQL 14 isolato con fixture minima. Successo, replay, conservazione nomi, disponibilità insufficiente, mismatch sessione, privilegi e rollback di errori durante creazione ticket.
- Prova concorrente aggiuntiva: 4 chiamate simultanee della stessa sessione → 1 prenotazione, 2 biglietti, decremento posti una sola volta.
- Esecuzione RPC come `service_role`: riuscita. Ruoli `anon` e `authenticated`: esecuzione negata dai privilegi.

## Validazione del codice

- `npm run lint`: PASS, 0 errori; restano 40 warning, prevalentemente codice preesistente.
- `npx tsc --noEmit`: PASS.
- `npm run build`: PASS. Build di produzione generata; segnalato separatamente il problema permessi `talents`.
- `git diff --check`: PASS.
- Suite applicativa ripetuta il 9 settembre: 19/19 PASS.
- Browser form aziende, partner, contatti e casting: errore di rete → dati conservati → pulsante riabilitato → riprova riuscita, invio bloccato durante attesa; 0 errori JavaScript non gestiti. Form privati: successo e reset verificati. Lista d’attesa: successo simulato verificato. Cookie: scelta analitici conservata alla riapertura e revocabile.
- Vecchio script `test-secure-stripe-pricing.ts` sostituito con accesso alla suite reale: eliminati i messaggi di successo stampati senza eseguire verifiche.

## Condizioni prima della pubblicazione

1. Applicare **prima del codice** `supabase/migrations/20260908180913_site_checkout_integrity.sql` al database corretto. Aggiunge `unit_price_cents` nullable e RPC `fulfill_site_checkout`; nessun prezzo viene inventato o valorizzato automaticamente.
2. Inserire prezzi reali confermati per gli eventi che devono essere acquistabili.
3. Provare in staging un pagamento Stripe completo, retry webhook e ricezione effettiva email. I test isolati non attestano la consegna in una casella reale.
4. La disponibilità non viene prenotata durante il tempo trascorso su Stripe: due sessioni diverse possono pagare gli ultimi posti. La nuova transazione impedisce biglietti eccedenti, ma il pagamento senza disponibilità richiede riconciliazione. Prima di aprire vendite concorrenti serve completare una politica di prenotazione temporanea o rimborso.

## Limiti e rilievi residui

- Database collegato: nessuna colonna prezzo prima della migrazione. Nessuna migrazione remota applicata.
- Query pubblica `talents`: `permission denied` durante build. Pagina già `noindex`; privilegi non ampliati automaticamente. Serve decisione esplicita sui dati da rendere pubblici.
- `NoEventsNewsletter` e `CorporateForm` legacy non sono importati dalle pagine attive. Il primo punta a `/api/waitlist` inesistente; la tabella legacy `newsletter` non risulta disponibile. Non sono stati riattivati né presentati come form operativi.
- Non verificati con utenti reali: operazioni Admin autenticate, scansione biglietti, ricezione email, acquisto reale e configurazione dei servizi del deploy.
- Nessuna misura di Core Web Vitals sul campo o prova di carico. L'audit non certifica conformità legale né sicurezza completa del database.
