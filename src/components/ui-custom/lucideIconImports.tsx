
import React from "react";
import { LucideIcon } from "lucide-react";

export const Footprints: LucideIcon = React.forwardRef((props, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      ref={ref}
      {...props}
    >
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 2.28-5 5-5 2.72 0 4.97 2.28 5 5 .03 2.5-1 3.5-1 6.38V16h-8Z" />
      <path d="M12 16v-1.38c0-1.91.86-3.03 1.23-4.25 1.88-6.25 5.27-6.87 5.77-6.87a5 5 0 0 1 0 10c-1 0-2 0-4 1.5V16h-3Z" />
    </svg>
  );
});

Footprints.displayName = "Footprints";

export default {
  Footprints
};
