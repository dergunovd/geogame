import React from "react";
import Map from "./components/Map";
import { Title } from "./components/Title";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="app">
      <Title />
      <Provider store={store}>
        <Map />
      </Provider>
    </div>
  );
}

export default App;
