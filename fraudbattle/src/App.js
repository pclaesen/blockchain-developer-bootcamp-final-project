import React from "react";
import ReactDOM from "react-dom";
import { ethers } from 'ethers';
import Connected from './Connected';
import NotConnected from './NotConnected';
const provider = new ethers.providers.Web3Provider(window.ethereum)


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

      if (typeof window.ethereum !== 'undefined') {
        const fetchAccounts = async () => {
          const account = await provider.listAccounts();
          this.setState({
            account          
          });
          console.log(this.state.account);
        };
        fetchAccounts();

      }
     
      
      
  }

  
    
    render() {
      if (this.state.account.length > 0) {
        return(
          <div className="mainWindow">
            <Connected />
        
          </div>
      )} else {
        
          return(
                          
            <div>
              <NotConnected />    
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