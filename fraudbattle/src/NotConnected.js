import React from "react";
import ReactDOM from "react-dom";

async function requestAccounts() {
    await window.ethereum.request({method: 'eth_requestAccounts'});
}

const NotConnected = () => {
    

        return(
            <div>
                <button onClick={requestAccounts}>Connect your wallet</button>
            </div>
        )




        
    

}



const rootElement = document.getElementById("root");
ReactDOM.render(<NotConnected />, rootElement);
export default NotConnected;