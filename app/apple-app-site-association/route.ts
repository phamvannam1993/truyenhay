export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      applinks: {
        apps: [],
        details: [],
      },
      webcredentials: {
        apps: [],
      },
    },
    {
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=86400",
      },
    },
  );
}
