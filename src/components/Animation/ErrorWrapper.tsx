import { motion } from "framer-motion";
import Icon from "@mdi/react";
import { mdiAlertCircle } from "@mdi/js";
export default function errorWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div className="bg-rose-300 
    text-rose-500 p-2 rounded-md font-bold text-xl flex items-center gap-2">
      <Icon path={mdiAlertCircle} size={1} />
      {children}
    </motion.div>
  );
}
