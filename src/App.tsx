import React from "react";
import Map from "./components/Map";
import { Title } from "./components/Title";
import { store } from "./store";
import { Provider } from "react-redux";
import { Info } from "./components/Info";

function App() {
  return (
    <div className="app">
      <Title />
      <Provider store={store}>
        <Map />
      </Provider>
      <Info />
    </div>
  );
}

export default App;
