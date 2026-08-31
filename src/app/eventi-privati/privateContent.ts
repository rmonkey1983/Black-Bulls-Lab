export const PRIVATE_OCCASIONS = ["Compleanno", "Festa di laurea", "Anniversario o ricorrenza", "Altra festa privata"] as const;

export const PRIVATE_FORMATS = [
  { name: "A Cena con il Bugiardo", href: "/format/a-cena-con-il-bugiardo", description: "Una cena interattiva in cui gli invitati osservano, parlano e decidono di chi fidarsi. Non è una cena con delitto e non richiede recitazione." },
  { name: "Format personalizzato", href: null, description: "Una proposta costruita attorno all’occasione, alla location e al tipo di partecipazione desiderata." },
] as const;

export const PRIVATE_PROCESS = [
  ["01", "Brief", "Conosciamo occasione, invitati e contesto."],
  ["02", "Scelta Format", "Individuiamo l’esperienza più adatta."],
  ["03", "Personalizzazione", "Adattiamo proposta e dettagli alla festa."],
  ["04", "Preparazione", "Definiamo data, location e operatività."],
  ["05", "Evento Live", "BBL coordina e conduce l’esperienza."],
] as const;

export const PRIVATE_PARTY_FAQS = [
  { question: "Che tipi di feste private organizzate?", answer: "Compleanni, feste di laurea, anniversari e altre ricorrenze private. Valutiamo ogni richiesta in base a format, invitati e location." },
  { question: "Posso personalizzare la festa?", answer: "Sì. Personalizzazione, contenuti e livello di intervento vengono definiti nel brief, in base all’occasione e al format scelto." },
  { question: "Come funziona?", answer: "Partiamo da un brief, scegliamo il format, definiamo personalizzazione e logistica, poi coordiniamo l’evento live." },
  { question: "Bisogna recitare?", answer: "No. A Cena con il Bugiardo non richiede recitazione. Per altri format, modalità e partecipazione vengono chiarite nella proposta." },
  { question: "Gli invitati devono partecipare tutti?", answer: "L’esperienza è pensata per coinvolgere gli invitati, lasciando a ciascuno il proprio modo di partecipare." },
  { question: "Quali format sono disponibili?", answer: "Per feste private proponiamo A Cena con il Bugiardo e, quando adatto, un format personalizzato. La disponibilità va verificata per ogni richiesta." },
  { question: "Cos’è A Cena con il Bugiardo?", answer: "È una cena interattiva creata da Black Bulls Lab: gli invitati ricevono informazioni, interagiscono al tavolo e cercano di capire chi sta mentendo. Non è una cena con delitto." },
  { question: "Quanti partecipanti servono e quanto dura?", answer: "Numero di invitati e durata vengono definiti in base al format e alla location. Li confermiamo nella proposta, senza range non verificati." },
  { question: "Dove si svolge e chi gestisce food & beverage?", answer: "Il focus è Torino e Piemonte. La location e la gestione food & beverage vengono concordate in base al progetto e alle esigenze dello spazio." },
  { question: "Serve tecnologia?", answer: "Dipende dal format. Eventuali strumenti e necessità tecniche vengono definiti durante la preparazione." },
  { question: "Quanto costa?", answer: "Il costo dipende da format, invitati, location e personalizzazione. Lo definiamo nella proposta dopo il brief." },
  { question: "Come richiedo una proposta?", answer: "Compila il modulo con contatti, occasione, invitati, location, periodo e dettagli. Ti ricontatteremo per approfondire." },
] as const;
