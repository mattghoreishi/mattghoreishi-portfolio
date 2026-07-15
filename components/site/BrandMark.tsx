import Image from "next/image";

type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <Image
      src="/assets/brand/mg-monogram.svg"
      alt=""
      aria-hidden="true"
      width={27}
      height={25}
      unoptimized
      className={`h-[25px] w-[27px] shrink-0 ${className ?? ""}`}
    />
  );
}
