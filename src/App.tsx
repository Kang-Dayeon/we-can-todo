import React, {useEffect} from 'react';
import Routers from "./Router";
// ** redux **
import {Provider} from "react-redux";
import {store, persistor} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
// ** axios **
import axios from 'axios';

function App() {
    const sendRequest = async () => {
        const response = await axios.get('http://localhost:8080')
        console.log(response)
        console.log(response.data)
    }

    useEffect(() => {
        sendRequest()
    })
  return (
      <BrowserRouter>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Routers/>
            </PersistGate>
        </Provider>
      </BrowserRouter>
  );
}

export default App;
