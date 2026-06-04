import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import useFetch from "../hooks/useFetch";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url, isPreview }) => {
  const gifUrl = useFetch({ keyword });

  return (
    <div className={`m-4 flex flex-col flex-1
      2xl:min-w-[450px] 2xl:max-w-[500px]
      sm:min-w-[270px] sm:max-w-[300px]
      min-w-full rounded-2xl overflow-hidden
      border bg-[#0f0f13]
      hover:border-[#37c7da] transition-all duration-300
      ${isPreview ? "border-[#2a2a35] opacity-60" : "border-[#2a2a35]"}`}
    >
      {/* Preview Badge */}
      {isPreview && (
        <div className="bg-[#1a1a22] text-center py-1">
          <span className="text-[10px] uppercase tracking-widest text-yellow-500">
            ✦ Preview Only
          </span>
        </div>
      )}

      {/* GIF / Image */}
      <img
        src={gifUrl || url}
        alt="transaction"
        className="w-full h-40 object-cover"
      />

      {/* Body */}
      <div className="p-4">
        {/* Amount + Badge */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-[#e0e0e0] text-xl font-medium">
            {amount} <span className="text-sm text-gray-500">ETH</span>
          </p>
          <span className="text-xs text-[#2dca8c] bg-[#0e2a1f] border border-[#1a4a34] px-3 py-1 rounded-full">
            ✓ Confirmed
          </span>
        </div>

        <hr className="border-[#1e1e28] mb-4" />

        {/* From */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] uppercase tracking-wider text-gray-600">From</span>
          <a href={`https://etherscan.io/address/${addressFrom}`}
            target="_blank" rel="noreferrer"
            className="text-[#6fa8f5] text-xs hover:underline">
            {shortenAddress(addressFrom)}
          </a>
        </div>

        {/* To */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-[10px] uppercase tracking-wider text-gray-600">To</span>
          <a href={`https://etherscan.io/address/${addressTo}`}
            target="_blank" rel="noreferrer"
            className="text-[#6fa8f5] text-xs hover:underline">
            {shortenAddress(addressTo)}
          </a>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-[#1a1a22] border border-[#2a2a35] rounded-lg p-3 mt-1">
            <p className="text-[10px] uppercase tracking-wider text-gray-600 mb-1">Message</p>
            <p className="text-gray-400 text-sm leading-relaxed">{message}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#1e1e28] bg-[#0a0a0e]">
        <p className="text-[11px] text-gray-600">{timestamp}</p>
        <a href={`https://etherscan.io/address/${addressFrom}`}
          target="_blank" rel="noreferrer"
          className="text-[11px] text-[#37c7da] flex items-center gap-1 hover:underline">
          Etherscan ↗
        </a>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  const hasRealTransactions = transactions.length > 0;

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        {/* Banner preview — hanya muncul kalau belum ada transaksi asli */}
        {currentAccount && !hasRealTransactions && (
          <div className="text-center mt-6 mb-2 px-4 py-3 rounded-xl border border-yellow-900 bg-[#1a1500]">
            <p className="text-yellow-500 text-sm">
              You have no transactions yet. Here's a preview of what it will look like.
            </p>
          </div>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {hasRealTransactions
            ? [...transactions].reverse().map((transaction, i) => (
                <TransactionsCard key={i} {...transaction} isPreview={false} />
              ))
            : dummyData.map((transaction, i) => (
                <TransactionsCard key={i} {...transaction} isPreview={true} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;