import { ClientOnly } from "@/components/ClientOnly";
import ChatPageClient from "./ChatPageClient";

export async function generateStaticParams() {
  return [{ consultationId: "placeholder" }];
}

export default function Page() {
  return (
    <ClientOnly>
      <ChatPageClient />
    </ClientOnly>
  );
}
