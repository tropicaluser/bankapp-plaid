"use server"

import * as XLSX from "xlsx";
import cloneDeep from "lodash/cloneDeep";
import { join } from "path";
import fs from "fs";

export const getExcelData = async () => {
  const filePath = join(process.cwd(), "kontoutdrag.xlsx");
  console.log('worked', fs.existsSync(filePath))
  const data = fs.existsSync(filePath) ? getExcel(filePath) : [];
  //return data;
};

const excelHeader = [
  "bokford",
  "valuta",
  "nummer",
  "text",
  "belopp",
  "saldo",
];

const CONST_FIRST_DAY_OF_YEAR = "2023-01-01";

export async function getExcel(filePath) {
  try {
    console.log('getExcel 1');

  const workbook = XLSX.readFile(filePath);

  console.log('getExcel 2')

  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  let fileData = XLSX.utils.sheet_to_json(worksheet, {
    header: excelHeader,
  });

  console.log('getExcel 3', fileData)

  // remove all rows before 2023-01-01 in fileData
  fileData = fileData.splice(5).filter((item) => {
    const date = new Date(item.bokford);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date > yesterday) {
      item.saldo = "LAST";
    }
    return date >= new Date(CONST_FIRST_DAY_OF_YEAR);
  });

  // change the whole object to plaid_transactions
  const plaidTransactions = fileData.map((item: any) => {
    return {
      id: item.number || "",  // Use 'nummer' for transaction ID.
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


  console.log('getExcel 4', fileData)

  // Perform deep copy of fileData to eliminate non-serializable properties
  return cloneDeep(fileData);
    
  } catch (error) {
    console.error(error);
    
  }
}

function generateRandomId(length = 36) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
