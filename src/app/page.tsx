/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getDocContent } from "@/lib/docs";
import { notFound } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";
import { Card } from "@/components/Card";
import { PrevNextNav } from "@/components/PrevNextNav";
import { getPrevNext } from "@/lib/navigation";

export const metadata = {
  title: "Welcome - MOLTGHOST",
  description: "MoltGhost Documentation",
};

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
      style={{ fontFamily: "var(--font-circular-std)" }}
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

export default async function Home() {
  const doc = await getDocContent("welcome");
  const { prev, next } = getPrevNext("/");

  if (!doc) {
    notFound();
  }

  return (
    <>
      <article className="prose mx-auto w-full max-w-3xl">
        <MDXRemote
          source={doc.content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />

        {/* Core Modules */}
        <div className="mt-10">
          <h2 className="mb-1 text-xl font-bold text-gray-900">Core Modules</h2>
          <p className="mb-5 text-sm text-gray-500">
            The core infrastructure that powers every MoltGhost agent.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Card
              title="Agent Pods"
              description="Dedicated compute environment for each agent."
              href="/agent-pod"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                  />
                </svg>
              }
            />
            <Card
              title="Agent Runtime"
              description="Secure environment where agents run models, tools, and workflows."
              href="/agent-runtime"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
                  />
                </svg>
              }
            />
            <Card
              title="Agent Models"
              description="Run local AI models directly inside each agent."
              href="/local-llm"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"
                  />
                </svg>
              }
            />
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200" />

        {/* Platform Features */}
        <div>
          <h2 className="mb-1 text-xl font-bold text-gray-900">
            Platform Features
          </h2>
          <p className="mb-5 text-sm text-gray-500">
            Additional capabilities available to every agent.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              title="Private Skills"
              description="Add custom capabilities to your agent."
              href="/private-skills"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.42 15.17l-5.384 3.178 1.028-5.993L2.2 7.773l6.02-.875L11.42 1.5l3.18 5.398 6.02.875-4.864 4.582 1.028 5.993-5.384-3.178z"
                  />
                </svg>
              }
            />
            <Card
              title="Private Access"
              description="Securely connect to your agent anytime."
              href="/agent-access"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              }
            />
            <Card
              title="Private Payment"
              description="Handle agent payments privately."
              href="/payment"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                  />
                </svg>
              }
            />
            <Card
              title="Private Memory"
              description="Store and recall information inside your agent."
              href="/backup-restore"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75m16.5 3.75v3.75c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75"
                  />
                </svg>
              }
            />
            <Card
              title="Private Backup"
              description="Protect and restore your agent data."
              href="/backup-restore"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                  />
                </svg>
              }
            />
            <Card
              title="App Manager"
              description="Manage agent apps in one place."
              href="/manage-agent"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
                  />
                </svg>
              }
            />
          </div>
        </div>
      </article>

      <PrevNextNav prev={prev} next={next} />

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
    </>
  );
}
