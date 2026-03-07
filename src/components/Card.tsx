import Link from "next/link";

interface CardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

export function Card({ title, description, href, icon }: CardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-xl border border-gray-200 bg-gray-50 p-5 transition-all hover:border-gray-300 hover:bg-gray-100 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#19191c] text-white">
          {icon}
        </span>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>
    </Link>
  );
}
