import { BrowserRouter } from "react-router-dom";
import {Fragment} from "react";
import Router from "./components/routes/Router.jsx";
import Nav from "./components/Nav";

function App() {
    return (
        
        <BrowserRouter>
            <Nav />
            <Router />
        </BrowserRouter>
        
    );
}

export default App;
