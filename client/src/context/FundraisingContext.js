import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "../utils/contractABI";

export const FundraisingContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const contractAddress = "0x7B571Adc0366978A455e1E19eE5BCF21EFb27579";
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const lotteryContract = new ethers.Contract(
    contractAddress,
    contractABI.abi,
    signer
  );

  return lotteryContract;
};

const contract = getEthereumContract();

export const FundraisingProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please install metamask!");

    const accounts = await ethereum.request({ method: "eth_accounts" });

    setConnectedAccount(accounts[0]);
  };

  const makeContribution = async () => {
    await contract.contribute({
      // wysyła 0.01 na zbiorke
      from: connectedAccount,
      value: ethers.utils.parseEther("0.01"),
      gasLimit: 300000,
    });
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask!");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <FundraisingContext.Provider
      value={{
        connectWallet,
        connectedAccount,
      }}
    >
      {children}
    </FundraisingContext.Provider>
  );
};
