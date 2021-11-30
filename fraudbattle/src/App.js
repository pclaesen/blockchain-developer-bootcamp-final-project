import React from "react";
import ReactDOM from "react-dom";
// import { ethers } from 'ethers';
import Connected from './Connected';
import NotConnected from './NotConnected';



class App extends React.Component {
  constructor(props) {
      super(props);

    this.state = {account: ''};
  }

  componentDidMount() {  

                     
      //Reload screen on account or network change
      window.ethereum.on('accountsChanged', (accounts) => {
          window.location.reload();
          console.log("Reloaded account changed");
        });

      window.ethereum.on('chainChanged', (accounts) => {
        window.location.reload();
        console.log("Reloaded chain changed");
      });

    //   if (typeof window.ethereum !== 'undefined') {
    //     const fetchAccounts = async () => {
    //       const account = await provider.listAccounts();
    //       this.setState({
    //         account          
    //       });
    //       console.log(this.state.account);
    //     };
    //     fetchAccounts();

    //   }
     
      
      
  }

  
    
    render() {
      if (typeof window.ethereum === 'undefined') {
        return(
                
          <div className="installWallet">
            Welcome to fraudBattle<br/>
            If you haven't installed a compatible wallet, click this button:<br/>
            <button onClick={()=> window.open("https://metamask.io", "_blank")}>Download Metamask</button>    
          </div>
      )} else {
        
        return(
          <div className="mainWindow">
            <Connected />
        
          </div>
        )}






        
      
     
    
        // if (window.ethereum !== 'undefined') {
            
        //     return(
        //         <Connected />            
        //     )
        //     } else {
        //       alert("Please install a compatible wallet");
        //       return(            
        //         <NotConnected />              
        //       )
            
              
        //     }
    

    } 


}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;