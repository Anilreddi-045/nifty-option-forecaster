
import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

const MarketHeader = () => {
  const [marketData, setMarketData] = useState({
    nifty: { price: 24682.55, change: 0.72 },
    bankNifty: { price: 51224.35, change: -0.38 },
    sensex: { price: 81058.76, change: 0.45 },
    time: new Date().toLocaleString()
  });

  useEffect(() => {
    // Mock data update every 30 seconds
    const interval = setInterval(() => {
      const randomChange = () => (Math.random() - 0.5) * 0.2;
      
      setMarketData(prevData => ({
        nifty: { 
          price: parseFloat((prevData.nifty.price * (1 + randomChange() / 100)).toFixed(2)),
          change: parseFloat((prevData.nifty.change + randomChange()).toFixed(2))
        },
        bankNifty: { 
          price: parseFloat((prevData.bankNifty.price * (1 + randomChange() / 100)).toFixed(2)),
          change: parseFloat((prevData.bankNifty.change + randomChange()).toFixed(2))
        },
        sensex: { 
          price: parseFloat((prevData.sensex.price * (1 + randomChange() / 100)).toFixed(2)),
          change: parseFloat((prevData.sensex.change + randomChange()).toFixed(2))
        },
        time: new Date().toLocaleString()
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getChangeColor = (change: number) => 
    change > 0 ? 'text-finance-gain' : change < 0 ? 'text-finance-loss' : 'text-gray-500';
  
  const getChangeIcon = (change: number) => 
    change > 0 ? <ArrowUp className="h-4 w-4" /> : change < 0 ? <ArrowDown className="h-4 w-4" /> : null;

  return (
    <header className="bg-finance-dark text-white py-3 shadow-md">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-1 sm:space-x-6">
            <div className="text-sm">
              <span className="font-medium">NIFTY</span>
              <div className="flex items-center">
                <span className="mr-1">{marketData.nifty.price.toLocaleString()}</span>
                <span className={getChangeColor(marketData.nifty.change)}>
                  {getChangeIcon(marketData.nifty.change)}
                  {marketData.nifty.change > 0 ? '+' : ''}{marketData.nifty.change}%
                </span>
              </div>
            </div>
            <div className="text-sm">
              <span className="font-medium">BANKNIFTY</span>
              <div className="flex items-center">
                <span className="mr-1">{marketData.bankNifty.price.toLocaleString()}</span>
                <span className={getChangeColor(marketData.bankNifty.change)}>
                  {getChangeIcon(marketData.bankNifty.change)}
                  {marketData.bankNifty.change > 0 ? '+' : ''}{marketData.bankNifty.change}%
                </span>
              </div>
            </div>
            <div className="text-sm">
              <span className="font-medium">SENSEX</span>
              <div className="flex items-center">
                <span className="mr-1">{marketData.sensex.price.toLocaleString()}</span>
                <span className={getChangeColor(marketData.sensex.change)}>
                  {getChangeIcon(marketData.sensex.change)}
                  {marketData.sensex.change > 0 ? '+' : ''}{marketData.sensex.change}%
                </span>
              </div>
            </div>
          </div>
          <div className="text-xs opacity-75 mt-2 sm:mt-0">Last Updated: {marketData.time}</div>
        </div>
      </div>
    </header>
  );
};

export default MarketHeader;
