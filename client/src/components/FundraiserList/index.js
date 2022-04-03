import { useState, useEffect } from "react";

// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import { useNavigate } from "react-router-dom";
import "./style.scss";
import FundraiserListElement from "../FundraiserListElement";
import { Link } from "react-router-dom";

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
// }));

const FundraiserList = () => {
    // const navigate = useNavigate();

    const [fundraiserList, setFundraiserList] = useState([
        {
            index: 0,
            title: "Fundraiser #1",
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, illum earum. Similique aliquid magni dolor?",
            amount: 3094,
            goal: 5420,
            image: "http://placekitten.com/400/500",
        },
        {
            index: 1,
            title: "Fundraiser #2",
            description:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis nesciunt animi enim corrupti nam dolores, repudiandae necessitatibus? Dolor, totam repudiandae?",
            amount: 300,
            goal: 4500,
            image: "http://placekitten.com/400/480",
        },
        {
            index: 2,
            title: "Fundraiser #3",
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, pariatur atque mollitia, vel iusto in consequatur, quos facere vero beatae possimus quas accusamus vitae sunt?",
            amount: 1294,
            goal: 2137,
            image: "http://placekitten.com/400/450",
        },
        {
            index: 3,
            title: "Fundraiser #4",
            description:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis nesciunt animi enim corrupti nam dolores, repudiandae necessitatibus? Dolor, totam repudiandae?",
            amount: 1093,
            goal: 2094,
            image: "http://placekitten.com/400/600",
        },
    ]);

    useEffect(() => {
        //fetch data'
    }, []);

    return (
        <div>
            <h1> List </h1>
            <div className="list-wrapper">
                <div className="list">
                    {fundraiserList?.map((fundraiser) => (
                        <Link
                            to={`/details/${fundraiser.index}`}
                            key={fundraiser.index}
                            style={{ textDecoration: "none" }}
                            state={{ fundraiser: fundraiser }}
                        >
                            <FundraiserListElement
                                key={fundraiser.index}
                                title={fundraiser.title}
                                description={fundraiser.description}
                                amount={fundraiser.amount}
                                goal={fundraiser.goal}
                                image={fundraiser.image}
                            />
                        </Link>
                    ))}
                </div>

                {/* <Box sx={{ flexGrow: 1 }}>
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
                                                let link =
                                                    "/details/" +
                                                    fundraiser.index;
                                                navigate(link);
                                            }}
                                        >
                                            Details
                                        </button>
                                    </Item>
                                </Grid>
                            ))}
                    </Grid>
                </Box> */}
            </div>
        </div>
    );
};

export default FundraiserList;
