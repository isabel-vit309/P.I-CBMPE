// contexts/FormContext.tsx
import React, { createContext, useContext, useState } from 'react';

// 1. Definir as interfaces para os dados de cada step
interface Step1Data {
  occurrenceType: string;
  responsibleVehicle: string;
  dateTime: string;
  groupings: string;
  locationType: string;
}

interface Step2Data {
  description: string;
  responsible: string;
  victims: number;
}

interface Step3Data {
  matricula: string;
  cpf: string;
}

interface FormData {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
}

interface FormContextType {
  formData: FormData;
  updateFormData: (step: keyof FormData, data: any) => void;
  clearFormData: () => void;
}

// 2. Criar o Context
const FormContext = createContext<FormContextType | undefined>(undefined);

// 3. Provider Component - SEM ReactNode
export const FormProvider: React.FC<{ children: any }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    step1: {
      occurrenceType: '',
      responsibleVehicle: '',
      dateTime: '',
      groupings: '',
      locationType: ''
    },
    step2: {
      description: '',
      responsible: '',
      victims: 0
    },
    step3: {
      matricula: '',
      cpf: ''
    }
  });

  const updateFormData = (step: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [step]: data
    }));
  };

  const clearFormData = () => {
    setFormData({
      step1: { occurrenceType: '', responsibleVehicle: '', dateTime: '', groupings: '', locationType: '' },
      step2: { description: '', responsible: '', victims: 0 },
      step3: { matricula: '', cpf: '' }
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, clearFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// 4. Hook personalizado
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};