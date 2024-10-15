"use client";

import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "@/components/BankTabItem";
import BankInfo from '@/components/BankInfo';
import TransactionsTable from '@/components/TransactionsTable';
import { Pagination } from '@/components/Pagination';

import Csv from '@/components/Csv';
import { useEffect, useState } from 'react';
import { useTransactions } from '@/context/transactions.context';
import OverviewTable from '@/components/OverviewTable';

const RecentTransactions = ({
  accounts,
  transactions: initialTransactions = [],
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) => {
  const {setTransactions: setContextTransactions} = useTransactions()
  const [transactions, setTransactions] = useState(initialTransactions);
  const [csvTransactions, setCsvTransactions] = useState([]);

  // Merge transactions whenever csvTransactions changes
  useEffect(() => {
    if (csvTransactions.length > 0) {

      const allTransactions = [...transactions, ...csvTransactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setTransactions(allTransactions);
      
      // Clear csvTransactions after merging, if desired
      setContextTransactions(allTransactions)
      console.log('TEST ME')
      makeTwoTransactions(allTransactions);
      
      setCsvTransactions([]);
    }
  }, [csvTransactions, transactions, setTransactions, setContextTransactions]);

  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  )

  const [specificItems, setSpecificItems] = useState([]);
  const [specificItemsTwo, setSpecificItemsTwo] = useState([]);

  // make specific transactions here.
  const makeTwoTransactions = (allTransactions) => {
    makeSpecificTransactions(allTransactions);
    makeSpecificTransactionsTwo(allTransactions);
  }

  const makeSpecificTransactionsTwo = (allTransactions) => {

    // Remove all permanent transactions
    const nonePermanentTransactions = allTransactions.filter(
        (transaction) => !transaction.permanent
    );

    // Create a map to group transactions by category
    const categoryMap: {
        [category: string]: {
            id: string;
            name: string;
            amount: number;
            date: string;
            paymentChannel: string;
            category: string;
            subRows: {
                id: string;
                name: string;
                amount: number;
                date: string;
                paymentChannel: string;
                category: string;
                subRows: Transaction[];
            }[];
        };
    } = {};

    // Group transactions into categories and then by name
    nonePermanentTransactions.forEach((transaction) => {
        const category = transaction.category;
        const name = transaction.name;

        // Initialize the category in the map if it doesn't exist
        if (!categoryMap[category]) {
            categoryMap[category] = {
                id: "",
                name: category,
                amount: 0,
                date: "",
                paymentChannel: transaction.paymentChannel,
                category: category,
                subRows: [], // Initialize the subRows array for names
            };
        }

        // Find or create a sub-group for the current `name` within the `category`
        let nameGroup = categoryMap[category].subRows.find(
            (group) => group.name === name
        );

        // If no such group exists, create a new one
        if (!nameGroup) {
            nameGroup = {
                id: "",
                name: name,
                amount: 0,
                date: "",
                paymentChannel: transaction.paymentChannel,
                category: category,
                subRows: [],
            };

            // Add this new name group to the category's subRows
            categoryMap[category].subRows.push(nameGroup);
        }

        // Add the transaction to the subRows of the name group
        nameGroup.subRows.push(transaction);

        // Update the amount for the name group, rounding to integers
        nameGroup.amount += Math.round(transaction.amount);

        // Update the amount for the category group as well
        categoryMap[category].amount += Math.round(transaction.amount);
    });

    // Convert the categoryMap values back to an array
    const specificTransactionsTwo = Object.values(categoryMap);

    setSpecificItemsTwo(specificTransactionsTwo);
};

  const makeSpecificTransactions = (allTransactions) => {

    // Remove all permanent transactions
    const nonePermanentTransactions = allTransactions.filter(
        (transaction) => !transaction.permanent
    );

    // Create a map to group transactions by category
    const categoryMap: { [key: string]: { 
        id: string; 
        name: string; 
        amount: number; 
        date: string; 
        paymentChannel: string; 
        category: string; 
        subRows: Transaction[]; 
    } } = {};

    // Group transactions into categories
    nonePermanentTransactions.forEach(transaction => {
        const category = transaction.category;

        // If the category is not yet in the map, initialize it
        if (!categoryMap[category]) {
            categoryMap[category] = {
                id: "",  // Set to empty as per your requirement
                name: category,
                amount: 0,  // Set to 0 as per your requirement
                date: "",   // Set to empty as per your requirement
                paymentChannel: transaction.paymentChannel, // Assuming we want the payment channel from the first transaction
                category: category,
                subRows: [] // Initialize the subRows array
            };
        }

        // Add the current transaction to the subRows of the appropriate category
        categoryMap[category].subRows.push(transaction);

        // Update the amount for the category
        categoryMap[category].amount += Math.round(transaction.amount); // Accumulate the amount
    });

    // Convert the categoryMap values back to an array
    const specificTransactions = Object.values(categoryMap);

    setSpecificItems(specificTransactions);
};

  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <Csv setCsvTransactions={setCsvTransactions} />
        <button onClick={makeTwoTransactions}>make specific</button>
        <Link
          href={`/transaction-history/?id=${appwriteItemId}`}
          className="view-all-btn"
        >
          View all
        </Link>
      </header>
      <Tabs defaultValue={appwriteItemId} className="w-full">
        <TabsList className="recent-transactions-tablist">
          {accounts.map((account: Account) => (
            <TabsTrigger
              key={account.appwriteItemId}
              value={account.appwriteItemId}
            >
              <BankTabItem
                key={account.id}
                account={account}
                appwriteItemId={appwriteItemId}
              />
            </TabsTrigger>
          ))}
        </TabsList>
        {accounts.map((account: Account) => (
          <TabsContent
            value={account.appwriteItemId}
            key={account.id}
            className="space-y-4"
          >
             <BankInfo 
              account={account}
              appwriteItemId={appwriteItemId}
              type="full"
            />

            <OverviewTable transactions={specificItemsTwo} />
            <OverviewTable transactions={specificItems} />

            <TransactionsTable transactions={currentTransactions} />
            <Pagination page={page} totalPages={totalPages} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
