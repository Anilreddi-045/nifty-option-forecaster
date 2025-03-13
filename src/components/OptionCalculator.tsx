
import { useState } from "react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateOptionPrice } from "@/lib/optionPricing";

const formSchema = z.object({
  currentPrice: z.coerce.number().positive("Price must be positive"),
  targetPrice: z.coerce.number().positive("Price must be positive"),
  strikePrice: z.coerce.number().positive("Strike must be positive"),
  daysToExpiry: z.coerce.number().int().positive("Days must be a positive integer"),
  volatility: z.coerce.number().min(1, "Min 1%").max(200, "Max 200%"),
  optionType: z.enum(["call", "put"]),
  interestRate: z.coerce.number().min(0, "Min 0%").max(50, "Max 50%")
});

type OptionCalculatorProps = {
  onCalculate: (price: number, data: any) => void;
  model: "blackscholes" | "binomial";
};

const OptionCalculator = ({ onCalculate, model }: OptionCalculatorProps) => {
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPrice: 24500,
      targetPrice: 25000,
      strikePrice: 24700,
      daysToExpiry: 7,
      volatility: 20,
      optionType: "call",
      interestRate: 6.5
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Convert percentages to decimals
    const volatilityDecimal = values.volatility / 100;
    const interestRateDecimal = values.interestRate / 100;
    
    // Calculate option prices for a range of underlying prices to display on chart
    const priceStep = (values.targetPrice - values.currentPrice) / 10;
    const priceRange = Array.from({ length: 11 }, (_, i) => 
      values.currentPrice + priceStep * i
    );
    
    const optionPrices = priceRange.map(price => {
      return {
        underlyingPrice: price,
        optionPrice: calculateOptionPrice({
          underlyingPrice: price,
          strikePrice: values.strikePrice,
          timeToExpiry: values.daysToExpiry / 365, // Convert days to years
          volatility: volatilityDecimal,
          interestRate: interestRateDecimal,
          optionType: values.optionType,
          model: model
        })
      };
    });
    
    // Get the current and target option prices
    const currentOptionPrice = optionPrices[0].optionPrice;
    const targetOptionPrice = optionPrices[optionPrices.length - 1].optionPrice;
    
    setCalculatedPrice(targetOptionPrice);
    
    // Pass data for visualization
    onCalculate(targetOptionPrice, {
      currentPrice: values.currentPrice,
      targetPrice: values.targetPrice,
      strikePrice: values.strikePrice,
      optionType: values.optionType,
      currentOptionPrice,
      targetOptionPrice,
      pricePoints: optionPrices,
      percentChange: ((targetOptionPrice - currentOptionPrice) / currentOptionPrice * 100).toFixed(2)
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="currentPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Nifty Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="targetPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Nifty Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="strikePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strike Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="optionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Option Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="call">Call Option</SelectItem>
                  <SelectItem value="put">Put Option</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="daysToExpiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Days to Expiry</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="volatility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Implied Volatility (%)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="interestRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Risk-Free Rate (%)</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full bg-finance-dark hover:bg-finance-dark/90">
          Calculate Option Price
        </Button>
        
        {calculatedPrice !== null && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
            <div className="text-sm text-gray-600">Forecasted Option Price</div>
            <div className="text-3xl font-bold text-finance-dark">₹{calculatedPrice.toFixed(2)}</div>
          </div>
        )}
      </form>
    </Form>
  );
};

export default OptionCalculator;
