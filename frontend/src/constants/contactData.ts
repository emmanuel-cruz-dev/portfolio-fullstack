import { MailIcon } from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaRegFileAlt,
} from "react-icons/fa";

export const EMAIL = "emmanuelgerr@gmail.com";

export const CONTACT_DATA = {
  actions: [
    {
      href: "/CV - Emmanuel Cruz (fullstack).pdf",
      icon: FaRegFileAlt,
      label: "Descargar Curriculum",
      type: "link" as const,
    },
    {
      href: null,
      icon: MailIcon,
      label: "Copiar Email",
      type: "copy" as const,
    },
  ],
  social: {
    GitHub: {
      name: "GitHub",
      url: "https://github.com/emmanuel-cruz-dev",
      icon: FaGithub,
    },
    LinkedIn: {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/emmanuel-cruz-dev/",
      icon: FaLinkedin,
    },
    Email: {
      name: "Enviar Email",
      url: `mailto:${EMAIL}`,
      icon: FaPaperPlane,
    },
  },
};
