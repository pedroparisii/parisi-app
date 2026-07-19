import type { IconType } from "react-icons";
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInbox,
} from "react-icons/fa6";

export const profile = {
  name: "Pedro Parisi",
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