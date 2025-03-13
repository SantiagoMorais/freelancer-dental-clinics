"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useThemeToggler } from "@/contexts/theme-toggler-content";

export const ThemeTogglerButton = () => {
  const { handleThemeToggler, isThemeDark } = useThemeToggler();

  return (
    <Button variant="ghost" size="icon" onClick={handleThemeToggler}>
      <motion.div
        key={isThemeDark ? "dark" : "light"}
        initial={{ rotate: -45, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1.1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isThemeDark ? <Moon /> : <Sun />}
      </motion.div>
    </Button>
  );
};
