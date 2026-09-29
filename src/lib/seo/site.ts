import { requirePublicEnv } from "@/lib/env";

export const SITE = {
  // Canonical production origin (https://lodhiPlayBits.com), env-driven with no
  // hardcoded fallback. Fails the build loudly on the server if missing; on the
  // client it never throws (would crash hydration) since Next inlines the value.
  url: requirePublicEnv("NEXT_PUBLIC_SITE_URL"),
  name: "Gaurav Lodhi",
  title: "Gaurav Lodhi - Software Engineer & Developer",
  description:
    "Gaurav Lodhi is a Software Developer from India who builds fast, reliable web and mobile products across modern front-end and back-end stacks.",
  handle: "@WizardDev_10",
  sameAs: [
    "https://github.com/lodhiPlayBits",
    "https://www.linkedin.com/in/gauravlodhi",
    "https://x.com/WizardDev_10",
  ],
} as const;
