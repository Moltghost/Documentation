/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getDocContent, getDocSlugs } from "@/lib/docs";
import { navigation } from "@/lib/navigation";
import { notFound } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

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
    <p className="mb-4 leading-relaxed text-gray-700" {...props} />
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
      className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-sm text-gray-900"
      {...props}
    />
  ),
  pre: (props: ComponentProps) => (
    <pre
      className="mb-4 overflow-x-auto rounded-lg bg-gray-100 p-4"
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
      <div className="relative z-10 flex flex-1 overflow-hidden px-6 pb-6">
        {/* Sidebar */}
        <aside className="relative flex w-60 shrink-0 flex-col overflow-y-auto pr-6">
          {/* Logo */}
          <div className="mb-6 px-4 pt-12 shrink-0">
            <Image
              src="/images/moltghost.png"
              alt="MoltGhost Logo"
              width={64}
              height={64}
              className="h-16 w-16 object-contain"
            />
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-6">
            {navigation.map((section) => (
              <div key={section.href}>
                <h3
                  className="mb-3 text-xs font-bold uppercase tracking-wider text-white"
                  style={{ fontFamily: "var(--font-irish-grover)" }}
                >
                  {section.title}
                </h3>
                <img
                  src="/images/decorative-line.svg"
                  alt=""
                  className="mb-3 h-auto w-32"
                />
                <ul className="space-y-1 pl-2">
                  {section.children?.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-md px-2 py-1.5 font-mono text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Watermark Logo */}
          <div className="pointer-events-none absolute bottom-0 left-0 select-none opacity-20">
            <Image
              src="/images/moltghost.png"
              alt=""
              width={200}
              height={200}
              className="h-auto w-48 object-contain"
            />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col overflow-y-auto rounded-2xl bg-white p-8 shadow-lg">
            <article className="prose max-w-none">
              <MDXRemote source={doc.content} components={components} />
            </article>
          </div>
        </main>
      </div>
    </div>
  );
}
