import { ClientOnly } from "@/components/ClientOnly";
import BookConsultationClient from "./BookConsultationClient";

export async function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default function Page() {
  return (
    <ClientOnly>
      <BookConsultationClient />
    </ClientOnly>
  );
}
