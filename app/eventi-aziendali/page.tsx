import { CorporateClient } from "./CorporateClient";

import { corporateMetadata } from "@/lib/metadata";
export const metadata = corporateMetadata;

export default function CorporatePage() {
    return <CorporateClient />;
}
