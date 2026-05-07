import HeroHome from "@/components/home/HeroHome";
import { getPageMetadata } from "@/lib/utils/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return getPageMetadata({
    locale: locale,
    namespace: "homePage",
  });
}

function HomePage() {
  return <HeroHome />;
}

export default HomePage;

//{
//   "Metadata": {
//     "home": {
//       "title": "Home | Emmanuel Cruz | Portfolio",
//       "description": "Emmanuel Cruz Full Stack Developer"
//     },
//     "projects": {
//       "title": "Projects | Emmanuel Cruz | Portfolio",
//       "description": "My projects"
//     },
//     "education": {
//       "title": "Education | Emmanuel Cruz | Portfolio",
//       "description": "My education courses"
//     },
//     "contact": {
//       "title": "Contact | Emmanuel Cruz | Portfolio",
//       "description": "Get in touch with me"
//     }
//   },

//   "Layout": {
//     "nav": {
//       "home": "Home",
//       "projects": "Projects",
//       "experience": "Experience",
//       "education": "Education",
//       "contact": "Contact",
//       "admin": "Admin"
//     },
//     "footer": {
//       "copyright": "© 2026 Emmanuel Cruz. All rights reserved.",
//       "madeWith": "Made with Next.js and ❤️"
//     }
//   },

//   "Shared": {
//     "buttons": {
//       "send": "Send Message",
//       "cancel": "Cancel",
//       "viewProject": "View Project",
//       "readMore": "Read More"
//     },
//     "forms": {
//       "errors": {
//         "required": "This field is required",
//         "invalidEmail": "Please enter a valid email address"
//       }
//     }
//   },

//   "HomePage": {
//     "hero": {
//       "title": "Hi, I'm Emmanuel",
//       "subtitle": "Full Stack Web Developer crafting user experiences."
//     },
//     "features": {
//       "title": "What I do"
//     }
//   },

//   "ContactPage": {
//     "heading": "Get in Touch",
//     "description": "Feel free to reach out for collaborations or just a friendly hello.",
//     "formSection": {
//       "nameLabel": "Your Name",
//       "namePlaceholder": "John Doe",
//       "emailLabel": "Email Address",
//       "emailPlaceholder": "john@example.com",
//       "messageLabel": "Your Message",
//       "messagePlaceholder": "How can I help you?",
//       "successMessage": "Thank you! Your message has been sent successfully."
//     }
//   },

//   "ProjectsPage": {
//     "heading": "My Work",
//     "filters": {
//       "all": "All",
//       "frontend": "Frontend",
//       "backend": "Backend"
//     }
//   }
// }
