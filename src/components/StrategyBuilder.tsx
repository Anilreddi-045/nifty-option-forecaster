
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
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Trash2, Lightbulb } from "lucide-react";
import { Strategy, StrategyLeg, predefinedStrategies } from "@/lib/strategyCalculations";
import { toast } from "sonner";
import MarketRangePredictor from "./MarketRangePredictor";

const legSchema = z.object({
  optionType: z.enum(["call", "put"]),
  strikePrice: z.coerce.number().positive("Strike must be positive"),
  position: z.enum(["long", "short"]),
  quantity: z.coerce.number().int().positive("Quantity must be positive")
});

const strategyBuilderSchema = z.object({
  strategyName: z.string().min(1, "Strategy name is required"),
  currentPrice: z.coerce.number().positive("Price must be positive"),
  legs: z.array(legSchema).min(1, "At least one leg is required")
});

type StrategyBuilderProps = {
  onCalculate: (legs: StrategyLeg[], baseParams: any) => void;
  currentNiftyPrice: number;
};

const StrategyBuilder = ({ onCalculate, currentNiftyPrice }: StrategyBuilderProps) => {
  const [legs, setLegs] = useState<StrategyLeg[]>([
    { optionType: "call", strikePrice: currentNiftyPrice, position: "long", quantity: 1 }
  ]);

  const form = useForm<z.infer<typeof strategyBuilderSchema>>({
    resolver: zodResolver(strategyBuilderSchema),
    defaultValues: {
      strategyName: "Custom Strategy",
      currentPrice: currentNiftyPrice,
      legs: [
        { optionType: "call", strikePrice: currentNiftyPrice, position: "long", quantity: 1 }
      ]
    },
  });

  const addLeg = () => {
    setLegs([...legs, { 
      optionType: "call", 
      strikePrice: currentNiftyPrice, 
      position: "long", 
      quantity: 1 
    }]);
    
    const currentLegs = form.getValues("legs");
    form.setValue("legs", [
      ...currentLegs, 
      { optionType: "call", strikePrice: currentNiftyPrice, position: "long", quantity: 1 }
    ]);
  };

  const removeLeg = (index: number) => {
    if (legs.length > 1) {
      const newLegs = [...legs];
      newLegs.splice(index, 1);
      setLegs(newLegs);
      
      const currentLegs = form.getValues("legs");
      const updatedLegs = [...currentLegs];
      updatedLegs.splice(index, 1);
      form.setValue("legs", updatedLegs);
    } else {
      toast.warning("Strategy must have at least one leg");
    }
  };

  const loadPredefinedStrategy = (strategy: Strategy) => {
    // Update strike prices based on current price
    const updatedLegs = strategy.legs.map(leg => {
      // For bull call spread, set strikes at current price and 5% higher
      // For bear put spread, set strikes at current price and 5% lower
      // For straddle, both at current price
      // For iron condor, set at 10% below, 5% below, 5% above, and 10% above
      
      let strike = currentNiftyPrice;
      if (strategy.name === "Bull Call Spread") {
        if (leg.position === "long") {
          strike = currentNiftyPrice;
        } else {
          strike = Math.round(currentNiftyPrice * 1.05);
        }
      } else if (strategy.name === "Bear Put Spread") {
        if (leg.position === "long") {
          strike = currentNiftyPrice;
        } else {
          strike = Math.round(currentNiftyPrice * 0.95);
        }
      } else if (strategy.name === "Iron Condor") {
        const legIndex = strategy.legs.indexOf(leg);
        if (legIndex === 0) strike = Math.round(currentNiftyPrice * 0.9);
        if (legIndex === 1) strike = Math.round(currentNiftyPrice * 0.95);
        if (legIndex === 2) strike = Math.round(currentNiftyPrice * 1.05);
        if (legIndex === 3) strike = Math.round(currentNiftyPrice * 1.1);
      } else if (strategy.name === "Butterfly Spread") {
        const legIndex = strategy.legs.indexOf(leg);
        if (legIndex === 0) strike = Math.round(currentNiftyPrice * 0.95);
        if (legIndex === 1) strike = Math.round(currentNiftyPrice);
        if (legIndex === 2) strike = Math.round(currentNiftyPrice * 1.05);
      } else if (strategy.name === "Strangle") {
        if (leg.optionType === "call") {
          strike = Math.round(currentNiftyPrice * 1.05);
        } else {
          strike = Math.round(currentNiftyPrice * 0.95);
        }
      } else if (strategy.name.includes("Optimized")) {
        // For optimized strategies, use the strikes as provided
        return leg;
      }
      
      return { ...leg, strikePrice: strike };
    });
    
    setLegs(updatedLegs);
    form.setValue("legs", updatedLegs);
    form.setValue("strategyName", strategy.name);
    
    toast.success(`Loaded ${strategy.name} strategy`);
  };

  const onSubmit = (values: z.infer<typeof strategyBuilderSchema>) => {
    onCalculate(values.legs, {
      currentPrice: values.currentPrice,
      targetPrice: values.currentPrice * 1.05, // Default 5% move
      daysToExpiry: 7,
      volatility: 0.2,
      interestRate: 0.065,
      model: "blackscholes"
    });
    
    toast.success(`Strategy calculation complete`);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <MarketRangePredictor 
          currentPrice={currentNiftyPrice}
          onStrategySelect={loadPredefinedStrategy}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Predefined Strategies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {predefinedStrategies.map((strategy, index) => (
              <Card key={index} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => loadPredefinedStrategy(strategy)}>
                <CardHeader className="p-3">
                  <CardTitle className="text-sm">{strategy.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <p className="text-xs text-gray-500 line-clamp-2">{strategy.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">Current Strategy</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Strike</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {legs.map((leg, index) => (
                <TableRow key={index}>
                  <TableCell className="py-1">{leg.optionType === "call" ? "Call" : "Put"}</TableCell>
                  <TableCell className="py-1">{leg.strikePrice}</TableCell>
                  <TableCell className="py-1">
                    <span className={leg.position === "long" ? "text-green-600" : "text-red-600"}>
                      {leg.position === "long" ? "Buy" : "Sell"}
                    </span>
                  </TableCell>
                  <TableCell className="py-1">{leg.quantity}</TableCell>
                  <TableCell className="py-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeLeg(index)}
                      className="h-6 w-6"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-2 flex justify-end">
            <Button variant="outline" size="sm" onClick={addLeg}>
              <Plus className="h-4 w-4 mr-1" /> Add Leg
            </Button>
          </div>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="strategyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Strategy Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
          </div>
          
          {legs.map((leg, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3 border rounded-md">
              <FormField
                control={form.control}
                name={`legs.${index}.optionType`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Option Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="call">Call</SelectItem>
                        <SelectItem value="put">Put</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`legs.${index}.strikePrice`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Strike Price</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          const newLegs = [...legs];
                          newLegs[index].strikePrice = Number(e.target.value);
                          setLegs(newLegs);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`legs.${index}.position`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        const newLegs = [...legs];
                        newLegs[index].position = value as "long" | "short";
                        setLegs(newLegs);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="long">Buy (Long)</SelectItem>
                        <SelectItem value="short">Sell (Short)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name={`legs.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        step="1" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          const newLegs = [...legs];
                          newLegs[index].quantity = Number(e.target.value);
                          setLegs(newLegs);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}
          
          <Button type="submit" className="w-full bg-finance-dark hover:bg-finance-dark/90">
            Calculate Strategy
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StrategyBuilder;
