export const metadata = {
    title: "Eventi e Dinner Show a Torino | Intrattenimento e Gastronomia",
    description: "Partecipa ai nostri Dinner Show a Torino. Unisci l'alta cucina a performance live, stand-up comedy e musica. Scopri i prossimi format.",
    alternates: {
        canonical: "/format/dinner-show",
    },
};

export default function DinnerShowLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
