export const QUOTE_LABEL = "Richiedi un preventivo";

const QUOTE_ANCHORS: Record<string, string> = {
  "/eventi-aziendali": "#richiesta",
  "/eventi-privati": "#proposta",
  "/contatti": "#modulo",
};

/** Form on the current page when there is one, otherwise the contact page. */
export function getQuoteHref(pathname: string): string {
  return QUOTE_ANCHORS[pathname] ?? "/contatti";
}
