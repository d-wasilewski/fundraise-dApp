import "./style.scss";
import { useState } from "react";
import { useContext } from "react";
import { FundraisingContext } from "../../context/FundraisingContext";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

const NewFundraiser = (props) => {
    const { connectWallet, connectedAccount, createFunding } =
        useContext(FundraisingContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [deadline, setDeadline] = useState(0);
    const [imagePath, setImagePath] = useState(``);

    function addNew() {
        // if (
        //   title.length > 0 &&
        //   description.length > 0 &&
        //   amount > 0 &&
        //   date > Date.now()
        // ) {

        createFunding(
            amount,
            Date.parse(deadline),
            title,
            description,
            imagePath
        );

        props.parentCallback(false);
        // }
    }

    const uploadPhoto = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        try {
            const added = await client.add(e.target.files[0]);
            console.log(added.path);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            setImagePath(url);
        } catch (error) {
            console.log("Error while uploading the photo");
        }
    };

    function cancel() {
        props.parentCallback(false);
    }

    return (
        <div className="container">
            <div className="formElement">
                <label className="formLabel">Title</label>
                <input
                    className="formInput"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></input>
            </div>
            <div className="formElement">
                <label className="formLabel">Description</label>
                <input
                    className="formInput"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></input>
            </div>
            <div className="formElement">
                <label className="formLabel">Photo</label>
                <div className="innerPhotoInput">
                    <label className="photoInput" htmlFor="photoInput">
                        Choose a photo
                    </label>
                    <input
                        id="photoInput"
                        className="formPhotoInput"
                        type="file"
                        name="myImage"
                        onChange={(event) => {
                            uploadPhoto(event);
                        }}
                    />
                </div>
                {imagePath && <img className="inputPhoto" src={imagePath} />}
            </div>
            <div className="formElement">
                <label className="formLabel">Amount</label>
                <input
                    className="formInput"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                ></input>
            </div>
            <div className="formElement">
                <label className="formLabel">End date</label>
                <input
                    className="formInput"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                ></input>
            </div>

            {connectedAccount ? (
                <div className="formButtons">
                    <button onClick={addNew} className={"buttonGradient"}>
                        Create new fund-raiser
                    </button>
                    <button onClick={cancel} className={"buttonGradient"}>
                        Cancel
                    </button>
                </div>
            ) : (
                <button onClick={connectWallet} className={"buttonGradient"}>
                    CONNECT WALLET
                </button>
            )}
        </div>
    );
};

export default NewFundraiser;
