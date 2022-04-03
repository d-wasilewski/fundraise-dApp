import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import DetailsPage from "./pages/DetailsPage";
import MainPage from "./pages/MainPage/index.js";
import NavBar from "./components/NavBar";

function App() {
    return (
        <>
            <NavBar />
            <Router>
                <Routes>
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/details/:id" element={<DetailsPage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
