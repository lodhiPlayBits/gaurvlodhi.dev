import { cn } from "@/utils/cn";

export function Logo({
  className,
  withWordmark = false,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 512 512"
        role="img"
        aria-label="Gaurav Lodhi logo"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id="logo-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#100d1c" />
            <stop offset="1" stopColor="#090811" />
          </linearGradient>

          <linearGradient id="logo-purple" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--brand-deep)" />
            <stop offset="0.55" stopColor="var(--brand-mid)" />
            <stop offset="1" stopColor="var(--brand-bright)" />
          </linearGradient>

          <filter id="logo-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="0 0 0 0 0.43
                      0 0 0 0 0.16
                      0 0 0 0 0.98
                      0 0 0 0.8 0"
            />
          </filter>

          <filter id="logo-softGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <rect
          x="4"
          y="4"
          width="504"
          height="504"
          rx="92"
          fill="url(#logo-bg)"
          stroke="var(--brand-deep)"
          strokeWidth="4"
        />

        <g
          fill="none"
          stroke="var(--brand-mid)"
          strokeWidth="34"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.55"
          filter="url(#logo-glow)"
        >
          <path d="M205 174 C174 145 126 150 105 187 C84 224 94 281 132 303 C169 325 213 306 222 269 L222 245 L179 245" />
          <path d="M247 168 L247 302 L329 302" />
        </g>

        <g
          fill="none"
          stroke="url(#logo-purple)"
          strokeWidth="28"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M205 174 C174 145 126 150 105 187 C84 224 94 281 132 303 C169 325 213 306 222 269 L222 245 L179 245" />
          <path d="M247 168 L247 302 L329 302" />
        </g>

        <circle
          cx="304"
          cy="137"
          r="29"
          fill="var(--brand-bright)"
          opacity="0.45"
          filter="url(#logo-softGlow)"
        />
        <circle cx="304" cy="137" r="18" fill="var(--brand-bright)" />
        <circle cx="298" cy="131" r="7" fill="#D9B8FF" opacity="0.9" />
      </svg>
      {withWordmark ? (
        <span className="gradient-text font-mono text-lg leading-none font-semibold tracking-tight">
          lodhiPlayBits
        </span>
      ) : null}
    </span>
  );
}
