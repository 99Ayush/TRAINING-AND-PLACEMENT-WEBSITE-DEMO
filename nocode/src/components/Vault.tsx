'use client';

import React, { useState } from 'react';
import { decryptSecret, encryptSecret, mockDb } from '../lib/store';

export default function Vault() {
  const [secrets, setSecrets] = useState(mockDb.vault);
  const [visibleItems, setVisibleItems] = useState<Record<string, string>>({});
  const [newItemName, setNewItemName] = useState('');
  const [newItemValue, setNewItemValue] = useState('');

  const handleAddSecret = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemValue) return;

    const newSecret = {
      id: Math.random().toString(36).substring(7),
      name: newItemName,
      cipherText: encryptSecret(newItemValue),
    };

    const newSecrets = [...secrets, newSecret];
    setSecrets(newSecrets);
    mockDb.vault = newSecrets; // Update mock db
    
    setNewItemName('');
    setNewItemValue('');
  };

  const toggleVisibility = (id: string, cipherText: string) => {
    setVisibleItems(prev => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id]; // Hide
      } else {
        next[id] = decryptSecret(cipherText); // Show
      }
      return next;
    });
  };

  return (
    <div className="glass-card p-6 w-full max-w-md mx-auto flex flex-col gap-6 mt-8">
      <div>
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)]">
          Secure Vault
        </h2>
        <p className="text-sm text-gray-400 mt-1">AES-256 Encrypted Local Storage</p>
      </div>

      <form onSubmit={handleAddSecret} className="flex flex-col gap-3">
        <input 
          type="text" 
          placeholder="Secret Name (e.g. SBI UPI PIN)" 
          className="p-3 bg-black/40 border border-gray-700 rounded-lg outline-none focus:border-[var(--color-neon-blue)] transition-colors"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Secret Value" 
          className="p-3 bg-black/40 border border-gray-700 rounded-lg outline-none focus:border-[var(--color-neon-blue)] transition-colors"
          value={newItemValue}
          onChange={(e) => setNewItemValue(e.target.value)}
        />
        <button 
          type="submit" 
          className="p-3 mt-2 rounded-lg bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] font-semibold text-black hover:opacity-90 transition-opacity flex justify-center items-center"
        >
          Add Secret
        </button>
      </form>

      <div className="flex flex-col gap-3 mt-4">
        <h3 className="font-semibold text-gray-200">Stored Secrets</h3>
        {secrets.length === 0 ? (
          <p className="text-gray-500 text-sm">No secrets stored in vault yet.</p>
        ) : (
          secrets.map(item => (
            <div key={item.id} className="flex flex-col p-4 bg-black/30 rounded-lg border border-gray-800 hover:border-gray-600 transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-300">{item.name}</span>
                <button 
                  onClick={() => toggleVisibility(item.id, item.cipherText)}
                  className="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded text-gray-300 transition-colors"
                >
                  {visibleItems[item.id] ? 'Hide' : 'Reveal'}
                </button>
              </div>
              <div className="mt-2 text-sm max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {visibleItems[item.id] ? (
                  <span className="text-[var(--color-neon-pink)] font-mono tracking-wider">{visibleItems[item.id]}</span>
                ) : (
                  <span className="text-gray-600 font-mono text-xs">HIDDEN • {item.cipherText.substring(0, 24)}...</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
