import React from "react"
import App from "../component/App.jsx"

export default function startApp(){
  var container = document.querySelector("body")
  React.render(<App />, container)
}
