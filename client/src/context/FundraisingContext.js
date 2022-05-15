import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import contractABI from "../utils/contractABI";
import fundraisingContractABI from "../utils/fundingContractABI.json";
import walletAddress from "../metamaskKey";

export const FundraisingContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const contractAddress = "0x477f514656E3724909a3244053c1758988055398";
    const provider = new ethers.providers.Web3Provider(ethereum);
    // const signer = provider.getSigner();
    const wallet = new ethers.Wallet(walletAddress, provider);

    const signer = wallet.provider.getSigner(wallet.address);

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
    const [contractsList, setContractsList] = useState([]);

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
        try {
            const fundings = await contract.allFundings();

            // creates contract instances on every fundraise address
            const contracts = fundings.map((a) => {
                const n = getNewContractGivenItsAddress(a);
                return n;
            });

            setContractsList(contracts);

            return contracts;
        } catch (e) {
            console.log("Error:", e);
        }
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

    const approveFundraiser = async (address) => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const newContract = new ethers.Contract(
            address,
            fundraisingContractABI.abi,
            signer
        );

        await newContract.approve();
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

        await getListOfContracts();
    }, []);

    useEffect(() => {
        const onNewFundraiser = async () => {
            await getListOfContracts();
        };

        if (contract) {
            contract.on("newFundingEvent", onNewFundraiser);
        }

        return () => {
            if (contract) {
                contract.off("newFundingEvent", onNewFundraiser);
            }
        };
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
                approveFundraiser,
            }}
        >
            {children}
        </FundraisingContext.Provider>
    );
};
