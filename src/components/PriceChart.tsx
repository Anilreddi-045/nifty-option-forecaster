
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
                <ArrowUp className="h-5 w-5 text-finance-gain mr-1" />
              ) : (
                <ArrowDown className="h-5 w-5 text-finance-loss mr-1" />
              )}
              <p className={`text-2xl font-bold ${isPriceIncrease ? 'text-finance-gain' : 'text-finance-loss'}`}>
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
          <Line 
            type="monotone" 
            dataKey="optionPrice" 
            name="Option Price" 
            stroke="#3b82f6" 
            activeDot={{ r: 8 }} 
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Analysis:</h3>
        <p>
          If Nifty moves from <strong>₹{optionData.currentPrice.toLocaleString()}</strong> to <strong>₹{optionData.targetPrice.toLocaleString()}</strong>, 
          this {optionData.optionType.toUpperCase()} option with strike price ₹{optionData.strikePrice.toLocaleString()} will 
          {isPriceIncrease ? ' increase' : ' decrease'} in value by approximately <strong>{optionData.percentChange}%</strong>.
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
