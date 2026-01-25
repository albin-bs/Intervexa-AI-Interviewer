import { createContext, useContext, useState, useEffect } from "react";

const FontContext = createContext();

const fontOptions = [
  { name: "Default (Inter)", value: "font-sans", class: "font-sans" },
  { name: "Roboto", value: "font-roboto", class: "font-roboto" },
  { name: "Poppins", value: "font-poppins", class: "font-poppins" },
  { name: "Open Sans", value: "font-opensans", class: "font-opensans" },
  { name: "Montserrat", value: "font-montserrat", class: "font-montserrat" },
  { name: "Lato", value: "font-lato", class: "font-lato" },
  { name: "Serif", value: "font-serif", class: "font-serif" },
  { name: "Monospace", value: "font-mono", class: "font-mono" },
];

export function FontProvider({ children }) {
  const [currentFont, setCurrentFont] = useState(() => {
    return localStorage.getItem("selectedFont") || "font-sans";
  });

  useEffect(() => {
    localStorage.setItem("selectedFont", currentFont);
    
    // Remove all font classes from body
    document.body.classList.forEach((className) => {
      if (className.startsWith("font-")) {
        document.body.classList.remove(className);
      }
    });
    
    // Add new font class to body
    document.body.classList.add(currentFont);
  }, [currentFont]);

  const changeFont = (fontValue) => {
    setCurrentFont(fontValue);
  };

  return (
    <FontContext.Provider value={{ currentFont, changeFont, fontOptions }}>
      <div className={currentFont}>
        {children}
      </div>
    </FontContext.Provider>
  );
}

export function useFont() {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within FontProvider");
  }
  return context;
}
