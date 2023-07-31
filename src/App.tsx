import React, {useEffect} from 'react';
import Routers from "./Router";
// ** redux **
import {Provider} from "react-redux";
import {store, persistor} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";

function App() {
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
