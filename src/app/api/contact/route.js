import { handleContact } from "../../lib/contact.mjs";
export const runtime = "nodejs";
export async function POST(request) {
  return handleContact(request, {
    apiKey: process.env.RESEND_API_KEY,
    from: process.env.CONTACT_FROM,
  });
}
