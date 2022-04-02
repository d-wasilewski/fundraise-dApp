import { useParams } from "react-router-dom";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import { Grid, Box, Paper, Typography, Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import { FundraisingContext } from "../context/FundraisingContext";
import ContributorsIcon from "../icons/friends.png";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const DetailsPage = () => {
    const { id } = useParams();
    const { connectWallet, connectedAccount } = useContext(FundraisingContext);

    const [donatingAmount, setDonatingAmount] = useState("");

    const handleInputChange = (e) => {
        setDonatingAmount(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Wplaciles " + donatingAmount);
    };

    const [fundraiser, setFundraiser] = useState({
        index: id,
        title: "Fundraiser #1",
        descripton: "Fundraiser #1 Description",
        raisedamount: 100,
        goalamount: 200,
        transactionhistory: [
            {
                name: "asckjdscksc",
                amount: 10,
            },
            {},
        ],
    });

    const donate = () => {
        console.log(`Donating ${donatingAmount} ETH from ${connectedAccount}`);
    };

    return (
        <div>
            {/* <h1>DetailsPage about {fundraiser.id} fund-raiser</h1> */}
            <Grid container sx={{ width: "100%", height: "100%" }}>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    sx={{
                        height: 100,
                        color: "white",
                        backgroundColor: "green",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "left",
                    }}
                >
                    HEADER
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    sx={{
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
                                backgroundColor: "red",
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
                                {fundraiser.title}
                            </Typography>
                            <Typography>Zalozyciel zbiorki?</Typography>
                        </Grid>
                        <Grid
                            item
                            xs={7}
                            sx={{
                                backgroundColor: "blue",
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
                                src="https://zrzutka.pl/uploads/chipin/ebxbuu/cover/orginal/c984291683bfbbed215e67903118e65d.jpeg"
                                // src="https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG98ZW58MHx8MHx8&w=1000&q=80"
                                // src="https://cdn.icon-icons.com/icons2/2596/PNG/512/check_one_icon_155665.png"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={5}
                            sx={{ backgroundColor: "pink", color: "white" }}
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
                                        {fundraiser.raisedamount} ETH
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: "inline",
                                            fontSize: "20px",
                                            marginLeft: "10px",
                                        }}
                                    >
                                        z {fundraiser.goalamount} ETH
                                    </Typography>
                                </Box>
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
                                        {fundraiser.transactionhistory.length}{" "}
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
                            {fundraiser.descripton}
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
