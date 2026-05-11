import { Mail, Clock, MapPin } from "lucide-react";

import { SocialLinksItem } from "../shared";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "Podés escribirme directamente desde el formulario",
  },
  {
    icon: Clock,
    label: "Tiempo de Respuesta",
    value: "Generalmente respondo en menos de 24 horas",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Buenos Aires, Argentina. Disponible para trabajo remoto",
  },
];

function ContactInformation() {
  return (
    <article className="flex flex-col gap-8">
      <header>
        <h3 className="text-2xl font-bold mb-3">Ponte en contacto</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          ¿Tenés una idea, necesitás mejorar una aplicación existente o
          desarrollar nuevas funcionalidades? Puedo ayudarte a crear soluciones
          web modernas, escalables y enfocadas en la experiencia del usuario.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {contactInfo.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-4">
            <figure className="w-11 h-11 rounded-full bg-violet-500/10 dark:bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-violet-400" />
            </figure>
            <aside>
              <p className="font-semibold text-sm">{label}</p>
              <p className="text-muted-foreground text-sm">{value}</p>
            </aside>
          </div>
        ))}
      </div>

      <SocialLinksItem />
    </article>
  );
}

export default ContactInformation;
