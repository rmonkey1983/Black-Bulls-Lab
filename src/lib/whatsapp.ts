export const WA_PHONE = "393342010067";

export const WA_MESSAGES = {
    default: "Ciao! Vorrei informazioni su un evento con Black Bulls Lab",
    cenaConDelitto: "Ciao! Sono interessato/a alla Cena con Delitto. Potete darmi info su date e prezzi?",
    ilPalqo: "Ciao! Vorrei sapere di più su Il PalQo. Quando è la prossima data?",
    corporate: "Ciao! Sto organizzando un evento aziendale per la mia azienda. Posso avere un preventivo?",
    compleanno: "Ciao! Vorrei organizzare una festa di compleanno con voi. Quante persone accettate?",
};

export const buildWAUrl = (msg: string) =>
    `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
