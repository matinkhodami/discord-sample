import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();
    if (!userId) throw new Error("Unauthorized");
    console.log({ userId })
    return { id: userId };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    serverImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
        console.log("Upload complete for server image");
    }),
    messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {
        console.log("Upload complete for message file");
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
