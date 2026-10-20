export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(
    {
      status: "ok",
      sha: process.env.VERCEL_GIT_COMMIT_SHA || "local",
      env: process.env.VERCEL_ENV || "development",
    },
    { headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" } },
  );
}
