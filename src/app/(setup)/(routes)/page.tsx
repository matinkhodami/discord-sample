
import { db } from "@/lib/db";
import initialProfile from "@/lib/initialProfile";
import { redirect } from "next/navigation";


import InitialModal from "@/components/modals/InitialModal";

export default async function Home() {
  const user = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileID: user.id
        }
      }
    }
  })
  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return (
    // TODO: create a beautiful dialog full of animation
    <InitialModal />
  );
}
