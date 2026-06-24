import type { IconType } from "react-icons";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInbox,
} from "react-icons/fa6";

export const profile = {
  name: "Pedro Parisi",
  role: "Fullstack Developer",
  location: "Sorocaba, Brazil",
  tagline: "Building things that ship, treating side projects like products.",
  bio: [
    "Computer Science student focused on software development, AI, and building meaningful products. Passionate about learning, solving problems, and turning ideas into real-world projects. Fluent in Portuguese and English, currently learning French, and always exploring new technologies."
  ],
};

export const education = {
  institution: "UFSCar - Federal University of São Carlos",
  course: "B.Sc. Computer Science",
  period: "2026 — 2030",
};

interface Social {
  label: string;
  handle: string;
  href: string;
  icon: IconType;
}

export const socials: Social[] = [
  {
    label: "GitHub",
    handle: "pedroparisii",
    href: "https://github.com/pedroparisii",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    handle: "in/pedroparisi",
    href: "https://linkedin.com/in/pedroparisi",
    icon: FaLinkedin,
  },
  {
    label: "X",
    handle: "@pedrovrparisi",
    href: "https://x.com/pedrovrparisi",
    icon: FaXTwitter,
  },
  {
    label: "Email",
    handle: "parisipedro5@gmail.com",
    href: "mailto:parisipedro5@gmail.com",
    icon: FaInbox,
  },
];

export const facts = [
  { label: "based in", value: "Brazil" },
  { label: "writing", value: "TypeScript" },
  { label: "status", value: "Open to work" },
  { label: "since", value: "2006" },
];