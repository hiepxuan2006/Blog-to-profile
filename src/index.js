import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "./scss/index.scss"
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { AppContext } from "./Context/AppContext"
import { Provider } from "react-redux"
import store from "./app/store"
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React>
    <Provider store={store}>
      <AppContext>
        <App />
      </AppContext>
    </Provider>
  </React>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
