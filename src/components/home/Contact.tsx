import { Github, Linkedin, Instagram, Send, Mail, Globe, MessageCircle } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { XIcon } from "@/components/brand/XIcon";

// Icons accept a className/size — lucide icons and our custom XIcon both qualify.
export type SocialIcon = ComponentType<SVGProps<SVGSVGElement>>;

const ICONS: Record<string, SocialIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: XIcon,
  x: XIcon,
  instagram: Instagram,
  telegram: Send,
  email: Mail,
};

export function platformIcon(platform: string): SocialIcon {
  return ICONS[platform.toLowerCase()] ?? (Globe as SocialIcon);
}

export type SocialRow = {
  platform: string;
  url: string;
  username: string;
  order: number;
};

export function Contact({ socials, email }: { socials: SocialRow[]; email: string }) {
  const sorted = [...socials].sort((a, b) => a.order - b.order);

  return (
    <Section id="contact" className="scroll-mt-24">
      <div className="text-center">
        <Reveal>
          <SectionHeading
            number="08"
            eyebrow="Contact"
            title="Let's build something"
            align="center"
            className="mb-4"
          />
          <p className="text-foreground/70 mb-8">
            Have a project, role, or idea in mind? The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Button
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                leftIcon={<Mail className="size-4" aria-hidden />}
              >
                {email}
              </Button>
            </Magnetic>

            <Magnetic>
              <Button
                href="https://wa.me/918595007855"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                leftIcon={<MessageCircle className="size-4" aria-hidden />}
              >
                +91-8595007855
              </Button>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {sorted.map((s) => {
              const Icon = platformIcon(s.platform);
              const isEmail = s.platform.toLowerCase() === "email";
              const rawUrl = isEmail 
                ? `https://mail.google.com/mail/?view=cm&fs=1&to=${s.url.replace("mailto:", "")}` 
                : s.url;
              const isExternal = rawUrl.startsWith("http");
              
              return (
                <li key={s.platform}>
                  <a
                    href={rawUrl}
                    aria-label={`${s.platform}: ${s.username}`}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="border-border text-muted hover:text-foreground hover:border-foreground/30 hover:bg-surface-2 focus-visible:ring-ring grid size-11 place-items-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:outline-none motion-safe:transition-transform motion-safe:hover:scale-105"
                  >
                    <Icon className="size-5" aria-hidden />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

export default Contact;
