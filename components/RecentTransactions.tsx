"use client";

import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "@/components/BankTabItem";
import BankInfo from '@/components/BankInfo';
import TransactionsTable from '@/components/TransactionsTable';
import { Pagination } from '@/components/Pagination';

const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  page = 1,
}: RecentTransactionsProps) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  )
  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between">
        <h2 className="recent-transactions-label">Recent transactions</h2>
        <p>- Import CSV -</p>
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
            <TransactionsTable transactions={currentTransactions} />
            <Pagination page={page} totalPages={totalPages} />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default RecentTransactions;
