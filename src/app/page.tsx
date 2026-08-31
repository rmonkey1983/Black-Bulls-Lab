import { homepageMetadata } from "@/lib/metadata";
export const metadata = homepageMetadata;

import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("./HomeClient").then(mod => mod.HomeClient));

export default async function HomePage() {
    return (
        <div className="w-full bg-zinc-950 min-h-screen">
            <HomeClient />
        </div>
    );
}
