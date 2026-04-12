import * as React from "react";

interface BookingEmailProps {
  guestName: string;
  eventTitle: string;
  quantity: string;
  selectedDate: string;
  location: string;
}

export const BookingConfirmationEmail: React.FC<Readonly<BookingEmailProps>> = ({
  guestName,
  eventTitle,
  quantity,
  selectedDate,
  location,
}) => (
  <div style={{
    backgroundColor: "#000000",
    color: "#ffffff",
    fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    padding: "40px 20px",
    lineHeight: "1.6"
  }}>
    <div style={{
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#0a0a0a",
      border: "1px solid #c8a44e33",
      borderRadius: "12px",
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{
        padding: "40px 20px",
        textAlign: "center",
        borderBottom: "1px solid #c8a44e1a"
      }}>
        <h1 style={{
          color: "#c8a44e",
          fontSize: "24px",
          fontWeight: "bold",
          margin: "0 0 10px 0",
          letterSpacing: "2px",
          textTransform: "uppercase"
        }}>
          BLACK BULLS LAB
        </h1>
        <p style={{
          fontSize: "14px",
          color: "#888888",
          margin: "0",
          textTransform: "uppercase",
          letterSpacing: "3px"
        }}>
          Confirmed Experiment Protocol
        </p>
      </div>

      {/* Hero Section */}
      <div style={{ padding: "40px 30px" }}>
        <h2 style={{
          fontSize: "32px",
          fontWeight: "bold",
          margin: "0 0 20px 0",
          lineHeight: "1.1",
          color: "#ffffff"
        }}>
          Ciao {guestName}, <br/>
          Il tuo posto è riservato.
        </h2>
        <p style={{ fontSize: "16px", color: "#a0a0a0", marginBottom: "30px" }}>
          L&apos;esperimento sta per avere inizio. Abbiamo ricevuto il tuo pagamento e confermato la tua presenza al tavolo esclusivo del laboratorio.
        </p>

        {/* Details Table */}
        <div style={{
          backgroundColor: "#111111",
          borderRadius: "8px",
          padding: "24px",
          marginBottom: "30px"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tr>
              <td style={{ paddingBottom: "15px" }}>
                <span style={{ fontSize: "11px", color: "#c8a44e", fontWeight: "bold", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Esperienza</span>
                <span style={{ fontSize: "16px", color: "#ffffff", fontWeight: "500" }}>{eventTitle}</span>
              </td>
            </tr>
            <tr>
              <td style={{ paddingBottom: "15px" }}>
                <span style={{ fontSize: "11px", color: "#c8a44e", fontWeight: "bold", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Data</span>
                <span style={{ fontSize: "16px", color: "#ffffff", fontWeight: "500" }}>{new Date(selectedDate).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </td>
            </tr>
            <tr>
              <td style={{ paddingBottom: "15px" }}>
                <span style={{ fontSize: "11px", color: "#c8a44e", fontWeight: "bold", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Ospiti</span>
                <span style={{ fontSize: "16px", color: "#ffffff", fontWeight: "500" }}>{quantity} persone</span>
              </td>
            </tr>
            <tr>
              <td>
                <span style={{ fontSize: "11px", color: "#c8a44e", fontWeight: "bold", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Location</span>
                <span style={{ fontSize: "16px", color: "#ffffff", fontWeight: "500" }}>{location}</span>
              </td>
            </tr>
          </table>
        </div>

        {/* Instructions */}
        <div style={{ 
          borderLeft: "2px solid #c8a44e",
          paddingLeft: "20px",
          marginBottom: "40px"
        }}>
          <h3 style={{ fontSize: "14px", color: "#ffffff", fontWeight: "bold", textTransform: "uppercase", margin: "0 0 10px 0" }}>Cosa succede ora?</h3>
          <p style={{ fontSize: "14px", color: "#a0a0a0", margin: "0" }}>
            Ti basterà presentarti all&apos;ingresso del laboratorio 15 minuti prima dell&apos;inizio. Non è necessario stampare nulla: cercheremo il tuo nome all&apos;arrivo.
          </p>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <a href="https://blackbullslab.com/format" style={{
            display: "inline-block",
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "16px 32px",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "bold",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "1px"
          }}>
            Vedi altri Format
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "30px",
        textAlign: "center",
        backgroundColor: "#050505",
        borderTop: "1px solid #c8a44e1a"
      }}>
        <p style={{ fontSize: "12px", color: "#444444", margin: "0 0 10px 0" }}>
          Black Bulls Lab — Torino, Italia <br/>
          Il laboratorio sotterraneo dell&quot;intrattenimento.
        </p>
        <p style={{ fontSize: "11px", color: "#333333" }}>
          Hai domande? Rispondi a questa email o scrivici su WhatsApp.
        </p>
      </div>
    </div>
  </div>
);
