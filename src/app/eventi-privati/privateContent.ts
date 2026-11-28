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
  { question: "Quanto costa?", answer: "Il costo dipende da format, invitati, location e personalizzazione. Lo definiamo nella proposta dopo il brief." },
  { question: "Posso personalizzare la festa?", answer: "Sì. Personalizzazione, contenuti e livello di intervento vengono definiti nel brief, in base all’occasione e al format scelto." },
  { question: "Come funziona?", answer: "Partiamo da un brief, scegliamo il format, definiamo personalizzazione e logistica, poi coordiniamo l’evento live." },
  { question: "Bisogna recitare?", answer: "No. A Cena con il Bugiardo non richiede recitazione. Per altri format, modalità e partecipazione vengono chiarite nella proposta." },
  { question: "Gli invitati devono partecipare tutti?", answer: "L’esperienza è pensata per coinvolgere gli invitati, lasciando a ciascuno il proprio modo di partecipare." },
  { question: "Quali format sono disponibili?", answer: "Per feste private proponiamo A Cena con il Bugiardo e, quando adatto, un format personalizzato. La disponibilità va verificata per ogni richiesta." },
  { question: "Cos’è A Cena con il Bugiardo?", answer: "È una cena interattiva creata da Black Bulls Lab: gli invitati ricevono informazioni, interagiscono al tavolo e cercano di capire chi sta mentendo. Non è una cena con delitto." },
  { question: "Quanti partecipanti servono e quanto dura?", answer: "Dipende dal format e dalla location. Numero di invitati e durata vengono confermati nella proposta." },
  { question: "Dove si svolge e chi gestisce food & beverage?", answer: "Il focus è Torino e Piemonte. La location e la gestione food & beverage vengono concordate in base al progetto e alle esigenze dello spazio." },
  { question: "Serve tecnologia?", answer: "Dipende dal format. Eventuali strumenti e necessità tecniche vengono definiti durante la preparazione." },
  { question: "Come richiedo un preventivo?", answer: "Compila il modulo con i tuoi contatti e racconta la festa. Invitati, location e periodo aiutano a preparare la proposta, ma puoi indicarli anche in seguito. Ti ricontatteremo per approfondire." },
] as const;

export const PRIVATE_NEXT_STEPS = [
  "Ci racconti l’occasione e chi vuoi invitare.",
  "Ti ricontattiamo per capire spazio, periodo e tipo di serata.",
  "Definiamo insieme format e proposta.",
] as const;

export const PRIVATE_BENEFITS = [
  ["Invitati protagonisti", "Non c’è uno spettacolo da guardare: gli invitati entrano nella serata, ognuno a modo suo."],
  ["Un motivo per parlarsi", "Le dinamiche sono pensate per far interagire anche chi non si conosce."],
  ["A condurre pensiamo noi", "Coordiniamo tempi, conduzione e dinamiche dell’esperienza."],
] as const;
