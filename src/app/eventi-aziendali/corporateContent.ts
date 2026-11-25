export const CORPORATE_METHOD = [
  ["01", "Brief", "Obiettivo, pubblico e contesto dell'evento."],
  ["02", "Scelta Format", "La proposta più adatta a persone e occasione."],
  ["03", "Personalizzazione", "Dinamiche, tono e contenuti calibrati sul gruppo."],
  ["04", "Preparazione", "Location, scaletta e coordinamento operativo."],
  ["05", "Regia Live", "Conduzione, ritmo e attenzione a ciò che accade."],
  ["06", "Report", "Un confronto finale sul progetto realizzato."],
] as const;

export const CORPORATE_FAQS = [
  { question: "Cos'è il team building di Black Bulls Lab?", answer: "È un'esperienza dal vivo progettata per far interagire le persone attraverso un format, una regia e dinamiche sociali condivise." },
  { question: "Quanti partecipanti può coinvolgere un evento?", answer: "La configurazione dipende dal format, dagli obiettivi e dalla location. Definiamo insieme la soluzione adatta al gruppo." },
  { question: "Quanto costa un evento aziendale?", answer: "Il costo dipende da format, numero di partecipanti, location e livello di personalizzazione. Lo definiamo nella proposta dopo il brief." },
  { question: "Dove organizzate gli eventi?", answer: "Il focus è Torino e Piemonte. Possiamo valutare la sede più adatta tra location partner e spazi indicati dal cliente." },
  { question: "È possibile personalizzare l'esperienza?", answer: "Sì. Format, dinamiche, tono e regia possono essere calibrati su pubblico, occasione, spazio e obiettivo." },
  { question: "Organizzate anche cene aziendali?", answer: "Sì. I format live possono essere integrati in una cena aziendale, con una proposta definita in base al contesto." },
  { question: "Avete location disponibili?", answer: "Valutiamo location partner o uno spazio già disponibile. La scelta dipende da format, obiettivi e dimensione del gruppo." },
  { question: "Quanto dura un evento?", answer: "La durata viene definita con il format e la struttura dell'evento. La proposta chiarisce tempi e fasi prima della conferma." },
  { question: "Come posso richiedere un preventivo?", answer: "Compila il modulo con i tuoi contatti e descrivi l'evento. Numero di partecipanti, location e periodo aiutano a preparare la proposta, ma puoi indicarli anche in seguito. Ti ricontatteremo per definire il progetto." },
] as const;

export const CORPORATE_APPLICATIONS = ["Team building", "Cena aziendale", "Kick-off", "Evento interno", "Networking", "Celebrazione"] as const;

export const CORPORATE_NEXT_STEPS = [
  "Ci racconti l'occasione e l'obiettivo dell'evento.",
  "Ti ricontattiamo per capire gruppo, spazio e periodo.",
  "Definiamo insieme format e proposta.",
] as const;

export const CORPORATE_BENEFITS = [
  ["Tutti hanno un ruolo", "Il format è pensato per coinvolgere i partecipanti: non c'è un pubblico seduto a guardare."],
  ["Le persone parlano tra loro", "Le dinamiche aprono conversazioni e connessioni fuori dalla routine."],
  ["C'è una regia", "Conduzione, tempi e ritmo sono seguiti dal vivo, dall'inizio alla fine."],
] as const;
