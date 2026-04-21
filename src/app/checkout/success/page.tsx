import { Metadata } from "next";
import SuccessClient from "./SuccessClient";

export const metadata: Metadata = {
    title: "Prenotazione Confermata",
    robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
    return <SuccessClient />;
}
