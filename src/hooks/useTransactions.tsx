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

interface TransactionProviderProps {
  children: ReactNode
}

interface TransactionContextData {
  transactions: TransactionProps[],
  createTransaction: (transaction: CreateTransactionInputProps) => Promise<void>
  deleteTransaction: (transactionId: number) => Promise<void>
}

const TransactionsContext = createContext<TransactionContextData>({} as TransactionContextData);


export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api.get('/transaction')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: CreateTransactionInputProps) {
    const response = await api.post('/transaction', transactionInput)
    const { transaction } = response.data;
    // Criar uma cópia temporária do conjunto original
    const transactionsCopy = new Set(transactions);

    // Adicionar a nova transação à cópia temporária
    transactionsCopy.add(transaction);

    // Atualizar o conjunto original apenas se todas as operações forem concluídas sem erros
    setTransactions(Array.from(transactionsCopy));
  }

  async function deleteTransaction(transactionId: number) {
    const response = await api.delete(`/transaction/${transactionId}`)
    if (response.status === 200) {
      const filteredTransactions = transactions.filter(transaction => transaction.id !== transactionId);
      setTransactions(filteredTransactions);
    }
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}


export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}