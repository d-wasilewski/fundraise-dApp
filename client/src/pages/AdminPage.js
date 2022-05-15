import { useContext, useEffect, useState } from "react";

import FundraiserListAdminElement from "../components/FundraiserListAdminElement";
import { FundraisingContext } from "../context/FundraisingContext";
import Protected from "../components/Protected";

const AdminPage = () => {
    const { contractsList } = useContext(FundraisingContext);
    const [fundraiserList, setFundraiserList] = useState(contractsList);

    useEffect(() => {
        const setData = async () => {
            const approved = await Promise.all(
                contractsList.map(async (x) => {
                    const isApproved = await x.approved();
                    if (!isApproved) {
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
                    {fundraiserList?.map((fundraiser) => {
                        return (
                            <FundraiserListAdminElement
                                key={fundraiser.address}
                                data={fundraiser}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
