# Audit Black Bulls Lab — perché non arrivano richieste

24 novembre 2026 · sito online `blackbullslab.com` (versione del 31 agosto), confrontato con il codice locale.
Sola lettura: nessun form inviato, nessun dato o record modificato.

**Legenda:** 🔴 blocca le richieste · 🟠 ne fa perdere molte · 🟡 da migliorare.
**[V]** verificato direttamente · **[I]** interpretazione o ipotesi.

---

## 1. Perché non ricevi richieste di preventivo

### 🔴 1.1 Le email dei form non possono arrivarti [V]

- I form Aziende, Privati, Partner e Contatti fanno una cosa sola: mandano un'email a `info@blackbullslab.com` (`src/app/actions/contact.ts`). Non salvano nulla nel database.
- `blackbullslab.com` **non ha record MX**: nessun server riceve la sua posta. Controllato su 4 resolver, incluso quello autoritativo; l'indirizzo del sito non risponde nemmeno sulla porta 25.
- La posta è configurata su `blackbullslab.it` (IONOS), non su `.com`.
- Resend accetta la richiesta, quindi il cliente legge "Richiesta inviata" e Analytics conta un lead. Poi l'email non ha dove arrivare.
- Il casting Golden Voice salva nel database, ma la sua notifica va allo stesso indirizzo.
- Vale anche per chi scrive a mano a `info@blackbullslab.com`: l'indirizzo è nel footer, su Contatti, nei dati strutturati e in `llms.txt`.

**Conseguenza:** anche con molto traffico e un sito perfetto, da form ed email riceveresti zero.
L'unico canale che può funzionare è WhatsApp.

Non verificato: se `RESEND_API_KEY` è presente su Netlify. Se mancasse, il cliente vedrebbe un errore.

**Cosa fare, in ordine:**
1. Apri **Resend → Emails** e cerca gli invii a `info@blackbullslab.com`. Le richieste passate potrebbero essere ancora leggibili lì, con nome e contatto.
2. Ripristina la posta: aggiungi gli MX per `.com` nel DNS (oggi gestito da NS1/Netlify), con una casella reale, **oppure** cambia destinatario con una casella che leggi già.
3. Controlla in Resend la **lista soppressioni**: dopo i rimbalzi `info@` potrebbe essere bloccato anche a MX sistemati.
4. Invia una richiesta di prova da ogni form.
5. Salva ogni richiesta anche nel database, così un guasto email non la fa perdere.

### 🔴 1.2 I riquadri di contatto sono invisibili [V]

Su `/contatti` i tre riquadri WhatsApp, Email e Instagram restano a opacità 0: a 375px ancora così dopo 10 secondi e lo scroll di tutta la sezione. Stesso risultato a 1440px. Il visitatore vede titolo, testo grigio e vuoto. Causa probabile: l'animazione d'ingresso parte due volte e salva "invisibile" come stato finale [I].

### 🔴 1.3 Il pulsante più visibile porta a una pagina vuota [V]

Su mobile la barra fissa "Prenota una serata" compare su home, contatti, blog, team e pagine format (non su Aziende, Privati, Locali, Chi siamo e Bugiardo) e porta a `/calendario`, che dice: "Il calendario è in aggiornamento". Nessuna data, nessun modulo, nessuna alternativa. Ci portano anche home, footer e pagine format.

### 🟠 1.4 Le correzioni di settembre non sono online [V]

La versione pubblicata è del 31 agosto. Le correzioni locali non sono mai state pubblicate. Online oggi:
- **Privati:** dopo un invio riuscito il codice va in errore (`event.currentTarget` dopo `await`).
- **Aziende, Privati, Partner:** nessuno stato "invio in corso"; se cade la rete non compare alcun messaggio.

### 🟠 1.5 Non c'è nulla che convinca [V]

Nel sito non ci sono una foto di una vostra serata, un cliente, una recensione, un prezzo indicativo, una durata, una capienza. Gallery: "Sviluppo in Corso". Case study: "Una pagina informativa". È corretto non inventare, ma oggi chi decide un budget non ha elementi per fidarsi.

### Cosa non posso sapere

Quante persone visitano il sito. Servono Search Console e Analytics. Finché 1.1 non è risolto, però, il traffico non è il primo problema.

---

## 2. Funnel

| Percorso | Dove si interrompe | Gravità |
|---|---|---|
| **Pubblico** | Home → Calendario vuoto. L'unico esito reale è la lista d'attesa del Bugiardo, ma la CTA fissa porta altrove | 🔴 |
| **Aziende** | Form a 3.726px su desktop e **5.268px su mobile** (circa 6,5 schermate). Una sola CTA prima, più un link che porta fuori verso il Bugiardo | 🟠 |
| **Aziende** | **Manca il campo telefono.** Manca WhatsApp nel corpo pagina, mentre su Privati c'è | 🟠 |
| **Privati** | Percorso migliore: due CTA subito, form completo. Ma WhatsApp si apre senza messaggio precompilato | 🟡 |
| **Home** | "Organizza un evento" porta al modulo generico, non al bivio Aziende/Privati | 🟠 |
| **Contatti** | Il tipo esperienza è preselezionato su "A Cena Con Il Bugiardo": chi non lo cambia invia un dato falso. Mancano telefono, data, partecipanti | 🟠 |
| **Contatti** | Nessuna informativa privacy accanto al modulo, presente invece negli altri | 🟠 |
| **Cena con Delitto** | "Apri l'indagine" e "Prenota il tuo" finiscono su pagine senza prenotazione | 🟠 |
| **Navbar** | Nessun pulsante "Richiedi preventivo", nessun telefono. Contatti non è nel menu | 🟠 |
| **Telefono** | Zero link `tel:` nelle 17 pagine controllate | 🟠 |

La parola **"preventivo" non compare** nelle CTA. "Parliamo del tuo evento" e "Invia l'esperienza" non dicono cosa succede dopo.

**Funnel consigliato:**
- Navbar: un solo pulsante oro "Richiedi un preventivo" → pagina o blocco con scelta Azienda / Festa privata / Locale.
- Modulo breve nella prima o seconda schermata: nome, contatto (telefono **o** email), data, numero persone. Il resto facoltativo.
- Dopo l'invio: cosa succede e quando, più un link WhatsApp. I tempi di risposta scrivili solo se li rispetti.
- CTA mobile coerente con la pagina: su Aziende/Privati "Richiedi un preventivo"; altrove "Entra in lista" finché non ci sono date.

---

## 3. Copy

**Diagnosi:** il sito spiega come lavorate voi, non cosa ottiene chi compra. E non risponde alle prime domande di chi chiede un preventivo.

| Testo attuale | Problema | Effetto |
|---|---|---|
| "Il pubblico cambia tutto." (H1 home) | Non dice cosa vendete, né a chi | Serve leggere il sottotitolo per capire |
| "Scrivi il PROTOCOLLO", "Invia nuovo protocollo", "Inizializzazione Protocollo", "Invia l'esperienza" | Gergo cyber vietato da `AGENTS.md` | Freddo, poco credibile per un'azienda |
| "Numero di invitati e durata vengono definiti… senza range non verificati" | Nota interna finita sul sito | Suona come "non l'abbiamo mai fatto" |
| "Durata non ancora confermata", "regole non ancora comunicate" | Il prodotto principale appare incompleto | Nessun motivo per decidere ora |
| "distinta dai format identitari di Black Bulls Lab" | La pagina che dovrebbe vendere Cena con Delitto ne prende le distanze | Il cliente si chiede chi la organizza |
| "Prenota il tuo Cena con Delitto", "Prove Trovate", "Il Delitto è Smart" | Errore di genere e frasi senza significato | Cura percepita bassa |
| Metodo in 6 passi ripetuto su Home, Aziende, Privati | Racconta il processo, non il risultato | Pagine intercambiabili |
| Partecipazione / Collaborazione / Connessione | Valgono per qualsiasi agenzia | Nessuna differenza percepita |

**Affermazioni da rimuovere o dimostrare** (contrarie ad `AGENTS.md`):
- Blog: "aumentano il senso di appartenenza **fino al 40%**", senza fonte.
- Blog: "I posti sono limitati — e **si esauriscono in fretta**", mentre non ci sono date.
- Blog: Il PalQo "ospita **ogni mese**… ingresso libero o a offerta": verificare.
- Blog: "il dinner show **più immersivo** di Torino".
- Team: "dietro il **successo**…", "precisione micrometrica".
- `llms.txt` e blog: "attori infiltrati", "web app": verificare rispetto alle pagine format.

**Direzione, da validare:**
- H1 home: *"Serate ed eventi a Torino in cui gli invitati diventano protagonisti"*. "Il pubblico cambia tutto" resta come firma.
- Aziende: *"Una cena aziendale a Torino in cui i colleghi parlano davvero tra loro"*.
- CTA: *"Richiedi un preventivo"*.
- FAQ Aziende: manca **"Quanto costa?"**, la prima domanda di chi compra. Pubblica una fascia reale, oppure spiega da cosa dipende.

**Servono da te:** foto reali, clienti citabili, fasce di prezzo, capienze, durate, location. Senza questi dati il copy può migliorare solo in parte.

---

## 4. SEO, GEO e ricerca IA

### 🔴 4.1 I bot leggono "Inizializzazione Protocollo" [V]

In tutte le 17 pagine controllate, il tag `<main>` dell'HTML contiene solo la schermata di caricamento: "BBL · Inizializzazione Protocollo". Il contenuto vero arriva in fondo, in un blocco `hidden`, e si sposta solo con JavaScript. Dipende da `src/app/loading.tsx`.
- Google esegue JavaScript, quindi può leggerlo.
- Molti crawler IA non lo eseguono: chi estrae il testo da `<main>` trova quasi nulla [I].
- Senza JavaScript il visitatore resta sulla schermata di caricamento.
- È anche la causa probabile delle pagine "non trovate" che rispondono 200, viste in locale su `/talents/…` [I].

**È l'intervento SEO/GEO più redditizio:** rimuovere quel loading globale.

### 🟠 4.2 Domini incoerenti [V]

| Indirizzo | Cosa fa |
|---|---|
| `blackbullslab.com` | sito, canonical |
| `www.blackbullslab.com` | 301 verso **`blackbullslab.it`** |
| `blackbullslab.it` | **copia completa** del sito, canonical verso `.com` |

Chi digita `www` finisce sul `.it`. Scegli un dominio e reindirizza tutti gli altri lì.

### 🟠 4.3 Visibilità [V, con limiti]

- Le pagine principali risultano trovabili cercando dentro al dominio.
- Per "team building Torino", "cena con delitto Torino" e "animazione feste adulti Torino" il sito non compare nei risultati ottenuti.
- Nemmeno una ricerca con il nome Black Bulls Lab e Torino lo ha mostrato.
- Limite: motore di ricerca dello strumento, non Google Italia. Va confermato in Search Console.

### 🟠 4.4 Entità e fiducia

- Nessun `LocalBusiness`: nei dati strutturati mancano indirizzo e area servita. Aggiungerli solo se reali e visibili.
- Da verificare se esiste un **profilo Google Business**: per "Torino" pesa molto.
- Partita IVA non trovata nelle pagine controllate: verifica gli obblighi con il commercialista.
- `SearchAction` dichiara una ricerca `/blog?search=`: verificare che esista o toglierla.
- `llms.txt` contiene elenchi di keyword e una descrizione diversa dal sito.

### 🟡 4.5 On-page

- Title senza "Torino": Cena con Delitto, Il PalQo, The Golden Voice, A Cena con il Bugiardo.
- H1 poetici nelle pagine format: "La Verità è un'Ombra." invece di "Cena con Delitto a Torino".
- Anteprima social (og:image) assente su `/calendario`.
- Nessun `Event`, perché non ci sono date.
- 4 articoli in blog; l'ultimo è di aprile 2026.
- Mancano pagine per intenti precisi: cena aziendale, addio al celibato/nubilato, compleanno adulti, festa di laurea.

**Cosa funziona:** title e description presenti, canonical sulle pagine controllate, FAQ con schema su più pagine, `Service`, sitemap, robots aperto ai bot IA, definizioni chiare su Bugiardo e Aziende.

---

## 5. Grafica, gerarchia e peso percepito

### Primo sguardo

Identità coerente: nero, oro, avorio, Syne. L'atmosfera c'è. Ma l'occhio riceve **atmosfera, non offerta**: nessuna persona, nessun tavolo che gioca, nessun volto.

| Elemento | Peso visivo | Peso che dovrebbe avere |
|---|---|---|
| H1 (fino a 115px su desktop) | Altissimo | Alto, ma deve dire cosa vendete |
| Banner cookie | Altissimo: su mobile copre circa il 40%, incluse le CTA dell'hero in home | Basso: barra compatta |
| WhatsApp verde | Il colore più acceso della pagina | Alto: è l'unico canale che funziona |
| "Prenota una serata" (barra oro mobile) | Altissimo | Zero finché il calendario è vuoto |
| CTA preventivo | Basso | **Il più alto** |
| Prove e foto reali | Assenti | Molto alto |
| Testi informativi | 12–14px grigi | Almeno 16px |

### Problemi

- 🟠 **Schermo nero dopo l'hero [V].** In home, scrollando, c'è quasi una schermata vuota: l'hero è alto 190% e l'effetto previsto non parte.
- 🟠 **Il video hero non si vede mai [V].** 9,8 MB da un repository GitHub esterno ("Subway doors…"), caricato ma a opacità 0. Non è materiale BBL: verifica i diritti o toglilo.
- 🟠 **`/calendario`: il titolo finisce sotto la navbar [V].**
- 🟠 **Scheda del Bugiardo in home con la scritta "LIAR SYSTEM" [V]:** un altro marchio sul prodotto principale.
- 🟠 **Transizione oro a tutto schermo** a ogni cambio pagina, più il caricamento: tempo perso prima dell'offerta.
- 🟠 **Contrasto insufficiente** (minimo 4,5:1 per i testi piccoli):

| Testo | Contrasto |
|---|---|
| Placeholder del modulo contatti | **1,25** |
| "Bugiardo" bordeaux su nero | **1,67** (minimo 3:1 per testo grande) |
| Etichette del modulo contatti | **2,28** |
| Descrizioni dei riquadri contatto | **2,52** |

- 🟡 **Etichette dei campi** solo come placeholder su Aziende: spariscono mentre si scrive.
- 🟡 **Titoli su Aziende:** su mobile l'H1 occupa quasi tutta la prima schermata e spinge la CTA sotto.
- 🟡 **Home lunga 10,4 schermate** su mobile; il bivio Aziende/Privati arriva tardi.
- 🟡 **Menu:** "A cena con il bugiardo" ha lo stesso peso di "Aziende", ma non si può ancora acquistare.
- 🟡 **Foto:** le stesse poche immagini d'atmosfera servono format diversi.

Già corretti in locale, non online: logo sul menu a 1024px, footer, "PUBBLI/CO", email del footer, pulsanti sopra il banner, link di ritorno.

---

## 6. Piano d'azione

### Oggi (recupero richieste)
1. Resend: recupera le richieste passate.
2. Sistema la posta di `.com` o cambia destinatario.
3. Prova reale di ogni form.

### Questa settimana (codice)
4. Salvare le richieste nel database oltre all'email.
5. Rendere visibili i riquadri di `/contatti`.
6. Togliere il loading globale.
7. Sostituire la CTA verso il calendario vuoto.
8. "Richiedi un preventivo" in navbar; telefono nel form Aziende.
9. Pubblicare le correzioni locali. Attenzione: quelle del checkout richiedono prima la migrazione (`SITE_AUDIT_REPORT.md`).

### Prossime due settimane
10. Riscrivere Home, Aziende, Contatti, Cena con Delitto.
11. Hero con foto reale; togliere il video esterno.
12. Contrasti, dimensioni testi, banner cookie compatto.
13. Un solo dominio.
14. Togliere le affermazioni non dimostrabili dal blog.

### Dopo
15. Profilo Google, pagine per intento, prime recensioni reali, date in calendario con `Event`.

### Come misurare
Visite → clic su "Richiedi un preventivo" → form iniziati → form inviati → **email ricevute davvero**. Oggi il penultimo numero può salire mentre l'ultimo resta zero.

---

## Limiti

- Traffico, posizioni su Google e Core Web Vitals non misurati.
- Nessun form inviato e nessun accesso a Resend, Netlify, Search Console o Analytics.
- Verifica visiva su Home, Aziende, Contatti, Calendario, Bugiardo; le altre pagine lette dall'HTML online.
- Privacy e obblighi legali segnalati, non certificati.
