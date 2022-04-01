import React, { useEffect, useState } from 'react';
import { client } from '../lib/sanityClient';
export const FundraiserList = () => {
  const [fundraiserList, setFundraiserList] = useState([]);

  useEffect(() => {
    async function fetchdata() {
      const query = `*[_type =="fundraisers"] {frHash,goal,wallet, description}`;
      const fund = await client.fetch(query);
      console.log(fund[0].goal);
      setFundraiserList(fund);
    }
    fetchdata();
  }, []);

  return (
    <div>
      {fundraiserList &&
        fundraiserList?.map((fundraiser, index) => (
          <div key={fundraiser.frHash}>
            <h1 className={'fonttest'}>{fundraiser.wallet}</h1>
            <h1 className={'fonttest'}>{fundraiser.description}</h1>
            <h1 className={'fonttest'}>{fundraiser.goal}</h1>
          </div>
        ))}
    </div>
  );
};
