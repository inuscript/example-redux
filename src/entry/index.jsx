import React from "react"
import App from "../component/App.jsx"

var startApp = function(){
  var container = document.querySelector("body")
  React.render(<App />, container)
}
document.addEventListener('DOMContentLoaded', function(){
  startApp()
})