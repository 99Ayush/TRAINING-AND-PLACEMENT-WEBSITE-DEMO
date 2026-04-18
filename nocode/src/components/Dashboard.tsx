'use client';

import React, { useEffect, useState } from 'react';
import { mockDb } from '../lib/store';

export default function Dashboard() {
  const [balances, setBalances] = useState(mockDb.balances);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // In a real app, this would be an API call fetching from different aggregators / scraping SMS
    const currentTotal = mockDb.balances.reduce((acc, curr) => acc + curr.amount, 0);
    setTotal(currentTotal);
  }, []);

  return (
    <div className="glass-card p-6 w-full max-w-md mx-auto flex flex-col gap-6 mt-8">
      <div>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">
          Consolidated Wealth
        </h2>
        <p className="text-sm text-gray-400 mt-1">Aggregated from secure endpoints</p>
      </div>

      <div className="neon-border rounded-xl p-6 bg-black/50 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-neon-blue)]/10 to-[var(--color-neon-purple)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <p className="text-gray-400 text-sm font-medium">Total Balance</p>
        <h1 className="text-4xl font-bold text-white mt-1 neon-text tracking-tight">
          ₹ {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-gray-200">Connected Accounts</h3>
        {balances.map((item, idx) => (
          <div key={idx} className="flex justify-between p-3 bg-black/30 rounded-lg border border-gray-800 hover:border-gray-500 transition-colors">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-100">{item.bank}</span>
              <span className="text-xs text-gray-400">{item.type}</span>
            </div>
            <div className="flex items-center text-[var(--color-neon-blue)] font-medium">
              ₹ {item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
