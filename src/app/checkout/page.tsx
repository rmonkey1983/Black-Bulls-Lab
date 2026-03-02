import { Suspense } from "react";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black pt-24 pb-32 px-6 flex items-center justify-center">
                <div className="text-gray-400 text-lg animate-pulse">Caricamento...</div>
            </div>
        }>
            <CheckoutForm />
        </Suspense>
    );
}
