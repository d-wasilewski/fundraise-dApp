import { useState, useEffect, useContext } from "react";

// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import { useNavigate } from "react-router-dom";
import "./style.scss";
import FundraiserListElement from "../FundraiserListElement";
import { FundraisingContext } from "../../context/FundraisingContext";

const FundraiserList = () => {
    const { contractsList } = useContext(FundraisingContext);
    const [fundraiserList, setFundraiserList] = useState(contractsList);

    useEffect(() => {
        const setData = async () => {
            const approved = await Promise.all(
                contractsList.map(async (x) => {
                    const isApproved = await x.approved();
                    if (isApproved) {
                        return x;
                    }
                })
            );
            setFundraiserList(approved.filter((x) => x !== undefined));
        };
        setData();
    }, [contractsList]);

    return (
        <div>
            <div className="list-wrapper">
                <div className="list">
                    {fundraiserList?.map((fundraiser) => (
                        <FundraiserListElement
                            key={fundraiser.address}
                            data={fundraiser}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FundraiserList;
