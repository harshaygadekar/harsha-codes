import { redirect } from "next/navigation";

/** Old /more route — permanently moved to /writing. */
export default function MorePage() {
  redirect("/writing");
}
