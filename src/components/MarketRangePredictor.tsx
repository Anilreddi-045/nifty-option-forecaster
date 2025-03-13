
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { suggestStrategies, Strategy } from "@/lib/strategyCalculations";
import { ArrowRight, Lightbulb, Target, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";

const rangePredictorSchema = z.object({
  currentPrice: z.coerce.number().positive("Current price must be positive"),
  lowRange: z.coerce.number().positive("Low range must be positive"),
  highRange: z.coerce.number().positive("High range must be positive"),
  volatility: z.coerce.number().min(0.05).max(0.8),
  confidence: z.coerce.number().min(1).max(10)
}).refine(data => data.highRange > data.lowRange, {
  message: "High range must be greater than low range",
  path: ["highRange"]
});

interface MarketRangePredictorProps {
  currentPrice: number;
  onStrategySelect: (strategy: Strategy) => void;
}

const MarketRangePredictor = ({ currentPrice, onStrategySelect }: MarketRangePredictorProps) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [predictionMade, setPredictionMade] = useState(false);

  const form = useForm<z.infer<typeof rangePredictorSchema>>({
    resolver: zodResolver(rangePredictorSchema),
    defaultValues: {
      currentPrice: currentPrice,
      lowRange: Math.round(currentPrice * 0.95), // Default 5% down
      highRange: Math.round(currentPrice * 1.05), // Default 5% up
      volatility: 0.2,
      confidence: 7
    },
  });
  
  const watchLowRange = form.watch("lowRange");
  const watchHighRange = form.watch("highRange");
  const watchCurrentPrice = form.watch("currentPrice");
  
  // Calculate percentage change from current price
  const lowRangePercent = watchCurrentPrice ? ((watchLowRange - watchCurrentPrice) / watchCurrentPrice * 100).toFixed(2) : "0.00";
  const highRangePercent = watchCurrentPrice ? ((watchHighRange - watchCurrentPrice) / watchCurrentPrice * 100).toFixed(2) : "0.00";
  
  const onSubmit = (values: z.infer<typeof rangePredictorSchema>) => {
    if (values.highRange <= values.lowRange) {
      toast.error("High range must be greater than low range");
      return;
    }
    
    // Get strategy suggestions based on the predicted range
    const strategyRecommendations = suggestStrategies(
      values.currentPrice,
      values.lowRange,
      values.highRange,
      values.volatility
    );
    
    setSuggestions(strategyRecommendations);
    setPredictionMade(true);
    
    toast.success("Market prediction analyzed! Viewing optimal strategies.");
  };
  
  const handleStrategySelect = (strategy: Strategy) => {
    onStrategySelect(strategy);
    toast.success(`${strategy.name} selected and loaded`);
  };
  
  const getOutlookDescription = () => {
    const range = watchHighRange - watchLowRange;
    const rangePercent = range / watchCurrentPrice * 100;
    const midPoint = (watchHighRange + watchLowRange) / 2;
    
    if (rangePercent < 5) return "Neutral/Sideways";
    if (midPoint > watchCurrentPrice * 1.03) return "Bullish";
    if (midPoint < watchCurrentPrice * 0.97) return "Bearish";
    if (rangePercent > 10) return "Volatile";
    return "Moderate movement expected";
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Lightbulb className="h-4 w-4 mr-2" />
          Predict Price Range & Get Strategy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Market Range Predictor</DialogTitle>
          <DialogDescription>
            Predict where you think the market will move, and we'll suggest the best option strategies.
          </DialogDescription>
        </DialogHeader>
        
        {!predictionMade ? (
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
              
              <div className="flex items-center gap-2 mt-4">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium">Low Range:</span>
                <span className="text-sm font-bold">{watchLowRange}</span>
                <span className="text-xs text-muted-foreground">({lowRangePercent}%)</span>
                <ArrowRight className="h-4 w-4 mx-2" />
                <span className="text-sm font-medium">High Range:</span>
                <span className="text-sm font-bold">{watchHighRange}</span>
                <span className="text-xs text-muted-foreground">({highRangePercent}%)</span>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              
              <div className="border p-4 rounded-md bg-muted/30">
                <div className="flex justify-between mb-2">
                  <span className="text-xs">{Math.round(watchCurrentPrice * 0.85)}</span>
                  <span className="text-xs font-medium">{watchCurrentPrice}</span>
                  <span className="text-xs">{Math.round(watchCurrentPrice * 1.15)}</span>
                </div>
                <div className="relative py-4">
                  {/* Current price line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 -ml-0.5 z-10"></div>
                  
                  {/* Range bar */}
                  <div 
                    className="absolute h-3 bg-gray-200 rounded-full top-4"
                    style={{
                      left: `${((watchLowRange - (watchCurrentPrice * 0.85)) / (watchCurrentPrice * 0.3)) * 100}%`,
                      width: `${((watchHighRange - watchLowRange) / (watchCurrentPrice * 0.3)) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="lowRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Low Range Target</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="highRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>High Range Target</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          {...field} 
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="volatility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Volatility: {(field.value * 100).toFixed(0)}%</FormLabel>
                    <FormControl>
                      <Slider
                        min={5}
                        max={80}
                        step={1}
                        value={[field.value * 100]}
                        onValueChange={(value) => {
                          field.onChange(value[0] / 100);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confidence"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Confidence Level: {field.value}/10</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        value={[field.value]}
                        onValueChange={(value) => {
                          field.onChange(value[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-2">
                <div className="rounded-md bg-muted p-3">
                  <div className="text-sm font-medium">Market Outlook:</div>
                  <div className="text-sm flex items-center gap-2">
                    <Target className="h-4 w-4" />
                    {getOutlookDescription()}
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full">
                Analyze & Suggest Strategies
              </Button>
            </form>
          </Form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b">
              <div>
                <h3 className="font-medium">Your Prediction:</h3>
                <div className="text-sm text-muted-foreground">
                  Range: {form.getValues().lowRange} to {form.getValues().highRange} 
                  ({lowRangePercent}% to {highRangePercent}%)
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setPredictionMade(false)}
              >
                Adjust Prediction
              </Button>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-lg">Recommended Strategies</h3>
              {suggestions.length === 0 ? (
                <div className="text-muted-foreground">No strategies match your prediction.</div>
              ) : (
                suggestions.map((item, index) => (
                  <Card key={index} className={index === 0 ? "border-2 border-primary" : ""}>
                    {index === 0 && (
                      <div className="absolute -top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-2 py-0.5 rounded">
                        Best Match
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex justify-between">
                        <span>{item.optimized.name}</span>
                        <span className="text-sm bg-muted px-2 py-0.5 rounded-full">
                          Score: {(item.confidenceScore * 10).toFixed(1)}/10
                        </span>
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {item.strategy.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="py-0">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-green-600">
                          <div className="font-medium">Potential Profit</div>
                          <div>~₹{Math.round(item.expectedProfit)}</div>
                        </div>
                        <div className="text-red-600">
                          <div className="font-medium">Max Risk</div>
                          <div>₹{Math.round(item.maxRisk)}</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 space-y-1">
                        <div className="text-xs font-medium">Strategy Legs:</div>
                        {item.optimized.legs.map((leg: any, i: number) => (
                          <div key={i} className="text-xs flex items-center gap-1 px-2 py-1 bg-muted/50 rounded">
                            <span className={`font-medium ${leg.position === 'long' ? 'text-green-600' : 'text-red-600'}`}>
                              {leg.position === 'long' ? 'Buy' : 'Sell'}
                            </span>
                            <span>{leg.quantity}x</span>
                            <span>{leg.optionType.toUpperCase()}</span>
                            <span>@ {leg.strikePrice}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3">
                      <Button 
                        className="w-full"
                        variant={index === 0 ? "default" : "outline"}
                        onClick={() => handleStrategySelect(item.optimized)}
                      >
                        Load This Strategy
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default MarketRangePredictor;
