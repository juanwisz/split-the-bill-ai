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
  if (data.type === 'balance' && data.data.balances) {
    return (
      <div className="flex flex-col gap-4 rounded-2xl p-4 bg-blue-50 max-w-[500px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-2 items-center">
            <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
              🔄
            </div>
            <div className="text-2xl font-medium text-blue-800">
              Current Balances
            </div>
          </div>
        </div>
  
        <div className="flex flex-col gap-2">
          {Object.entries(data.data.balances).map(([person, amount]) => (
            <div
              key={person}
              className="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm"
            >
              <span className="font-medium text-gray-900">
                {person}
              </span>
              <span
                className={
                  amount >= 0
                    ? "font-medium text-green-600"
                    : "font-medium text-red-600"
                }
              >
                {amount >= 0 ? 'Gets back' : 'Owes'} ${Math.abs(amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

  return null;
}
