'use client';

import React from 'react';

interface Transaction {
  id: string;
  chatId: string;
  payerName: string;
  receiversNames: string[];
  amount: string | number;
  description?: string;
  createdAt: string;
}

interface FinancialData {
  id: string;
  type: 'transaction' | 'balance';
  content: string;
  data: {
    balances?: Record<string, number>;
    transactions?: Transaction[];
    simplifiedTransactions?: Array<{from: string, to: string, amount: number}>;  // Add this
    payerName?: string;
    receiversNames?: string[];
    amount?: number;
    description?: string;
  };
}

const SAMPLE: FinancialData = {
  id: "sample-id",
  type: "balance",
  content: "Current balances",
  data: {
    balances: {
      "Roberto": 40,
      "Patricia": -40
    },
    transactions: [
      {
        id: "tx-1",
        chatId: "chat-1",
        payerName: "Roberto",
        receiversNames: ["Patricia"],
        amount: "40",
        description: "Roberto paid for him and Patricia",
        createdAt: new Date().toISOString()
      }
    ]
  }
};

export function Financial({ data = SAMPLE }: { data?: FinancialData }) {
  if (data.type === 'transaction') {
    return (
      <div className="flex flex-col gap-4 rounded-2xl p-4 bg-green-50 max-w-[500px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <div className="size-10 rounded-full bg-green-100 flex items-center justify-center">
              💰
            </div>
            <div className="text-2xl font-medium text-green-800">
              ${data.data.amount?.toFixed(2)}
            </div>
          </div>
          
          <div className="text-green-600 font-medium">
            {data.data.payerName} paid
          </div>
        </div>

        {data.data.receiversNames && (
          <div className="flex flex-row gap-2 text-green-700">
            Split with: {data.data.receiversNames.join(', ')}
          </div>
        )}
        
        {data.data.description && (
          <div className="text-green-600 text-sm">
            {data.data.description}
          </div>
        )}
      </div>
    );
  }
  if (data.type === 'balance') {
    return (
      <div className="flex flex-col gap-4 rounded-2xl p-4 bg-blue-50 max-w-[500px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
              🔄
            </div>
            <div className="text-2xl font-medium text-blue-800">
              Settlement Plan
            </div>
          </div>
        </div>
  
        {data.data.simplifiedTransactions && data.data.simplifiedTransactions.length > 0 && (
          <div className="flex flex-col gap-2">
            {data.data.simplifiedTransactions.map((tx, index) => (
              <div 
                key={index}
                className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm border-l-4 border-blue-500"
              >
                <span className="text-gray-900">
                  {tx.from} → {tx.to}
                </span>
                <span className="font-medium text-blue-600">
                  ${tx.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  

  return null;
}
