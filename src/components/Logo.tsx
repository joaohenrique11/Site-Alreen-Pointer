type LogoProps = {
  className?: string;
  markClassName?: string;
  showText?: boolean;
};

export default function Logo({
  className = "",
  markClassName = "h-14 w-14",
  showText = true,
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 text-gold ${className}`}>
      <svg
        viewBox="0 0 180 180"
        className={markClassName}
        role="img"
        aria-label="Logo Alreen Pointer Barbearia"
      >
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <g stroke="currentColor" strokeWidth="2.2">
            {Array.from({ length: 16 }).map((_, index) => (
              <path
                key={index}
                d="M90 17c8 14 15 22 31 21-6 15-5 26 7 37-15 5-23 12-25 28-15-7-26-7-39 2-2-16-9-24-24-29 12-11 14-22 8-37 16 1 25-7 33-21Z"
                opacity="0.28"
                transform={`rotate(${index * 22.5} 90 90)`}
              />
            ))}
            <circle cx="90" cy="86" r="54" opacity="0.9" />
            <circle cx="90" cy="86" r="40" opacity="0.55" />
            <path d="M47 126c17 15 68 15 86 0" />
            <path d="M57 139c19 9 48 9 67 0" opacity="0.78" />
          </g>

          <g strokeWidth="4">
            <path stroke="#f8f3df" d="M76 45h28l-5 75H81Z" />
            <path stroke="currentColor" d="M81 53h18M79 70h21M78 87h21M80 104h17" />
            <path stroke="#f8f3df" d="M70 39h40M74 122h32" />
            <path stroke="currentColor" d="M84 53l16 17M80 72l18 19M80 91l15 18" />
          </g>
        </g>
      </svg>

      {showText ? (
        <div className="leading-none">
          <span className="block font-title text-xl font-bold text-ivory sm:text-2xl">
            Alreen Pointer
          </span>
          <span className="mt-1 block text-[0.62rem] font-extrabold uppercase tracking-[0.36em] text-gold">
            Barbearia
          </span>
        </div>
      ) : null}
    </div>
  );
}
