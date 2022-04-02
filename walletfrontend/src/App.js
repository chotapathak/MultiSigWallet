import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [wallets, setWallet] = useState([]);

  useEffect(() => {
    async function fetcher() {
      const res = await fetch('htts://localhost:3001/wallet');
      const wallets = await res.json();

      setWallet(wallets);
    }
    fetcher();
  },[]);

  return (
    <div className="App">
      <ul>
        {
          wallets.map(wallet => (
            <li key={wallet.id}>
              
              <p>Owner: {wallet.address}</p>
        
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
