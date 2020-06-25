import React from "react";
import "./App.css";

/* components */
import { Home } from "./views/Home";

/* context */
import { GlobalProvider } from "./context/GlobalState";

function App() {
    return (
        <GlobalProvider>
            <div className="App">
                <Home />
            </div>
        </GlobalProvider>
    );
}

export default App;
