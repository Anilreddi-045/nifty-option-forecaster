
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { useMemo } from 'react';

// Custom tooltip content styles for strategy chart
const customTooltipStyles = (payoff: number) => {
  return {
    backgroundColor: payoff >= 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
    border: payoff >= 0 ? '1px solid rgba(16, 185, 129, 0.5)' : '1px solid rgba(239, 68, 68, 0.5)'
  };
};

// Custom tooltip content for strategy chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const payoff = payload[0].value;
    const isProfit = payoff >= 0;
    
    return (
      <div className="p-2 rounded" style={customTooltipStyles(payoff)}>
        <p className="text-sm font-medium">Nifty Price: ₹{label.toLocaleString()}</p>
        <p className={`text-sm font-medium ${isProfit ? 'text-green-500' : 'text-red-500'}`}>
          Payoff: {isProfit ? '+' : ''}₹{payoff.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

interface StrategyChartProps {
  strategyData: {
    strategyName: string;
    currentPrice: number;
    legs: Array<{
      optionType: string;
      strikePrice: number;
      position: string;
      quantity: number;
      premium?: number;
    }>;
    payoffPoints: Array<{
      price: number;
      payoff: number;
    }>;
  };
}

const StrategyChart = ({ strategyData }: StrategyChartProps) => {
  // Split data into profit and loss segments for better visualization
  const { profitData, lossData, maxProfit, maxLoss, breakEvenPoints } = useMemo(() => {
    let maxProfit = -Infinity;
    let maxLoss = Infinity;
    let lastSign = null;
    let breakEvenPoints: number[] = [];
    
    // Find the maximum profit and maximum loss
    strategyData.payoffPoints.forEach(point => {
      if (point.payoff > maxProfit) maxProfit = point.payoff;
      if (point.payoff < maxLoss) maxLoss = point.payoff;
      
      // Track sign changes to find break-even points
      const currentSign = Math.sign(point.payoff);
      if (lastSign !== null && currentSign !== lastSign && currentSign !== 0) {
        // Simple linear interpolation to get approximate break-even price
        const prevPoint = strategyData.payoffPoints[strategyData.payoffPoints.indexOf(point) - 1];
        if (prevPoint) {
          const breakEvenPrice = prevPoint.price + 
            (point.price - prevPoint.price) * 
            (0 - prevPoint.payoff) / (point.payoff - prevPoint.payoff);
          breakEvenPoints.push(parseFloat(breakEvenPrice.toFixed(2)));
        }
      }
      lastSign = currentSign;
    });
    
    // If maxLoss was never updated, set it to 0
    if (maxLoss === Infinity) maxLoss = 0;
    
    // Split data into profit and loss segments
    const profitData = strategyData.payoffPoints.map(point => ({
      ...point,
      profit: point.payoff > 0 ? point.payoff : 0
    }));
    
    const lossData = strategyData.payoffPoints.map(point => ({
      ...point,
      loss: point.payoff < 0 ? point.payoff : 0
    }));
    
    return { 
      profitData, 
      lossData, 
      maxProfit: maxProfit === -Infinity ? 0 : maxProfit, 
      maxLoss: maxLoss === Infinity ? 0 : maxLoss,
      breakEvenPoints
    };
  }, [strategyData]);
  
  // Calculate strategy metrics
  const getProfitLossRatio = () => {
    if (maxLoss >= 0) return "∞"; // Infinity symbol when no loss
    return (maxProfit / Math.abs(maxLoss)).toFixed(2);
  };
  
  const getPayoffColor = (payoff: number) => {
    return payoff >= 0 ? "#10b981" : "#ef4444";
  };
  
  // Determine if any of the legs is a call option
  const hasCallOptions = strategyData.legs.some(leg => leg.optionType === 'call');
  // Determine if any of the legs is a put option
  const hasPutOptions = strategyData.legs.some(leg => leg.optionType === 'put');
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50">
          <CardContent className="pt-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Max Profit</h3>
            <p className="text-2xl font-bold text-green-500">
              {maxProfit === Infinity ? 'Unlimited' : `₹${maxProfit.toLocaleString()}`}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-red-50">
          <CardContent className="pt-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Max Loss</h3>
            <p className="text-2xl font-bold text-red-500">
              {maxLoss === -Infinity ? 'Unlimited' : `₹${Math.abs(maxLoss).toLocaleString()}`}
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-finance-dark text-white">
          <CardContent className="pt-6 text-center">
            <h3 className="text-sm font-medium text-gray-300">Profit/Loss Ratio</h3>
            <p className="text-2xl font-bold">{getProfitLossRatio()}</p>
          </CardContent>
        </Card>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={strategyData.payoffPoints}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="price" 
            name="Nifty Price" 
            label={{ value: 'Nifty Price', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            name="Payoff" 
            label={{ value: 'Payoff (₹)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine 
            y={0} 
            stroke="#666" 
            strokeDasharray="3 3" 
          />
          <ReferenceLine 
            x={strategyData.currentPrice} 
            stroke="#666" 
            strokeDasharray="3 3" 
            label={{ value: `Current: ₹${strategyData.currentPrice}`, position: 'top' }}
          />
          
          {/* Create a gradient for profit area */}
          <defs>
            <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          
          {/* Profit Area */}
          <Area 
            type="monotone" 
            dataKey="payoff"
            stroke="#10b981" 
            fillOpacity={1}
            fill="url(#profitGradient)"
            activeDot={{ r: 8 }}
            strokeWidth={2}
            // Only fill above the zero line 
            baseLine={0}
            // Only draw the area for positive values
            isAnimationActive={false}
            data={profitData.map(point => ({
              price: point.price,
              payoff: point.payoff > 0 ? point.payoff : null
            }))}
          />
          
          {/* Loss Area */}
          <Area 
            type="monotone" 
            dataKey="payoff"
            stroke="#ef4444" 
            fillOpacity={1}
            fill="url(#lossGradient)"
            activeDot={{ r: 8 }}
            strokeWidth={2}
            // Only fill below the zero line
            baseLine={0}
            // Only draw the area for negative values
            isAnimationActive={false}
            data={lossData.map(point => ({
              price: point.price,
              payoff: point.payoff < 0 ? point.payoff : null
            }))}
          />
          
          {/* Break-even lines */}
          {breakEvenPoints.map((point, index) => (
            <ReferenceLine 
              key={`be-${index}`}
              x={point} 
              stroke="#7c3aed" 
              strokeDasharray="3 3"
              label={{ value: `BE: ₹${point}`, position: 'top', fill: '#7c3aed' }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Strategy Analysis:</h3>
        <p>
          This <strong>{strategyData.strategyName}</strong> strategy 
          {maxProfit === Infinity 
            ? <span className="text-green-500 font-medium"> has unlimited profit potential</span> 
            : <span className="text-green-500 font-medium"> has a maximum profit of ₹{maxProfit.toLocaleString()}</span>} 
          {maxLoss === -Infinity 
            ? <span className="text-red-500 font-medium"> and unlimited risk</span> 
            : <span className="text-red-500 font-medium"> and a maximum loss of ₹{Math.abs(maxLoss).toLocaleString()}</span>}.
        </p>
        
        {breakEvenPoints.length > 0 && (
          <p className="mt-2">
            Break-even {breakEvenPoints.length > 1 ? 'points' : 'point'}: 
            <span className="font-medium"> 
              {breakEvenPoints.map((point, index) => (
                <span key={index}>
                  ₹{point.toLocaleString()}
                  {index < breakEvenPoints.length - 1 ? ' and ' : ''}
                </span>
              ))}
            </span>
          </p>
        )}
        
        <p className="mt-2">
          <span className="font-medium">Market View: </span>
          {hasCallOptions && hasPutOptions 
            ? "This strategy works best when you expect significant price movement in either direction."
            : hasCallOptions 
              ? "This strategy performs well in a bullish market."
              : hasPutOptions 
                ? "This strategy performs well in a bearish market."
                : "This strategy is based on your specific market outlook."}
        </p>
      </div>
    </div>
  );
};

export default StrategyChart;
