import React from "react";

//Redux Store
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

//Components
import NavBar from "./components/navBar";
import Products from "./components/products";

const store = configureStore();

function App() {
  return (
    <div className="container-fluid">
      <NavBar />
      <Provider store={store}>
        <Products />
      </Provider>
    </div>
  );
}

export default App;
