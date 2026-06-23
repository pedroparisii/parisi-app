import type { IconType } from "react-icons";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInbox,
} from "react-icons/fa6";

export const profile = {
  name: "Pedro Parisi",
  role: "Fullstack Developer",
  location: "Sorocaba, Brazil",
  tagline: "Building things that ship, treating side projects like products.",
  bio: [
    "I'm a fullstack developer who likes the whole stack — from database schema to the last pixel of a hover state. Most of what I build starts as a question: what would this feel like if it were a real product, not just a demo?",
    "Right now I'm deep in the Next.js + Supabase world, learning in public and shipping this very site as proof of work. When I'm not coding, you'll probably find me chasing a new framework or over-engineering something small for the fun of it.",
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
    icon: FaTwitter,
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