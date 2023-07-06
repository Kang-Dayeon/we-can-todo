import React from 'react';
// ** redux **
import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import Routers from "./Router";

function App() {
  return (
      <BrowserRouter>
        <Provider store={store}>
          <Routers/>
        </Provider>
      </BrowserRouter>
  );
}

export default App;
