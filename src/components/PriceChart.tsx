
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { 
  Card,
  CardContent
} from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface PriceChartProps {
  optionData: {
    currentPrice: number;
    targetPrice: number;
    strikePrice: number;
    optionType: string;
    currentOptionPrice: number;
    targetOptionPrice: number;
    pricePoints: Array<{
      underlyingPrice: number;
      optionPrice: number;
    }>;
    percentChange: string;
  };
}

const PriceChart = ({ optionData }: PriceChartProps) => {
  const isPriceIncrease = parseFloat(optionData.percentChange) > 0;
  const isTargetAboveStrike = optionData.targetPrice > optionData.strikePrice;
  const isCallOption = optionData.optionType === 'call';
  
  // Determine if the option is in-the-money at target price
  const isInTheMoney = (isCallOption && isTargetAboveStrike) || 
                        (!isCallOption && !isTargetAboveStrike);
  
  // Prepare data for coloring the chart
  const coloredPricePoints = optionData.pricePoints.map((point, index, array) => {
    // Determine if this price point represents a profit or loss compared to current
    const isProfitablePoint = index > 0 && 
      point.optionPrice > array[0].optionPrice;
      
    return {
      ...point,
      lineColor: isProfitablePoint ? "#10b981" : "#ef4444"
    };
  });
  
  // Function to render custom dot
  const renderDot = (props: any) => {
    const { cx, cy, payload } = props;
    
    // Highlight key price points
    if (Math.abs(payload.underlyingPrice - optionData.currentPrice) < 1 || 
        Math.abs(payload.underlyingPrice - optionData.targetPrice) < 1 ||
        Math.abs(payload.underlyingPrice - optionData.strikePrice) < 1) {
      return (
        <circle 
          cx={cx} 
          cy={cy} 
          r={6} 
          fill="#3b82f6" 
          strokeWidth={1}
        />
      );
    }
    return null;
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-50">
          <CardContent className="pt-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Current Option Price</h3>
            <p className="text-2xl font-bold">₹{optionData.currentOptionPrice.toFixed(2)}</p>
          </CardContent>
        </Card>
        
        <Card className={`${isPriceIncrease ? 'bg-green-50' : 'bg-red-50'}`}>
          <CardContent className="pt-6 text-center">
            <h3 className="text-sm font-medium text-gray-500">Price Change</h3>
            <div className="flex items-center justify-center">
              {isPriceIncrease ? (
                <ArrowUp className="h-5 w-5 text-green-500 mr-1" />
              ) : (
                <ArrowDown className="h-5 w-5 text-red-500 mr-1" />
              )}
              <p className={`text-2xl font-bold ${isPriceIncrease ? 'text-green-500' : 'text-red-500'}`}>
                {optionData.percentChange}%
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-finance-dark text-white">
          <CardContent className="pt-6 text-center">
            <h3 className="text-sm font-medium text-gray-300">Forecasted Option Price</h3>
            <p className="text-2xl font-bold">₹{optionData.targetOptionPrice.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={optionData.pricePoints}
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
            name="Option Price"
            label={{ value: 'Option Price (₹)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            formatter={(value: number) => [`₹${value.toFixed(2)}`, 'Option Price']}
            labelFormatter={(value) => `Nifty Price: ₹${value}`}
          />
          <Legend />
          <ReferenceLine 
            x={optionData.strikePrice} 
            stroke="#ff7300" 
            strokeDasharray="3 3"
            label={{ value: `Strike: ₹${optionData.strikePrice}`, position: 'top' }}
          />
          <ReferenceLine 
            x={optionData.currentPrice} 
            stroke="#666" 
            strokeDasharray="3 3"
            label={{ value: `Current: ₹${optionData.currentPrice}`, position: 'bottom' }}
          />
          <ReferenceLine 
            x={optionData.targetPrice} 
            stroke={isPriceIncrease ? "#10b981" : "#ef4444"} 
            strokeDasharray="3 3"
            label={{ value: `Target: ₹${optionData.targetPrice}`, position: 'top' }}
          />
          
          {/* Option price line */}
          <Line 
            type="monotone" 
            dataKey="optionPrice" 
            name="Option Price" 
            stroke="#3b82f6" 
            dot={renderDot}
            activeDot={{ r: 8 }} 
            strokeWidth={2}
          />
          
          {/* Additional line segments to show profit/loss from current to target */}
          {isPriceIncrease && (
            <Line 
              type="linear" 
              dataKey="optionPrice"
              name="Profit" 
              stroke="#10b981"
              strokeWidth={5}
              activeDot={false}
              dot={false}
              connectNulls
              isAnimationActive={false}
              legendType="none"
              // Filter points to only show the line from current to target price
              data={optionData.pricePoints.filter(p => 
                (optionData.targetPrice > optionData.currentPrice) ? 
                  (p.underlyingPrice >= optionData.currentPrice && p.underlyingPrice <= optionData.targetPrice) :
                  (p.underlyingPrice <= optionData.currentPrice && p.underlyingPrice >= optionData.targetPrice)
              )}
              strokeOpacity={0.5}
            />
          )}
          
          {!isPriceIncrease && (
            <Line 
              type="linear" 
              dataKey="optionPrice"
              name="Loss" 
              stroke="#ef4444"
              strokeWidth={5}
              activeDot={false}
              dot={false}
              connectNulls
              isAnimationActive={false}
              legendType="none"
              // Filter points to only show the line from current to target price
              data={optionData.pricePoints.filter(p => 
                (optionData.targetPrice > optionData.currentPrice) ? 
                  (p.underlyingPrice >= optionData.currentPrice && p.underlyingPrice <= optionData.targetPrice) :
                  (p.underlyingPrice <= optionData.currentPrice && p.underlyingPrice >= optionData.targetPrice)
              )}
              strokeOpacity={0.5}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Analysis:</h3>
        <p>
          If Nifty moves from <strong>₹{optionData.currentPrice.toLocaleString()}</strong> to <strong>₹{optionData.targetPrice.toLocaleString()}</strong>, 
          this {optionData.optionType.toUpperCase()} option with strike price ₹{optionData.strikePrice.toLocaleString()} will 
          <span className={isPriceIncrease ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
            {isPriceIncrease ? ' increase' : ' decrease'}
          </span> in value by approximately <strong className={isPriceIncrease ? 'text-green-500' : 'text-red-500'}>
            {optionData.percentChange}%
          </strong>.
        </p>
        <p className="mt-2">
          At the target price, this option will be <strong>{isInTheMoney ? 'in-the-money' : 'out-of-the-money'}</strong>.
          {isInTheMoney 
            ? ` This means the option will have both intrinsic and time value.` 
            : ` This means the option's value will consist entirely of time value.`}
        </p>
      </div>
    </div>
  );
};

export default PriceChart;
