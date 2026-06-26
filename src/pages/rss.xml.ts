import { getBlogPosts } from "../content/blog";

export async function GET({ site }: { site: URL }) {
  const posts = getBlogPosts("en" as any);
  const items = posts
    .map((post) => {
      const url = new URL(`/en/blog/${post.slug}/`, site).toString();
      return `<item>
        <title><![CDATA[${post.title}]]></title>
        <link>${url}</link>
        <guid>${url}</guid>
        <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
        <description><![CDATA[${post.description}]]></description>
      </item>`;
    })
    .join("");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>Websiteli Blog</title>
        <link>${new URL("/en/blog/", site).toString()}</link>
        <description>Practical guides about websites, SEO, analytics and AI automation.</description>
        ${items}
      </channel>
    </rss>`,
    {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
      },
    },
  );
}
