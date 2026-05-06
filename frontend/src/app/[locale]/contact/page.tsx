import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  return getPageMetadata({
    locale: params.locale,
    namespace: "contactPage",
  });
}

function ContactPage() {
  return (
    <div>
      <h1>Contact</h1>
    </div>
  );
}

export default ContactPage;
