import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

type TransactionProps = {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: string;
  createdAt: Date;
}

// type CreateTransactionInputProps = {
//   title: string;
//   amount: number;
//   category: string;
//   type: string;
// }

type CreateTransactionInputProps = Omit<TransactionProps, 'id' | 'createdAt'>

interface TransactionProviderProps{
  children: ReactNode
}

interface TransactionContextData{
  transactions: TransactionProps[],
  createTransaction : (transaction: CreateTransactionInputProps) => Promise<void>
}

const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData);


export function TransactionProvider({ children }: TransactionProviderProps){
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput : CreateTransactionInputProps){
    const response = await api.post('/transactions', transactionInput)
    const { transaction } = response.data;
    setTransactions([...transactions, transaction])
  }

  return(
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );
}


export function useTransactions(){
  const context = useContext(TransactionsContext);
  return context;
}