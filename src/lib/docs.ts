import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

const docsDirectory = path.join(process.cwd(), "docs");

export async function getDocContent(slug: string | undefined) {
  if (!slug) return null;
  const realSlug = slug.replace(/\.md$/, "");
  const filePath = path.join(docsDirectory, `${realSlug}.md`);

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: realSlug,
      frontmatter: data,
      content,
    };
  } catch (error) {
    return null;
  }
}

export async function getDocSlugs() {
  const files = fs.readdirSync(docsDirectory);
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}
