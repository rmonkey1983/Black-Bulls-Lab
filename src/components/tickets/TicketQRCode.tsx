'use client';

import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

interface TicketQRCodeProps {
  ticketId: string;
  /** Optional guest name — when provided, the QR encodes "ticketId|GuestName" for individual identification */
  guestName?: string;
}

export default function TicketQRCode({ ticketId, guestName }: TicketQRCodeProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-[108px] h-[108px] bg-zinc-900 animate-pulse rounded-sm" />;
  }

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
