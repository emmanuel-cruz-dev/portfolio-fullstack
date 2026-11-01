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
      label: "downloadCurriculum",
      type: "link" as const,
    },
    {
      href: null,
      icon: MailIcon,
      label: "copyEmail",
      type: "copy" as const,
    },
  ],
  social: {
    GitHub: {
      name: "gitHub",
      url: "https://github.com/emmanuel-cruz-dev",
      icon: FaGithub,
    },
    LinkedIn: {
      name: "linkedIn",
      url: "https://www.linkedin.com/in/emmanuel-cruz-dev/",
      icon: FaLinkedin,
    },
    Email: {
      name: "sendEmail",
      url: `mailto:${EMAIL}`,
      icon: FaPaperPlane,
    },
  },
};
