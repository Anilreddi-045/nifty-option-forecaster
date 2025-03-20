import React, { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateOptionPrice } from "@/lib/optionPricing";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const formSchema = z.object({
  underlyingPrice: z.coerce.number().positive("Price must be positive"),
  strikePrice: z.coerce.number().positive("Strike must be positive"),
  daysToExpiry: z.coerce.number().int().positive("Days must be a positive integer"),
  volatility: z.coerce.number().min(1, "Min 1%").max(200, "Max 200%"),
  interestRate: z.coerce.number().min(0, "Min 0%").max(50, "Max 50%"),
  quantity: z.coerce.number().int().positive("Quantity must be a positive integer"),
});

interface StrategyLeg {
  position: "long" | "short";
  strikePrice: number;
  optionType: "call" | "put";
  quantity: number;
}

interface StrategyBuilderProps {
  model: "blackscholes" | "binomial";
}

const StrategyBuilder: React.FC<StrategyBuilderProps> = ({ model }) => {
  const [strategyLegs, setStrategyLegs] = useState<StrategyLeg[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      underlyingPrice: 24500,
      strikePrice: 24700,
      daysToExpiry: 7,
      volatility: 20,
      interestRate: 6.5,
      quantity: 1
    },
  });

  const calculateLegPrice = (leg: StrategyLeg, underlyingPrice: number, daysToExpiry: number, volatility: number, interestRate: number): number => {
    const volatilityDecimal = volatility / 100;
    const interestRateDecimal = interestRate / 100;

    return calculateOptionPrice({
      underlyingPrice: underlyingPrice,
      strikePrice: leg.strikePrice,
      timeToExpiry: daysToExpiry / 365,
      volatility: volatilityDecimal,
      interestRate: interestRateDecimal,
      optionType: leg.optionType,
      model: model
    }) * leg.quantity;
  };

  useEffect(() => {
    // Recalculate total cost whenever strategyLegs changes
    const newTotalCost = strategyLegs.reduce((acc, leg) => {
      const underlyingPrice = form.getValues("underlyingPrice");
      const daysToExpiry = form.getValues("daysToExpiry");
      const volatility = form.getValues("volatility");
      const interestRate = form.getValues("interestRate");

      const legPrice = calculateLegPrice(leg, underlyingPrice, daysToExpiry, volatility, interestRate);
      return leg.position === "long" ? acc + legPrice : acc - legPrice;
    }, 0);

    setTotalCost(newTotalCost);
  }, [strategyLegs, form]);

  const addLeg = (position: "long" | "short") => {
    const values = form.getValues();
    setStrategyLegs([
      ...strategyLegs,
      {
        position: position,
        strikePrice: values.strikePrice,
        optionType: "call",
        quantity: values.quantity
      }
    ]);
  };

  const removeLeg = (index: number) => {
    const newLegs = [...strategyLegs];
    newLegs.splice(index, 1);
    setStrategyLegs(newLegs);
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="underlyingPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Underlying Price</FormLabel>
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

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" step="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => addLeg("long")}>
              Add Long Leg
            </Button>
            <Button type="button" variant="outline" onClick={() => addLeg("short")}>
              Add Short Leg
            </Button>
          </div>
        </form>
      </Form>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Strategy Legs</h3>
        <Table>
          <TableCaption>A summary of your option strategy legs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Position</TableHead>
              <TableHead>Strike Price</TableHead>
              <TableHead>Option Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {strategyLegs.map((leg, index) => (
              <TableRow key={index}>
                <TableCell>{leg.position}</TableCell>
                <TableCell>{leg.strikePrice}</TableCell>
                <TableCell>{leg.optionType}</TableCell>
                <TableCell>{leg.quantity}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => removeLeg(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {strategyLegs.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">No legs added yet.</TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total Cost</TableCell>
              <TableCell className="text-right">₹{totalCost.toFixed(2)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default StrategyBuilder;
