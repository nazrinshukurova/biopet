import React, { createContext, useState, useEffect } from "react";

const PetInfoContext = createContext();

export const PetInfoProvider = ({ children }) => {
  // Başlanğıcda localStorage-dan petInfo datalarını al
  const [petInfo, setPetInfo] = useState(() => {
    const saved = localStorage.getItem("petInfo");
    return saved ? JSON.parse(saved) : null;
  });

  // petInfo dəyişəndə localStorage-a yaz
  useEffect(() => {
    if (petInfo) {
      localStorage.setItem("petInfo", JSON.stringify(petInfo));
    } else {
      localStorage.removeItem("petInfo");
    }
  }, [petInfo]);

  // petInfo dəyərini konsola yazmaq üçün (düzgün adla)
  console.log(petInfo);

  return (
    <PetInfoContext.Provider value={{ petInfo, setPetInfo }}>
      {children}
    </PetInfoContext.Provider>
  );
};

export default PetInfoContext;
