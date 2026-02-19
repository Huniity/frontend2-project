'use client'

import { createContext, useState, ReactNode } from 'react';

// Define the shape of the context value
interface SubPlanContextType {
  selectedPlanDuration: string;
  setSelectedPlanDuration: (plan: string) => void;
}

// Create context with the correct type
export const subPlanContext = createContext<SubPlanContextType | undefined>(undefined);

export const SubPlanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlanDuration, setSelectedPlanDuration] = useState('monthly');

  return (
    <subPlanContext.Provider value={{ selectedPlanDuration, setSelectedPlanDuration }}>
      {children}
    </subPlanContext.Provider>
  );
}
