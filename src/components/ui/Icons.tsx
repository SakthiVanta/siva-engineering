type P = { className?: string; size?: number };
const base = (size = 18) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true });

export const IconArrow = ({ className, size }: P) => (
  <svg {...base(size)} className={`arrow ${className ?? ""}`}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const IconPhone = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);
export const IconWhatsApp = ({ className, size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.3 14.97l-.3-.19-3.1.82.83-3.02-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 3.9c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.2 5.1 4.5 2.5 1.07 3 .86 3.55.8.55-.05 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.2-.24-.58-.49-.5-.67-.5h-.57Z" />
  </svg>
);
export const IconMenu = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const IconClose = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const IconSun = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
  </svg>
);
export const IconMoon = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
  </svg>
);
export const IconPin = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
export const IconMail = ({ className, size }: P) => (
  <svg {...base(size)} className={className}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);
