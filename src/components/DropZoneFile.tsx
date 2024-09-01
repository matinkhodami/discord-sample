import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "@mdi/react";
import { mdiCloseCircle } from "@mdi/js";

import { UploadDropzone } from "./UploadThing";
import type { ClientUploadedFileData } from "uploadthing/types";
import { useState } from "react";

interface DropZoneFileProps {
  value: string;
  onChange: (url: string) => void;
  endPoint: "serverImage" | "messageFile";
}
const DropZoneFile = ({ value, endPoint, onChange }: DropZoneFileProps) => {
  return (
    <AnimatePresence mode="popLayout">
      {!!value && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="relative">
            <img
              src={value}
              alt="uploaded file"
              className="rounded-full w-24 h-24 mx-auto border-teal-300 border-2"
            />
            <span onClick={() => onChange('')} className="cursor-pointer">
              <Icon
                path={mdiCloseCircle}
                size={1}
                className="text-rose-500 absolute top-0 right-0"
              />
            </span>
          </div>
        </motion.div>
      )}
      {!value && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <UploadDropzone
            endpoint={endPoint}
            onClientUploadComplete={(res) => {
              onChange(res[0].url);
            }}
            appearance={{
              container: "dark:bg-teal-200/5 cursor-pointer",
              label: "dark:text-teal-100/90",
              button: cn(
                "bg-teal-700 focus:outline-none focus:border-none",
                "ut-ready:bg-teal-700",
                "ut-uploading:cursor-not-allowed",
                "after:bg-teal-700/50"
              ),
              uploadIcon: "text-teal-300/90",
              allowedContent: "dark:text-teal-100/40",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DropZoneFile;
