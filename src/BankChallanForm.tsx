import React, { useState } from 'react';
import numberToWords from 'number-to-words';

const BankChallanForm: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(event.target.value);
    setAmount(isNaN(newAmount) ? 0 : newAmount);
  };

  const formatToIndianRupees = (value: number) => {
    return value.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    });
  };

  // const convertToWords = (value: number) => {
  //   return numberToWords.toWords(value);
  // };

  const convertToWordsWithLakhsAndCrores = (value: number) => {
    const crore = Math.floor(value / 10000000); // 1 crore = 10,000,000
    const lakh = Math.floor((value % 10000000) / 100000); // 1 lakh = 100,000
    const remaining = value % 100000;

    const croreWords = crore > 0 ? `${numberToWords.toWords(crore)} crore` : '';
    const lakhWords = lakh > 0 ? `${numberToWords.toWords(lakh)} lakh` : '';
    const remainingWords = remaining > 0 ? numberToWords.toWords(remaining) : '';

    let result = '';
    if (croreWords) result += croreWords;
    if (lakhWords) {
      if (result) result += ' ';
      result += lakhWords;
    }
    if (remainingWords) {
      if (result) result += ' ';
      result += remainingWords;
    }

    return result || 'Zero';
  };

  return (
    <div>
      <h2>Bank Challan Form</h2>
      <form>
        <div>
          <label htmlFor="amount">Amount (in INR):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
        {/* <div>
          <label>Amount in Words:</label>
          <p>{convertToWords(amount)}</p>
        </div> */}
        <div>
          <label>Amount in Words </label>
          <p>{convertToWordsWithLakhsAndCrores(amount)}</p>
        </div>
        <div>
          <label>Formatted Amount:</label>
          <p>{formatToIndianRupees(amount)}</p>
        </div>
      </form>
    </div>
  );
};

export default BankChallanForm;
