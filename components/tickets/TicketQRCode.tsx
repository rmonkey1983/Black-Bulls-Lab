'use client';

import { QRCodeSVG } from 'qrcode.react';

interface TicketQRCodeProps {
  ticketId: string;
  /** Optional guest name — when provided, the QR encodes "ticketId|GuestName" for individual identification */
  guestName?: string;
}

export default function TicketQRCode({ ticketId, guestName }: TicketQRCodeProps) {
  // Encode both the unique ticket UUID and the holder name so the scanner
  // can identify the guest without any extra lookup.
  // Format: "TICKET:<uuid>|<GuestName>"
  const qrValue = guestName
    ? `TICKET:${ticketId}|${guestName}`
    : `TICKET:${ticketId}`;

  return (
    <QRCodeSVG
      value={qrValue}
      size={108}
      bgColor="#ffffff"
      fgColor="#000000"
      level="Q"
    />
  );
}
