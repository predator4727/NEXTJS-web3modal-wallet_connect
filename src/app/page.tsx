"use client";

import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { abi } from "../constants/abi";

let web3Modal: Web3Modal | undefined;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      rpc: { 42: process.env.SEPOLIA_RPC }, // required
    },
  },
};

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions, // required
  });
}


export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);


  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        if (web3Modal) {
          const web3ModalProvider = await web3Modal.connect();
          setIsConnected(true);
          const provider = new ethers.BrowserProvider(web3ModalProvider);
          setSigner(await provider.getSigner());
        } else {
          console.log("web3Modal is undefined");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsConnected(false);
    }
  }

  async function execute() {
    if (typeof window.ethereum !== "undefined") {
      const contractAddress = "0xfb62B122ae3C67BD8E62b70672E392494A8723Fb";
      const contract = new ethers.Contract(contractAddress, abi, signer);
      try {
        await contract.setNumber(42);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  return (
    <div>
      {hasMetamask ? (
        isConnected ? (
          "Connected! "
        ) : (
          <button onClick={() => connect()}>Connect</button>
        )
      ) : (
        "Please install metamask"
      )}

      {isConnected ? <button onClick={() => execute()}>Execute</button> : ""}
    </div>
  );
}
