import { useLocation, useParams } from "react-router-dom";
import { Grid, Box, Paper, Typography, Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { FundraisingContext } from "../../context/FundraisingContext";
import ContributorsIcon from "../../icons/friends.png";
import ProgressBar from "../../components/ProgressBar";
import "./style.scss";
import { ethers } from "ethers";

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
// }));

const DetailsPage = () => {
    const { id } = useParams();
    //const location = useLocation();

    //const { fundraiser } = location.state;

    const { connectWallet, connectedAccount, getNewContractGivenItsAddress } =
        useContext(FundraisingContext);

    const [donatingAmount, setDonatingAmount] = useState("");

    const [contract, setContract] = useState(undefined);

    const handleInputChange = (e) => {
        setDonatingAmount(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Wplaciles " + donatingAmount);
    };

    const [balance, setBalance] = useState(0);
    const [goal, setGoal] = useState(0);
    const [deadline, setDeadline] = useState(0);
    const [owner, setOwner] = useState("");

    useEffect(async () => {
        let c = await getNewContractGivenItsAddress(id);
        const dataBalance = await c.raisedAmount();
        setBalance(ethers.utils.formatEther(dataBalance));
        const dataGoal = await c.goal();
        setGoal(ethers.utils.formatEther(dataGoal));
        const dataDeadline = await c.deadline();
        setDeadline(ethers.utils.formatEther(dataDeadline));
        const dataOwner = await c.admin();
        setOwner(ethers.utils.formatEther(dataOwner));
        setContract(c);
    });

    return (
        <div>
            {/* <h1>DetailsPage about {fundraiser.id} fund-raiser</h1> */}
            <Grid
                container
                sx={{ width: "100%", height: "100%", display: "flex" }}
            >
                <Grid
                    item
                    xs={12}
                    sm={12}
                    className="details-wrapper"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="center"
                        sx={{ width: "60%" }}
                    >
                        <Grid
                            item
                            xs={12}
                            sx={{
                                maxHeight: 300,
                                color: "white",
                                // backgroundColor: "red",
                            }}
                        >
                            {/* TODO: Zrobic max liczbe znakow do tytułu zbiórki */}
                            <Typography
                                sx={{
                                    width: "75%",
                                    textAlign: "left",
                                    fontSize: "50px",
                                    fontWeight: "bold",
                                }}
                            >
                                {/* {fundraiser.title} */}
                                JESZCZE NIE MA
                            </Typography>
                            <Typography>Zalozyciel zbiorki: {owner}</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={7}
                            sx={{
                                // backgroundColor: "blue",
                                color: "white",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Box
                                component="img"
                                sx={{
                                    maxHeight: 400,
                                    maxWidth: "100%",
                                    borderRadius: "10px",
                                }}
                                alt="FundraiserPhoto"
                                //src={fundraiser.image}
                                // src="https://zrzutka.pl/uploads/chipin/ebxbuu/cover/orginal/c984291683bfbbed215e67903118e65d.jpeg"
                                // src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"
                                // src="https://cdn.icon-icons.com/icons2/2596/PNG/512/check_one_icon_155665.png"
                                src="http://placekitten.com/400/600"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={5}
                            // sx={{ backgroundColor: "pink", color: "white" }}
                        >
                            <Box
                                sx={{
                                    // height: "100%",
                                    width: "100%",
                                    height: 400,
                                }}
                            >
                                <Box sx={{ width: "100%", marginLeft: 5 }}>
                                    <Typography
                                        sx={{
                                            display: "inline",
                                            fontSize: "40px",
                                        }}
                                    >
                                        {balance} ETH
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: "inline",
                                            fontSize: "20px",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        z {goal} ETH
                                    </Typography>
                                </Box>
                                <ProgressBar
                                    amount={balance}
                                    goal={goal}
                                    className="progressBar"
                                />
                                <Box sx={{ width: "100%", marginLeft: 5 }}>
                                    <Typography
                                        sx={{
                                            display: "inline",
                                            fontSize: "40px",
                                        }}
                                    >
                                        Liczba dni
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: "inline",
                                            fontSize: "20px",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        do konca
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        marginLeft: 5,
                                    }}
                                >
                                    <img
                                        src={ContributorsIcon}
                                        alt="ContributorsIcon"
                                        style={{
                                            height: "20px",
                                            width: "20px",
                                            marginRight: "10px",
                                            padding: 0,
                                        }}
                                    />
                                    <Typography sx={{ fontWeight: "bold" }}>
                                        {/* {fundraiser.transactionhistory.length}{" "} */}
                                        wspierających
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        // justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "25px",
                                    }}
                                >
                                    {connectedAccount ? (
                                        <>
                                            <form
                                                onSubmit={handleSubmit}
                                                style={{
                                                    width: "100%",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <TextField
                                                    id="amount-input"
                                                    name="amount"
                                                    label="Kwota"
                                                    type="number"
                                                    value={donatingAmount}
                                                    onChange={handleInputChange}
                                                />
                                                <Button type="submit">
                                                    Wpłać
                                                </Button>
                                            </form>
                                        </>
                                    ) : (
                                        <Button onClick={connectWallet}>
                                            {connectedAccount
                                                ? connectedAccount
                                                : "Connect to wallet"}
                                        </Button>
                                    )}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box></Box>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box sx={{ width: "60%" }}>
                        <Typography variant="h2" sx={{ color: "white" }}>
                            Opis zrzutki
                        </Typography>
                        <Typography sx={{ color: "white" }}>
                            JESZCZE NIE MA
                            {/* {fundraiser.description} */}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            {/* <Grid item xs={6} sm={6}>
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
      </Grid> */}
        </div>
    );
};

export default DetailsPage;
