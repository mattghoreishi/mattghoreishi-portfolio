type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 240 144"
      aria-hidden="true"
      focusable="false"
      width={40}
      height={24}
      className={`h-6 w-10 shrink-0 ${className ?? ""}`}
      fill="currentColor"
    >
      <path d="M5 4 L70 68 L133 4 L133 29 L70 88 L19 37 L19 138 L5 138 Z" />
      <path d="M118 67 L133 52 L133 138 L118 138 Z" />
      <path d="M158 4 C195 4 223 21 231 50 L216 50 C211 31 190 18 158 18 Z" />
      <path d="M164 69 L235 69 L235 77 C235 110 208 138 173 138 L152 138 L152 123 L173 123 C196 123 214 107 219 83 L164 83 Z" />
    </svg>
  );
}
