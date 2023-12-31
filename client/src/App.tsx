import React from 'react';
import Routers from "./Router";
// ** redux **
import {Provider} from "react-redux";
import {store, persist} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";

function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate persistor={persist}>
                    <Routers/>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
