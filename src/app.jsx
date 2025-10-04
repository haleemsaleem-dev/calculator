import React from "react";

import { CreateShowUsersProvider } from "./context/UserContext";
import { CreateShowProductsProvider } from "./context/ProductContext";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/Router";

function App() {
  return (
    <CreateShowUsersProvider>
      <CreateShowProductsProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </CreateShowProductsProvider>
    </CreateShowUsersProvider>
  );
}

export default App;
