import { useEffect, useState } from "react";

const getIsDark = () =>
  typeof window !== "undefined" &&
  document.documentElement.classList.contains("dark");

export const useIsDarkTheme = () => {
  const [isDark, setIsDark] = useState(getIsDark);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
};
