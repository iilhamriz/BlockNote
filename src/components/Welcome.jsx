import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

const companyCommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  const features = [
  { icon: "🔒", title: "On-chain Security", desc: "Setiap transaksi tercatat permanen di blockchain" },
  { icon: "💬", title: "Transfer + Message", desc: "Kirim ETH sekaligus tinggalkan pesan untuk penerima" },
  { icon: "⚡", title: "Fast & Lightweight", desc: "Transaksi cepat dengan biaya gas yang efisien" },
  { icon: "🌍", title: "Borderless", desc: "Kirim ke siapa saja, di mana saja, tanpa batas" },
  { icon: "📜", title: "Full History", desc: "Riwayat lengkap semua transaksi tersimpan on-chain" },
  { icon: "🔷", title: "Ethereum Native", desc: "Dibangun di atas jaringan Ethereum yang terpercaya" },
];

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white py-1">
            Every Transfer <br /> Tells a Story
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Every transfer has a story. Send ETH with a message and preserve it on the blockchain, permanently.
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <AiFillPlayCircle className="text-white mr-2" />
              <p className="text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
          )}

<div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-10">
  {features.map((f, i) => (
    <div key={i} className="flex flex-col gap-2 p-4 rounded-2xl border border-gray-700 bg-[#1a1a2e] hover:border-blue-500 transition-all">
      <span className="text-2xl">{f.icon}</span>
      <p className="text-white font-medium text-sm">{f.title}</p>
      <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
    </div>
  ))}
</div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
<div className="p-4 flex justify-end items-start flex-col rounded-2xl h-40 sm:w-72 w-full my-5
  bg-gradient-to-br from-[#0f1923] via-[#0a2a2e] to-[#0d1f2d]
  border border-[#1e3a40] relative overflow-hidden"
>
  {/* Decorative glow */}
  <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#37c7da] opacity-[0.06] blur-2xl" />

  <div className="flex justify-between flex-col w-full h-full relative z-10">
    {/* Top row */}
    <div className="flex justify-between items-start">
      <div className="w-9 h-9 rounded-full border border-[#37c7da]/30 bg-[#37c7da]/10
        flex justify-center items-center text-[#37c7da] font-semibold text-base"
      >
        Ξ
      </div>
      <span className="text-[10px] text-[#37c7da] bg-[#37c7da]/10 border border-[#37c7da]/20
        px-2 py-1 rounded-full tracking-wide"
      >
        Mainnet
      </span>
    </div>

    {/* Bottom row */}
    <div>
      <p className="text-[#6a8a90] text-xs tracking-wide mb-1">
        {shortenAddress(currentAccount)}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-[#e0f0f2] font-medium text-lg">Ethereum</p>
        <div className="w-2 h-2 rounded-full bg-[#37c7da] shadow-[0_0_6px_#37c7da]" />
      </div>
    </div>
  </div>
</div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading
              ? <Loader />
              : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
