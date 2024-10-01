import "./globals.css";
// import { useState } from "react";
// import { ethers } from "ethers";
// import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";

// async function getWeb3Modal() {
//   const web3Modal = new Web3Modal({
//     cacheProvider: false,
//     providerOptions: {
//       walletconnect: {
//         package: WalletConnectProvider,
//         options: {
//           rpc: "my rpc",
//         },
//       },
//     },
//   });
//   return web3Modal;
// }

// async function connect() {
//   try {
//     const web3Modal = await getWeb3Modal();
//     const connection = await web3Modal.connect();
//     const provider = new ethers.BrowserProvider(connection);


//   }
// }


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
