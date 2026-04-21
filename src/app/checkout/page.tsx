import { Suspense } from "react";
import CheckoutForm from "./CheckoutForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Checkout",
    robots: { index: false, follow: false },
};

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-transparent pt-24 pb-32 px-6 flex items-center justify-center">
                <div className="text-gray-400 text-lg animate-pulse">Caricamento...</div>
            </div>
        }>
            <CheckoutForm />
        </Suspense>
    );
}
