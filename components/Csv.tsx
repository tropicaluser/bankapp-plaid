import { combinedExpenses, objectPermExpense, ObjectPermExpense } from '@/constants/const-transactions';
import { useState } from "react";
import * as XLSX from "xlsx";

const excelHeader = ["bokford", "valuta", "nummer", "text", "belopp", "saldo"];

interface CsvProps {
  setCsvTransactions: Function
}

export default function Csv({ setCsvTransactions }: CsvProps) {

  const getSEBCategory = (category: string) => {
    // here come RYDE SWEDEN
    const newCustomLogic = customLogic(category);
    return newCustomLogic;
  };

  const customLogic = (item: string) => {
    // Check if perm item

    // Iterate through each category in the object
    for (const category in combinedExpenses) {
      // Type assertion to inform TypeScript that category is of type keyof CustomExpense
      if (combinedExpenses.hasOwnProperty(category)) {
        if (
          combinedExpenses[category as keyof ObjectPermExpense].some((keyword) =>
            item.includes(keyword)
          )
        ) {
          return category; // Return the category name (e.g., "Food" or "Travel")
        }
      }
    }

    return "SEB"; // Default return value if no categories match
  };

  const customLogicGetText = (item: string) => {
    // Split the string at the "/" character
    const parts = item.split("/");

    // Take the first part and trim any extra whitespace
    const name = parts[0].trim();

    return name;
  };

  const getPermCategory = (category: string) => {
    // Iterate through each category in the object
    for (const permCategory in objectPermExpense) {
      // Check if any keyword in the category matches the input category
      if (
        objectPermExpense[permCategory].some((keyword) =>
          category.includes(keyword)
        )
      ) {
        return true; // Return the matched category name
      }
    }

    return false; // Default return value if no categories match
  };

  const readExcel = (file: Blob) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        if (!e.target) return;
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        let fileData = XLSX.utils.sheet_to_json(ws, {
          header: excelHeader,
        });

        // remove all rows before 2023-01-01 in fileData
        /*  fileData = fileData.splice(5).filter((item: any) => {

          const date = new Date(item.bokford);

          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          if (date > yesterday) {
            item.saldo = "LAST";
          }
          return date >= new Date(CONST_FIRST_DAY_OF_YEAR);
        }); */

        fileData = fileData.splice(5).map((item: any) => {
          return {
            ...item, // Spread the existing properties of the item
            text: customLogicGetText(item.text), // Set the 'text' property to the new value
          };
        });

        const plaidTransactions = fileData.map((item: any) => {
          return {
            id: item.nummer || "", // Use 'nummer' for transaction ID.
            name: item.text || "", // Use 'text' for transaction description.
            amount: item.belopp || 0, // Use 'belopp' for the transaction amount.
            date: item.bokford || "", // Use 'bokford' for the date.
            paymentChannel: "online", // Example default value.
            pending: false,
            category: getSEBCategory(item.text), // Use 'valuta' as a category or fallback.
            type: item.belopp >= 0 ? "credit" : "debit", // Positive amounts as credit, negative as debit.
            permanent: getPermCategory(item.text),
          };
        });

        console.log("hello csv transactions", plaidTransactions);

        resolve(plaidTransactions);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setCsvTransactions(d);
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          e.preventDefault();
          if (!e.target.files) return;
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <br></br>
      <br></br>
      <br></br>

      <div>table</div>
    </div>
  );
}
