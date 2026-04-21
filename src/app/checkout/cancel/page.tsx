import { Metadata } from "next";
import CancelClient from "./CancelClient";

export const metadata: Metadata = {
    title: "Pagamento Annullato",
    robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
    return <CancelClient />;
}
