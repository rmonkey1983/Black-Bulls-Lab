/**
 * Team data for Black Bulls Lab
 */

export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    fullBio?: string; // Usiamo questo per la pagina singola
    formazione?: string[];
    qualifiche?: string[];
    imageUrl: string;
    socialUrl?: string;
}

export const teamMembers: TeamMember[] = [
    {
        id: "julian",
        name: "Julian Halili",
        role: "CEO & Founder",
        bio: "L'architetto del Black Bulls Lab. Unisce l'organizzazione logistica alla cura ossessiva per l'esperienza immersiva, creando format scalabili e indimenticabili.",
        fullBio: "Julian è il motore pulsante dietro il successo di Black Bulls Lab. Con un background solido nell'organizzazione di grandi eventi, ha fondato il Lab con l'unico obiettivo di ridefinire lo standard dei dinner show. La sua filosofia si basa sulla precisione micrometrica e sull'ossessione per il dettaglio, elementi che permettono di trasformare ogni semplice serata in un viaggio sensoriale indimenticabile per i gruppi e le aziende più esigenti.",
        imageUrl: "", // LASCIAMO VUOTO PER ORA
        socialUrl: "",
        qualifiche: ["Event Management", "Business Design", "Luxury Hospitality", "Project Leadership"]
    },
    {
        id: "manuel",
        name: "Manuel Epifani",
        role: "Comico, Improvvisatore & MC",
        bio: "Comico di Stand-up e improvvisatore, porta sul palco l’assurdità della realtà con follia tra Torino e la Puglia.",
        fullBio: "Comico, improvvisatore, artista e, come ama definirsi lui stesso, 'aspirante benestante'.\n\nNato e cresciuto a Ostuni, in Puglia, inizia presto un pellegrinaggio svizzero rimbalzando tra Zurigo e Lugano. Dopo una crisi di nostalgia che lo riporta a sud per soli sei mesi, ammette che in fondo il nord ha il suo fascino. Punta la bussola e si trasferisce a Torino, scoprendo con piacere che, geograficamente parlando, è praticamente come rimanere in Puglia.\n\nSul palco, Manuel è un maestro nell'osservare e smontare la realtà. Porta in scena l’assurdità del quotidiano, mettendo a nudo le piccole nevrosi e le situazioni della vita di tutti i giorni, condendo il tutto con il suo inconfondibile pizzico di follia.\n\nOltre alle luci della ribalta, si dedica con passione alla didattica. È formatore di improvvisazione per ragazzi e giovani adulti e collabora attivamente con la Fondazione Time2, guidando preziosi corsi di improvvisazione teatrale dedicati a ragazzi con disabilità.",
        formazione: [
            "Officina del sole (corso di teatro per ragazzi)",
            "Quinta Tinta APS (improvvisazione)",
            "TAC (stand up & cabaret)",
            "Workshop ImproTeatro (con Alessandro Cassoni)",
            "Workshop ImproTeatro (con Deborah Fedrigucci)",
            "Workshop Voice (con Angela Semerano)"
        ],
        qualifiche: [
            "Stand Up Comedy",
            "Improvvisazione",
            "Cabaret",
            "MC (Master of Ceremonies)"
        ],
        imageUrl: "/images/team/emanuel-epifani.webp",
        socialUrl: "https://instagram.com/manuel_epifani"
    },
    {
        id: "maurizio",
        name: "Maurizio Percassi",
        role: "Stand-up Comedian, Improvvisatore & MC",
        bio: "Nato e cresciuto a Torino, Maurizio trasforma ogni vizio e situazione quotidiana in materiale comico. Un artista che unisce ritmo, presenza scenica e una sincerità disarmante.", 
        fullBio: "Stand-up comedian e improvvisatore nato e cresciuto tra le strade di Torino, Maurizio Percassi è la prova vivente che la leggerezza è una cosa estremamente seria.\n\nLa sua è una comicità osservazionale pura: un viaggio attraverso i vizi, le situazioni imbarazzanti e quei pensieri inconfessabili che tutti noi facciamo, ma che solo lui ha il coraggio di urlare in un microfono. Maurizio scrive battute quotidianamente — spaziando dall'assurdo al quotidiano — guidato dalla convinzione che ridere di se stessi sia la forma più alta di intelligenza.\n\nMa Maurizio non è solo un uomo di parola. Il suo passato (e presente) si divide tra il bancone da barista e il palco da ballerino: un mix che gli ha conferito un ritmo e una presenza scenica fuori dal comune. Per lui, ogni incontro o imprevisto della vita è materiale fertile per lo show, rendendo l'interazione con il pubblico non un semplice contorno, ma il cuore pulsante di ogni sua performance.",
        formazione: [
            "Corso di Stand-up Comedy e Improvvisazione (Scuola Maigret e Magritte)",
            "Workshop intensivo con BeComedy",
            "Teatro Fisico (con Federica Buzzi)"
        ],
        qualifiche: [
            "Stand-up Comedy",
            "Improvvisazione Teatrale",
            "Cabaret",
            "MC (Master of Ceremonies)"
        ],
        imageUrl: "/images/team/maurizio-percasi-v2.webp", 
        socialUrl: "https://instagram.com/maurizio_percassi"
    }
];
