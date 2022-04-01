import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import { FundraisingContext } from '../context/FundraisingContext';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const DetailsPage = () => {
  const { id } = useParams();
  const { connectWallet, connectedAccount } = useContext(
    FundraisingContext
  );

  const [donatingAmount, setDonatingAmount] = useState(0);

  const [fundraiser, setFundraiser] = useState({
    index: id,
    title: 'Fundraiser #1',
    descripton: 'Fundraiser #1 Description',
    raisedamount: 100,
    goalamount: 200,
    transactionhistory: [
      {
        name: 'asckjdscksc',
        amount: 10,
      },
      {},
    ],
  });

  const donate = () => {
    console.log(
      `Donating ${donatingAmount} ETH from ${connectedAccount}`
    );
  };

  return (
    <div>
      <h1>DetailsPage about {fundraiser.id} fund-raiser</h1>
      <Grid item xs={6} sm={6}>
        <Item>
          <h1>Photo</h1>
          <h1>{fundraiser.title}</h1>
          <h1>{fundraiser.descripton}</h1>
          <h1>{fundraiser.raisedamount}</h1>
          <h1>{fundraiser.goalamount}</h1>
          <h1>
            Last transactions {fundraiser.transactionhistory.length}
          </h1>
          <div>
            <input
              value={donatingAmount}
              onChange={(e) => setDonatingAmount(e.target.value)}
            ></input>
            <button className="buttonGradient" onClick={donate}>
              Donate
            </button>
          </div>
        </Item>
      </Grid>
    </div>
  );
};

export default DetailsPage;
