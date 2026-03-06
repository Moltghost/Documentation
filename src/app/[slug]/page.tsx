/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getDocContent, getDocSlugs } from "@/lib/docs";
import { notFound } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";
import { Sidebar } from "@/components/Sidebar";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getDocSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = await getDocContent(slug);

  if (!doc) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: doc.frontmatter.title || slug,
    description: doc.frontmatter.description || "Documentation page",
  };
}

type ComponentProps = React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
};

const components = {
  h1: (props: ComponentProps) => (
    <h1 className="mb-6 mt-8 text-3xl font-bold text-gray-900" {...props} />
  ),
  h2: (props: ComponentProps) => (
    <h2 className="mb-4 mt-6 text-2xl font-bold text-gray-900" {...props} />
  ),
  h3: (props: ComponentProps) => (
    <h3 className="mb-3 mt-4 text-xl font-bold text-gray-900" {...props} />
  ),
  p: (props: ComponentProps) => (
    <p
      className="mb-4 leading-relaxed text-gray-700"
      style={{ fontFamily: "var(--font-fira-code)" }}
      {...props}
    />
  ),
  a: (
    props: AnchorHTMLAttributes<HTMLAnchorElement> & {
      children?: React.ReactNode;
    },
  ) => {
    const href = props.href as string;
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="font-semibold text-blue-600 transition-colors hover:text-blue-700 underline"
          {...props}
        />
      );
    }
    return (
      <a
        className="font-semibold text-blue-600 transition-colors hover:text-blue-700 underline"
        {...props}
      />
    );
  },
  ul: (props: ComponentProps) => (
    <ul
      className="mb-4 list-inside list-disc space-y-2 text-gray-700"
      {...props}
    />
  ),
  ol: (props: ComponentProps) => (
    <ol
      className="mb-4 list-inside list-decimal space-y-2 text-gray-700"
      {...props}
    />
  ),
  li: (props: ComponentProps) => <li className="ml-4" {...props} />,
  code: (props: ComponentProps) => (
    <code
      className="rounded bg-gray-900 px-1.5 py-0.5 font-mono text-sm text-gray-100"
      {...props}
    />
  ),
  pre: (props: ComponentProps) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100"
      {...props}
    />
  ),
  blockquote: (props: ComponentProps) => (
    <blockquote
      className="mb-4 border-l-4 border-blue-600 pl-4 italic text-gray-600"
      {...props}
    />
  ),
  hr: (props: ComponentProps) => (
    <hr className="my-6 border-gray-300" {...props} />
  ),
  table: (props: ComponentProps) => (
    <div className="mb-6 overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full" {...props} />
    </div>
  ),
  thead: (props: ComponentProps) => (
    <thead className="bg-gray-100" {...props} />
  ),
  th: (props: ComponentProps) => (
    <th
      className="border-b border-gray-200 px-4 py-3 text-left font-semibold text-gray-900"
      {...props}
    />
  ),
  tbody: (props: ComponentProps) => <tbody {...props} />,
  tr: (props: ComponentProps) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50" {...props} />
  ),
  td: (props: ComponentProps) => (
    <td className="px-4 py-3 text-gray-700" {...props} />
  ),
};

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const doc = await getDocContent(slug);

  if (!doc) {
    notFound();
  }

  return (
    <div
      className="relative flex h-screen w-full flex-col overflow-hidden"
      style={{
        backgroundImage: "url('/images/main-bg-black.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Main Layout */}
      <div className="relative z-10 flex flex-1 overflow-hidden px-4 py-4 md:px-6 md:py-6">
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex min-w-0 flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col overflow-y-auto rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
            <article className="prose max-w-none">
              <MDXRemote
                source={doc.content}
                components={components}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </article>
            {/* Footer */}
            <div className="mt-8 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
              <p>
                © 2026 Moltghost.io ·
                <a href="#" className="hover:text-gray-700 mx-2">
                  Terms
                </a>
                ·
                <a href="#" className="hover:text-gray-700 mx-2">
                  Privacy
                </a>
                ·
                <a href="#" className="hover:text-gray-700 mx-2">
                  Disclaimer
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
