import React from 'react';
import { ethers } from 'ethers';
import ReactDOM from "react-dom";



const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner()

function getAccount() {
    let accounts = provider.listAccounts()
    .then(result => console.log(result))
    .catch(error => console.log(error))
}

async function connectWallet() {
    await provider.send("eth_requestAccounts", []);
}

const Connected = () => {

    
    

    // if (typeof window.ethereum !== 'undefined') {
  
        return(
            <div>
                <button className="connectButton" onClick={getAccount}>Console log account info</button><br />
                <button className="connectButton" onClick={connectWallet}>Connect wallet</button>
                



            </div>
        )
    // }

    //  else {
    //     console.log('Please install MetaMask!');
    //     <button className="connectButton" onClick={window.ethereum.enable}>Connect wallet</button>
        
    //     alert('Please install a wallet');

    //     return(
    //         <div>
    //         "Please connect MM"
    //         </div>

    //     )
    
    // }
    



}
export default Connected;