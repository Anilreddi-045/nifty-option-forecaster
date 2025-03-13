
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
  ComposedChart
} from 'recharts';
import { 
  Card,
  CardContent
} from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { StrategyLeg } from '@/lib/strategyCalculations';

interface StrategyChartProps {
  strategyData: {
    strategyName: string;
    currentPrice: number;
    legs: StrategyLeg[];
    payoffPoints: Array<{
      underlyingPrice: number;
      payoff: number;
    }>;
    maxProfit?: number;
    maxLoss?: number;
    breakEvenPoints?: number[];
  };
}

const StrategyChart = ({ strategyData }: StrategyChartProps) => {
  // Find max profit and max loss from payoff points
  const maxPayoff = Math.max(...strategyData.payoffPoints.map(p => p.payoff));
  const minPayoff = Math.min(...strategyData.payoffPoints.map(p => p.payoff));
  
  // Calculate break-even points (where payoff crosses zero)
  const breakEvenPoints: number[] = [];
  for (let i = 1; i < strategyData.payoffPoints.length; i++) {
    const prevPoint = strategyData.payoffPoints[i-1];
    const currPoint = strategyData.payoffPoints[i];
    
    // If sign changes (crosses zero), interpolate to find break-even
    if ((prevPoint.payoff < 0 && currPoint.payoff > 0) || 
        (prevPoint.payoff > 0 && currPoint.payoff < 0)) {
      const ratio = Math.abs(prevPoint.payoff) / (Math.abs(prevPoint.payoff) + Math.abs(currPoint.payoff));
      const breakEvenPrice = prevPoint.underlyingPrice + 
        ratio * (currPoint.underlyingPrice - prevPoint.underlyingPrice);
      breakEvenPoints.push(Math.round(breakEvenPrice * 100) / 100);
    }
  }
  
  // Determine if strategy has net positive payoff at current price
  const currentPayoff = strategyData.payoffPoints.find(
    p => Math.abs(p.underlyingPrice - strategyData.currentPrice) < 0.01
  )?.payoff || 0;
  
  const isProfitable = currentPayoff > 0;
  
  // Format values for display
  const formattedMaxProfit = Math.max(0, maxPayoff).toFixed(2);
  const formattedMaxLoss = Math.abs(Math.min(0, minPayoff)).toFixed(2);
  
  // Get strategy type description
  const getStrategyType = () => {
    const legCount = strategyData.legs.length;
    const hasCall = strategyData.legs.some(leg => leg.optionType === "call");
    const hasPut = strategyData.legs.some(leg => leg.optionType === "put");
    const hasLong = strategyData.legs.some(leg => leg.position === "long");
    const hasShort = strategyData.legs.some(leg => leg.position === "short");
    
    if (legCount === 1) {
      if (hasCall) {
        return strategyData.legs[0].position === "long" ? "Bullish" : "Bearish";
      } else {
        return strategyData.legs[0].position === "long" ? "Bearish" : "Bullish";
      }
    } else if (legCount === 2) {
      if (hasCall && hasPut && hasLong && !hasShort) {
        return "Volatile (Long Straddle/Strangle)";
      } else if (hasCall && hasPut && hasShort && !hasLong) {
        return "Range-Bound (Short Straddle/Strangle)";
      } else if (hasCall && !hasPut && hasLong && hasShort) {
        return "Moderately Bullish (Call Spread)";
      } else if (!hasCall && hasPut && hasLong && hasShort) {
        return "Moderately Bearish (Put Spread)";
      }
    } else if (legCount === 4) {
      if (hasCall && hasPut && hasLong && hasShort) {
        return "Range-Bound (Iron Condor/Butterfly)";
      }
    }
    
    return "Custom Strategy";
  };
  
  // Prepare data with color information for payoff line
  const coloredPayoffPoints = strategyData.payoffPoints.map(point => ({
    ...point,
    // Use this to determine the stroke color for the line segments
    lineColor: point.payoff >= 0 ? "#10b981" : "#ef4444" // green for profit, red for loss
  }));
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-50">
          <CardContent className="pt-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Max Profit</h3>
            <p className="text-2xl font-bold text-green-500">₹{formattedMaxProfit}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50">
          <CardContent className="pt-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Max Loss</h3>
            <p className="text-2xl font-bold text-red-500">₹{formattedMaxLoss}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50">
          <CardContent className="pt-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Break-Even Points</h3>
            <p className="text-lg font-bold">
              {breakEvenPoints.length > 0 
                ? breakEvenPoints.map(p => `₹${p}`).join(', ') 
                : 'N/A'}
            </p>
          </CardContent>
        </Card>
        
        <Card className={`${isProfitable ? 'bg-green-50' : 'bg-red-50'}`}>
          <CardContent className="pt-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Strategy Type</h3>
            <p className="text-lg font-bold">{getStrategyType()}</p>
          </CardContent>
        </Card>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
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
            dataKey="underlyingPrice" 
            name="Nifty Price" 
            label={{ value: 'Nifty Price', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            name="Payoff"
            label={{ value: 'Profit/Loss (₹)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            formatter={(value: number) => [
              `₹${value.toFixed(2)}`, 
              'Profit/Loss',
              value >= 0 ? 'green' : 'red'
            ]}
            labelFormatter={(value) => `Nifty Price: ₹${value}`}
            contentStyle={({ payoff }: any) => ({
              backgroundColor: '#fff',
              border: '1px solid #ccc'
            })}
          />
          <Legend />
          <ReferenceLine 
            y={0} 
            stroke="#666" 
            strokeWidth={1}
          />
          <ReferenceLine 
            x={strategyData.currentPrice} 
            stroke="#ff7300" 
            strokeDasharray="3 3"
            label={{ value: `Current: ₹${strategyData.currentPrice}`, position: 'top' }}
          />
          <defs>
            <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          
          {/* Profit Area (Above 0) */}
          <Area 
            type="monotone" 
            dataKey="payoff" 
            fill="url(#profitGradient)" 
            stroke="none"
            activeDot={false}
            baseValue={0}
            isAnimationActive={false}
            fillOpacity={1}
          />
          
          {/* Loss Area (Below 0) */}
          <Area 
            type="monotone" 
            dataKey="payoff" 
            fill="url(#lossGradient)" 
            stroke="none"
            activeDot={false}
            baseValue={0}
            isAnimationActive={false}
            fillOpacity={1}
          />
          
          {/* Payoff line with conditional coloring */}
          <Line 
            type="monotone" 
            dataKey="payoff" 
            name="Profit/Loss" 
            stroke="#000"
            dot={{ fill: (entry: any) => entry.payoff >= 0 ? '#10b981' : '#ef4444' }}
            activeDot={{ r: 8 }} 
            strokeWidth={2}
            connectNulls
            strokeDasharray="0 0"
            legendType="circle"
            // Apply color to each segment based on profit/loss
            strokeOpacity={0} // Hide the main line
          />
          
          {/* Profit Line (>=0) */}
          <Line 
            type="monotone" 
            dataKey={(dataPoint: any) => dataPoint.payoff >= 0 ? dataPoint.payoff : null}
            name="Profit" 
            stroke="#10b981" 
            dot={false}
            activeDot={false}
            strokeWidth={2}
            connectNulls
            strokeDasharray="0 0"
            legendType="none"
          />
          
          {/* Loss Line (<0) */}
          <Line 
            type="monotone" 
            dataKey={(dataPoint: any) => dataPoint.payoff < 0 ? dataPoint.payoff : null}
            name="Loss" 
            stroke="#ef4444" 
            dot={false}
            activeDot={false}
            strokeWidth={2}
            connectNulls
            strokeDasharray="0 0"
            legendType="none"
          />
        </ComposedChart>
      </ResponsiveContainer>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Strategy Analysis:</h3>
        <p>
          This {strategyData.strategyName} consists of {strategyData.legs.length} legs 
          and has a maximum profit potential of <strong className="text-green-500">₹{formattedMaxProfit}</strong> and 
          maximum loss of <strong className="text-red-500">₹{formattedMaxLoss}</strong>.
        </p>
        <p className="mt-2">
          {breakEvenPoints.length > 0 ? (
            <>The strategy breaks even at {breakEvenPoints.map(p => `₹${p}`).join(' and ')}.</>
          ) : (
            <>This strategy does not have clear break-even points within the analyzed price range.</>
          )}
        </p>
        <p className="mt-2">
          <strong>Outlook:</strong> {getStrategyType()}. 
          {getStrategyType().includes("Bullish") ? 
            " This strategy performs best when the market moves upward." : 
            getStrategyType().includes("Bearish") ? 
              " This strategy performs best when the market moves downward." :
              getStrategyType().includes("Range-Bound") ?
                " This strategy performs best when the market stays within a certain range." :
                getStrategyType().includes("Volatile") ?
                  " This strategy performs best when the market makes a significant move in either direction." :
                  " This is a custom strategy with unique characteristics."
          }
        </p>
      </div>
    </div>
  );
};

export default StrategyChart;
