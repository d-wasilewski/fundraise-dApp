import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "../utils/contractABI";
import fundraisingContractABI from "../utils/fundingContractABI.json";
import walletAddress from "../metamaskKey";

export const FundraisingContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.providers.Web3Provider(ethereum);
    // const signer = provider.getSigner();
    const wallet = new ethers.Wallet(walletAddress, provider);

    const signer = wallet.provider.getSigner(wallet.address);

    const lotteryContract = new ethers.Contract(
        contractAddress,
        contractABI.abi,
        signer
    );
    console.log(lotteryContract);
    return lotteryContract;
};

const contract = getEthereumContract();

export const FundraisingProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState("");
    const [contractsList, setContractsList] = useState([]);

    // console.log(contract);

    const checkIfWalletIsConnected = async () => {
        if (!ethereum) return alert("Please install metamask!");

        const accounts = await ethereum.request({ method: "eth_accounts" });

        setConnectedAccount(accounts[0]);
    };

    const createFunding = async (
        amountInEth,
        deadline,
        title,
        description,
        url
    ) => {
        console.log("Creating new fundraise");
        try {
            await contract.createFunding(
                amountInEth,
                deadline,
                title,
                description,
                url
            );
        } catch (e) {
            console.log("Error: ", e);
        }
    };

    const getListOfContracts = async () => {
        const fundings = await contract.allFundings();
        //console.log("List of addresses", fundings);

        // Example: creates contract instances on every fundraise address
        const contracts = fundings.map((a) => {
            const n = getNewContractGivenItsAddress(a);
            return n;
        });

        //console.log("Contracts: ", contracts);
        setContractsList(contracts);

        return contracts;
    };

    const getNewContractGivenItsAddress = (address) => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const newContract = new ethers.Contract(
            address,
            fundraisingContractABI.abi,
            signer
        );
        //console.log("Nowy contract", newContract);
        // example: returns balance of newly created fundraise instance
        // const balance = newContract.getBalance();
        // console.log("Balance in ETH: ", ethers.utils.formatEther(balance));
        // this would call contribute function on each
        // await newContract.contribute({
        //   from: connectedAccount,
        //   value: ethers.utils.parseEther("0.001"),
        //   gasLimit: 300000,
        // });
        return newContract;
    };

    const donate = async (amount, address) => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const newContract = new ethers.Contract(
            address,
            fundraisingContractABI.abi,
            signer
        );
        console.log("Donate function: ", newContract, connectedAccount, amount);
        await newContract.contribute({
            from: connectedAccount,
            value: ethers.utils.parseEther(amount),
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

    useEffect(async () => {
        checkIfWalletIsConnected();
        // createFunding(1, 1000);
        await getListOfContracts();
    }, []);

    return (
        <FundraisingContext.Provider
            value={{
                connectWallet,
                connectedAccount,
                contractsList,
                getNewContractGivenItsAddress,
                createFunding,
                donate,
            }}
        >
            {children}
        </FundraisingContext.Provider>
    );
};
