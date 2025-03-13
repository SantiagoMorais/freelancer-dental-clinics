"use client";

import { Button } from "@/components/ui/button";
import { useChangeContent } from "@/contexts/change-content-context";
import { navigationLinks } from "@/utils/navigation-links";

export const NavBar = () => {
  const { handleContent } = useChangeContent();
  return (
    <nav>
      <ul className="flex gap-4">
        {navigationLinks.map((link) => (
          <li key={link.title}>
            <Button
              variant="default"
              onClick={() => handleContent(link.contentType)}
              className="cursor-pointer text-base font-semibold"
            >
              {link.title}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
