import React, {Component} from "react";
import ReactDOM from "react-dom"
import LoginPage from "./components/login/LoginPage";
export default class App extends Component{
    render(){
        return(
            <LoginPage></LoginPage>
        )
    }
}
const wrapper = document.getElementById("approot");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
