import { securityHeaders } from "./securityHeaders";

// Old clients get an explicit retirement response. Do not parse their body or
// initialize storage: drafts and exports are now entirely browser-local.
export function retiredApiResponse() {
  return Response.json(
    {
      error: "This endpoint has been retired. The Mapper stores drafts and exports in your browser.",
      stored: false,
    },
    {
      status: 410,
      headers: {
        ...Object.fromEntries(securityHeaders.map(({ key, value }) => [key, value])),
        "Cache-Control": "no-store",
      },
    },
  );
}
