import { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FundraiserList = () => {
  const navigate = useNavigate();

  const [fundraiserlist, setFundraiserlist] = useState([
    {
      index: 0,
      title: 'Fundraiser #1',
      descripton: 'Fundraiser #1 Description',
      raisedamount: 100,
      goalamount: 200,
    },
    {
      index: 1,
      title: 'Fundraiser #2',
      descripton: 'Fundraiser #2 Description',
      raisedamount: 100,
      goalamount: 200,
    },
  ]);

  useEffect(() => {
    //fetch data'
  }, []);

  return (
    <div>
      <h1> List </h1>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            {fundraiserlist &&
              fundraiserlist?.map((fundraiser) => (
                <Grid item xs={6} sm={6} key={fundraiser.index}>
                  <Item>
                    <h1>Photo</h1>
                    <h1>{fundraiser.title}</h1>
                    <h1>{fundraiser.descripton}</h1>
                    <h1>{fundraiser.raisedamount}</h1>
                    <h1>{fundraiser.goalamount}</h1>
                    <button
                      className="buttonGradient"
                      onClick={() => {
                        let link = '/details/' + fundraiser.index;
                        navigate(link);
                      }}
                    >
                      Details
                    </button>
                  </Item>
                </Grid>
              ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default FundraiserList;
