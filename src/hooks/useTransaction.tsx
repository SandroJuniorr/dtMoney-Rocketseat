import {  createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";


interface Transaction{
    id:number,
      title:string,
      type: string,
      category: string,
      amount: number,
      createdAt: string,
}
interface TransactionProviderProps{
    children: ReactNode,
}
interface TransactionContextData{
    transactions: Transaction[],
    createTransaction: (transaction: TransactionInput) => Promise<void>,
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

 const TransactionsContext = createContext<TransactionContextData>(
    {} as TransactionContextData)

export function TransactionProvider({children}:TransactionProviderProps){
    const [transactions, setTransaction] = useState<Transaction[]>([])

    async function createTransaction(transactionInput: TransactionInput){
        

      const response =  await api.post('/transactions', {
          ...transactionInput, 
          createdAt: new Date()
    })
      const {transaction} = response.data

      setTransaction([
          ...transactions,transaction
      ])
    }
    useEffect(()=>{
        api.get('transactions')
        .then(response => setTransaction(response.data.transactions))
    },[]);
    return(
        <TransactionsContext.Provider value={{transactions, createTransaction }}>
        {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions(){
    const context = useContext(TransactionsContext)
    return context
}