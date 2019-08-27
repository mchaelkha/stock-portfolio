import React, {useState} from 'react';
import MenuBar from './components/MenuBar';
import Portfolio from './components/Portfolio';
import PortfolioFooter from './components/PortfolioFooter';
import './App.css';

const defaultExchanges = ['NYS', 'NAS'];

export default function App() {
  const [exchanges, setExchanges] = useState(defaultExchanges);

  return (
    <div className="App">
      <MenuBar exchanges={exchanges} setExchanges={setExchanges} />
      <Portfolio exchanges={exchanges} />
      <PortfolioFooter />
    </div>
  );

}

