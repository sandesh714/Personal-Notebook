import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import CreateNote from "./pages/CreateNote";
import Dashboard from "./pages/Dashboard";
import DeleteNote from "./pages/DeleteNote";
import SignIn from "./pages/SignIn";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SignIn />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/createnote" element={<CreateNote />} />
                    <Route path="/deletetask/:id" element={<DeleteNote />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;