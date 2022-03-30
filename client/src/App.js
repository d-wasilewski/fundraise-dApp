import { useContext } from "react";
import "./App.css";
import { FundraisingContext } from "./context/FundraisingContext";

function App() {
  const { connectWallet, connectedAccount } = useContext(FundraisingContext);

  return (
    <div className="App">
      <h1
        style={{
          color: "#e0eaf4",
        }}
      >
        Fundraising app
      </h1>
      <button onClick={connectWallet} className={"buttonGradient"}>
        {connectedAccount ? connectedAccount : "CONNECT WALLET"}
      </button>
    </div>
  );
}

export default App;
