import { useContext, useEffect, useState } from "react";

import FundraiserListAdminElement from "../components/FundraiserListAdminElement";
import { FundraisingContext } from "../context/FundraisingContext";

const AdminPage = () => {
    const { contractsList } = useContext(FundraisingContext);
    const [fundraiserList, setFundraiserList] = useState(contractsList);
    const [notApproved, setNotApproved] = useState([]);

    useEffect(() => {
        setFundraiserList(contractsList);
        // contract -> approved()
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
