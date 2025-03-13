
import { calculateOptionPrice } from "./optionPricing";

export type StrategyLeg = {
  optionType: "call" | "put";
  strikePrice: number;
  position: "long" | "short";
  quantity: number;
};

export type Strategy = {
  name: string;
  description: string;
  legs: StrategyLeg[];
};

// Predefined strategies
export const predefinedStrategies: Strategy[] = [
  {
    name: "Bull Call Spread",
    description: "Buy a call option and sell another call option with a higher strike price. Limited risk and reward strategy, profits when the price rises moderately.",
    legs: [
      { optionType: "call", strikePrice: 0, position: "long", quantity: 1 },
      { optionType: "call", strikePrice: 0, position: "short", quantity: 1 }
    ]
  },
  {
    name: "Bear Put Spread",
    description: "Buy a put option and sell another put option with a lower strike price. Limited risk and reward strategy, profits when the price falls moderately.",
    legs: [
      { optionType: "put", strikePrice: 0, position: "long", quantity: 1 },
      { optionType: "put", strikePrice: 0, position: "short", quantity: 1 }
    ]
  },
  {
    name: "Straddle",
    description: "Buy a call and put option at the same strike price. Profits from significant price movements in either direction.",
    legs: [
      { optionType: "call", strikePrice: 0, position: "long", quantity: 1 },
      { optionType: "put", strikePrice: 0, position: "long", quantity: 1 }
    ]
  },
  {
    name: "Iron Condor",
    description: "Sell a call spread and a put spread. Profits when the price stays within a range.",
    legs: [
      { optionType: "put", strikePrice: 0, position: "long", quantity: 1 },
      { optionType: "put", strikePrice: 0, position: "short", quantity: 1 },
      { optionType: "call", strikePrice: 0, position: "short", quantity: 1 },
      { optionType: "call", strikePrice: 0, position: "long", quantity: 1 }
    ]
  }
];

// Calculate strategy payoff at different prices
export function calculateStrategyPayoff(
  strategy: StrategyLeg[],
  baseParams: {
    currentPrice: number;
    targetPrice: number;
    daysToExpiry: number;
    volatility: number;
    interestRate: number;
    model: "blackscholes" | "binomial";
  },
  pricePoints: number[]
) {
  // Calculate initial option prices (cost/premium)
  const initialPrices = strategy.map(leg => {
    const price = calculateOptionPrice({
      underlyingPrice: baseParams.currentPrice,
      strikePrice: leg.strikePrice,
      timeToExpiry: baseParams.daysToExpiry / 365,
      volatility: baseParams.volatility,
      interestRate: baseParams.interestRate,
      optionType: leg.optionType,
      model: baseParams.model
    });
    
    // If short position, we receive premium
    const initialValue = leg.position === "long" ? -price : price;
    return initialValue * leg.quantity;
  });
  
  // Total initial investment/credit
  const initialNetValue = initialPrices.reduce((sum, price) => sum + price, 0);
  
  // Calculate payoff at different price points
  return pricePoints.map(price => {
    const payoffs = strategy.map((leg, index) => {
      const optionPrice = calculateOptionPrice({
        underlyingPrice: price,
        strikePrice: leg.strikePrice,
        timeToExpiry: baseParams.daysToExpiry / 365, 
        volatility: baseParams.volatility,
        interestRate: baseParams.interestRate,
        optionType: leg.optionType,
        model: baseParams.model
      });
      
      // Final value depends on position type
      const finalValue = leg.position === "long" ? optionPrice : -optionPrice;
      return finalValue * leg.quantity;
    });
    
    // Net payoff is sum of all legs plus initial investment/credit
    const legPayoffs = payoffs.reduce((sum, payoff) => sum + payoff, 0);
    const totalPayoff = legPayoffs + initialNetValue;
    
    return {
      underlyingPrice: price,
      payoff: totalPayoff
    };
  });
}
