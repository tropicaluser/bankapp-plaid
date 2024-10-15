"use client";

// TransactionsContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the transactions context state
interface TransactionsContextType {
  transactions: Transaction[]; // Replace 'any' with your specific transaction type if you have one.
  setTransactions: (transactions: Transaction[]) => void; // Function to update transactions
}

// Create the context with default values
const TransactionsContext = createContext<TransactionsContextType | undefined>(
  undefined
);

// Create a provider component
export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // Replace 'any' with your transaction type.

  return (
    <TransactionsContext.Provider value={{ transactions, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
};

// Custom hook to use the TransactionsContext
export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }
  return context;
};
