
import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, RefreshCw } from "lucide-react";

const MarketHeader = () => {
  const [marketData, setMarketData] = useState({
    nifty: { price: 24682.55, change: 0.72, high: 24710.80, low: 24580.20 },
    bankNifty: { price: 51224.35, change: -0.38, high: 51340.25, low: 51180.40 },
    sensex: { price: 81058.76, change: 0.45, high: 81140.50, low: 80920.30 },
    time: new Date().toLocaleString(),
    isLive: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [updateInterval, setUpdateInterval] = useState<number | null>(null);

  // Realistic market movement simulation
  const updateMarketData = () => {
    setIsLoading(true);
    
    // More realistic market movement logic
    const volatilityFactor = 0.08; // Lower for more realistic movements
    const trendBias = Math.random() > 0.5 ? 0.01 : -0.01; // Slight bias in one direction
    
    const updateSecurity = (price: number, change: number, high: number, low: number) => {
      // Calculate new price with a combination of random walk and trend bias
      const randomChange = (Math.random() - 0.5) * volatilityFactor;
      const newPriceChange = price * (randomChange + trendBias) / 100;
      const newPrice = parseFloat((price + newPriceChange).toFixed(2));
      
      // Update change percentage
      const newChange = parseFloat((change + (randomChange * 2)).toFixed(2));
      
      // Update high and low
      const newHigh = newPrice > high ? newPrice : high;
      const newLow = newPrice < low ? newPrice : low;
      
      return {
        price: newPrice,
        change: newChange,
        high: parseFloat(newHigh.toFixed(2)),
        low: parseFloat(newLow.toFixed(2))
      };
    };
    
    setMarketData(prevData => ({
      nifty: updateSecurity(
        prevData.nifty.price, 
        prevData.nifty.change,
        prevData.nifty.high,
        prevData.nifty.low
      ),
      bankNifty: updateSecurity(
        prevData.bankNifty.price, 
        prevData.bankNifty.change,
        prevData.bankNifty.high,
        prevData.bankNifty.low
      ),
      sensex: updateSecurity(
        prevData.sensex.price, 
        prevData.sensex.change,
        prevData.sensex.high,
        prevData.sensex.low
      ),
      time: new Date().toLocaleString(),
      isLive: Boolean(updateInterval)
    }));
    
    setTimeout(() => setIsLoading(false), 300);
  };

  // Toggle live updates
  const toggleLiveUpdates = () => {
    if (updateInterval) {
      clearInterval(updateInterval);
      setUpdateInterval(null);
      setMarketData(prev => ({ ...prev, isLive: false }));
    } else {
      const interval = window.setInterval(updateMarketData, 3000); // Update every 3 seconds
      setUpdateInterval(interval);
      setMarketData(prev => ({ ...prev, isLive: true }));
      // Immediate update
      updateMarketData();
    }
  };

  // Clear interval on unmount
  useEffect(() => {
    return () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
    };
  }, [updateInterval]);

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
                <span className={`mr-1 ${isLoading ? 'opacity-50' : ''}`}>
                  {marketData.nifty.price.toLocaleString()}
                </span>
                <span className={`${getChangeColor(marketData.nifty.change)} ${isLoading ? 'opacity-50' : ''}`}>
                  {getChangeIcon(marketData.nifty.change)}
                  {marketData.nifty.change > 0 ? '+' : ''}{marketData.nifty.change}%
                </span>
              </div>
              <div className="text-xs opacity-75">
                H: {marketData.nifty.high.toLocaleString()} | L: {marketData.nifty.low.toLocaleString()}
              </div>
            </div>
            <div className="text-sm">
              <span className="font-medium">BANKNIFTY</span>
              <div className="flex items-center">
                <span className={`mr-1 ${isLoading ? 'opacity-50' : ''}`}>
                  {marketData.bankNifty.price.toLocaleString()}
                </span>
                <span className={`${getChangeColor(marketData.bankNifty.change)} ${isLoading ? 'opacity-50' : ''}`}>
                  {getChangeIcon(marketData.bankNifty.change)}
                  {marketData.bankNifty.change > 0 ? '+' : ''}{marketData.bankNifty.change}%
                </span>
              </div>
              <div className="text-xs opacity-75">
                H: {marketData.bankNifty.high.toLocaleString()} | L: {marketData.bankNifty.low.toLocaleString()}
              </div>
            </div>
            <div className="text-sm">
              <span className="font-medium">SENSEX</span>
              <div className="flex items-center">
                <span className={`mr-1 ${isLoading ? 'opacity-50' : ''}`}>
                  {marketData.sensex.price.toLocaleString()}
                </span>
                <span className={`${getChangeColor(marketData.sensex.change)} ${isLoading ? 'opacity-50' : ''}`}>
                  {getChangeIcon(marketData.sensex.change)}
                  {marketData.sensex.change > 0 ? '+' : ''}{marketData.sensex.change}%
                </span>
              </div>
              <div className="text-xs opacity-75">
                H: {marketData.sensex.high.toLocaleString()} | L: {marketData.sensex.low.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            <button 
              onClick={toggleLiveUpdates}
              className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-medium mr-2 transition-colors ${
                marketData.isLive 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              <RefreshCw 
                className={`h-3 w-3 ${marketData.isLive ? 'animate-spin' : ''}`} 
              />
              {marketData.isLive ? 'Live' : 'Start Live Updates'}
            </button>
            <div className="text-xs opacity-75">
              {marketData.time}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MarketHeader;
