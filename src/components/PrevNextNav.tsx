import Link from "next/link";

interface PrevNextNavProps {
  prev: { title: string; href: string } | null;
  next: { title: string; href: string } | null;
}

export function PrevNextNav({ prev, next }: PrevNextNavProps) {
  if (!prev && !next) return null;

  return (
    <div className="mx-auto mt-10 flex w-full max-w-3xl items-stretch gap-4">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-1 flex-col rounded-xl border border-gray-200 p-4 transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          <span className="text-xs text-gray-400">Previous</span>
          <span className="mt-1 flex items-center gap-1 text-sm font-semibold text-gray-900 group-hover:text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="group flex flex-1 flex-col items-end rounded-xl border border-gray-200 p-4 transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          <span className="text-xs text-gray-400">Next</span>
          <span className="mt-1 flex items-center gap-1 text-sm font-semibold text-gray-900 group-hover:text-blue-600">
            {next.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
