import { useState } from "react";
import * as XLSX from "xlsx";

const excelHeader = [
  "bokford",
  "valuta",
  "nummer",
  "text",
  "belopp",
  "saldo",
];

const CONST_FIRST_DAY_OF_YEAR = "2024-01-01";

export default function Csv({transactions, setCsvTransactions}: any) {
  const [items, setItems] = useState([]);
  console.log('items', items)

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
        fileData = fileData.splice(5).filter((item: any) => {
          const date = new Date(item.bokford);

          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);

          if (date > yesterday) {
            item.saldo = "LAST";
          }
          return date >= new Date(CONST_FIRST_DAY_OF_YEAR);
        });

        const plaidTransactions = fileData.map((item: any) => {
          return {
            id: item.nummer || "",  // Use 'nummer' for transaction ID.
            name: item.text || "",  // Use 'text' for transaction description.
            amount: item.belopp || 0,  // Use 'belopp' for the transaction amount.
            date: item.bokford || "",  // Use 'bokford' for the date.
            paymentChannel: "online",  // Example default value.
            pending: false,
            category: "SEB",  // Use 'valuta' as a category or fallback.
            type: item.belopp >= 0 ? "credit" : "debit",  // Positive amounts as credit, negative as debit.
          };
        });
        
        console.log(plaidTransactions);

        resolve(plaidTransactions);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
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
