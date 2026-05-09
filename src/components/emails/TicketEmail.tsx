import * as React from 'react';

interface TicketEmailProps {
  userName: string;
  eventName: string;
  eventDate: string;
  locationName: string;
  ticketCount: number;
  successUrl: string;
}

export const TicketEmail: React.FC<Readonly<TicketEmailProps>> = ({
  userName, eventName, eventDate, locationName, ticketCount, successUrl
}) => (
  <div style={{ fontFamily: 'sans-serif', backgroundColor: '#000', color: '#fff', padding: '20px' }}>
    <h1 style={{ color: '#FFD700' }}>Prenotazione Confermata!</h1>
    <p>Ciao {userName},</p>
    <p>Il tuo posto per <strong>{eventName}</strong> è stato riservato con successo.</p>
    <div style={{ border: '1px solid #333', padding: '20px', margin: '20px 0' }}>
      <p>📍 <strong>Location:</strong> {locationName}</p>
      <p>📅 <strong>Data:</strong> {eventDate}</p>
      <p>🎟️ <strong>Biglietti:</strong> {ticketCount}</p>
    </div>
    <p>Puoi visualizzare i tuoi QR Code d'ingresso cliccando sul pulsante qui sotto:</p>
    <a href={successUrl} style={{ background: '#FFD700', color: '#000', padding: '12px 24px', textDecoration: 'none', fontWeight: 'bold', borderRadius: '5px' }}>
      VISUALIZZA BIGLIETTI
    </a>
    <p style={{ marginTop: '40px', fontSize: '12px', color: '#666' }}>Black Bulls Lab - Creatori di Emozioni</p>
  </div>
);