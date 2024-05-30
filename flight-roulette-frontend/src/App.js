import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./pages/Welcome Page/Welcome";
import BackgroundVideo from "./pages/Background Video/BackgroundVideo";

function App() {
    return (
        <>
            <BackgroundVideo />
            <main className="app-container">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Welcome />} />
                    </Routes>
                </BrowserRouter>
            </main>
        </>
    );
}

export default App;
