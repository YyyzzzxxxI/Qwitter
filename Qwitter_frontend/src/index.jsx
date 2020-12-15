import React  from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css"

//for webpack async await
import "core-js/stable";
import "regenerator-runtime/runtime";

ReactDOM.render(<App />, document.querySelector("#root"));