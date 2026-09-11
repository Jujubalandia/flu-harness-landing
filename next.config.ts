import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  // Security and caching headers live here rather than in netlify.toml, and that
  // is not a style preference.
  //
  // On Netlify, header rules declared in netlify.toml or _headers are applied by
  // the CDN. When Next.js serves a route through its runtime, the HTML comes back
  // from a function and those rules do not reach it: measured on the deployed
  // site, /_next/static/* assets picked up all three headers while the HTML page
  // and even the 404 carried only the nosniff that Next.js sets itself.
  // X-Frame-Options and Referrer-Policy were silently absent from every page.
  //
  // Declaring them here means they are part of the app instead of the host, so
  // they survive a move to Vercel, Cloudflare or a self-hosted Node server.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          // The page is one document that never needs framing.
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        // Content-hashed by the build, so the filename changes whenever the
        // content does. Immutable is safe here and is the single biggest
        // repeat-visit win on an otherwise static page.
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
