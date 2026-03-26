'use client'

import { createContext, useState, ReactNode } from 'react';

interface SubPlanContextType {
  selectedPlanDuration: string;
  setSelectedPlanDuration: (plan: string) => void;
}

export const subPlanContext = createContext<SubPlanContextType | undefined>(undefined);

export const SubPlanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlanDuration, setSelectedPlanDuration] = useState('monthly');

  return (
    <subPlanContext.Provider value={{ selectedPlanDuration, setSelectedPlanDuration }}>
      {children}
    </subPlanContext.Provider>
  );
}
