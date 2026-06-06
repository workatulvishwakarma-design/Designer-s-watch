import HeaderClient, { MegaMenuPayload } from "./HeaderClient";
import { collections } from "@/data/collections";

export default async function Header({ hasAnnouncement = false }: { hasAnnouncement?: boolean }) {
    // Both server and client pull from the single collections registry
    const payload: MegaMenuPayload = {
        collections: collections
    };

    return <HeaderClient hasAnnouncement={hasAnnouncement} megaMenuPayload={payload} />;
}
