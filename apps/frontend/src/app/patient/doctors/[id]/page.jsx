import { ClientOnly } from "@/components/ClientOnly";
import DoctorDetailsClient from "./DoctorDetailsClient";

export async function generateStaticParams() {
  return [{ id: "placeholder" }];
}

export default function Page() {
  return (
    <ClientOnly>
      <DoctorDetailsClient />
    </ClientOnly>
  );
}
