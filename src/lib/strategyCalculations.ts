
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
  },
  {
    name: "Butterfly Spread",
    description: "Combines bull and bear spreads. Maximum profit at middle strike price, limited risk.",
    legs: [
      { optionType: "call", strikePrice: 0, position: "long", quantity: 1 },
      { optionType: "call", strikePrice: 0, position: "short", quantity: 2 },
      { optionType: "call", strikePrice: 0, position: "long", quantity: 1 }
    ]
  },
  {
    name: "Strangle",
    description: "Buy OTM call and put options. Profits from large price movements in either direction, typically cheaper than a straddle.",
    legs: [
      { optionType: "call", strikePrice: 0, position: "long", quantity: 1 },
      { optionType: "put", strikePrice: 0, position: "long", quantity: 1 }
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

// New function to suggest strategies based on predicted market range
export function suggestStrategies(
  currentPrice: number,
  lowRange: number,
  highRange: number,
  volatility: number
): { 
  strategy: Strategy, 
  optimized: Strategy,
  expectedProfit: number, 
  maxRisk: number,
  confidenceScore: number 
}[] {
  const suggestions: { 
    strategy: Strategy, 
    optimized: Strategy,
    expectedProfit: number, 
    maxRisk: number,
    confidenceScore: number 
  }[] = [];
  
  // Determine market outlook based on range vs current price
  const isNeutral = highRange - lowRange < currentPrice * 0.05; // Less than 5% expected move
  const isBullish = highRange > currentPrice * 1.04; // Expected upside more than 4%
  const isBearish = lowRange < currentPrice * 0.96; // Expected downside more than 4%
  const isVolatile = highRange - lowRange > currentPrice * 0.08; // Range wider than 8%
  
  // Set strike prices based on predicted range
  const midPoint = (lowRange + highRange) / 2;
  const lowerStrike = Math.round(lowRange / 50) * 50; // Round to nearest 50
  const middleStrike = Math.round(midPoint / 50) * 50;
  const upperStrike = Math.round(highRange / 50) * 50;
  
  // Range width as percentage
  const rangeWidth = (highRange - lowRange) / currentPrice;

  // 1. Bull Call Spread for bullish outlook
  if (isBullish) {
    const bullCallSpread = { ...predefinedStrategies[0] };
    const optimizedLegs: StrategyLeg[] = [
      { optionType: "call", strikePrice: Math.min(currentPrice, middleStrike), position: "long", quantity: 1 },
      { optionType: "call", strikePrice: upperStrike, position: "short", quantity: 1 }
    ];
    
    suggestions.push({
      strategy: bullCallSpread,
      optimized: {
        name: "Optimized Bull Call Spread",
        description: bullCallSpread.description,
        legs: optimizedLegs
      },
      expectedProfit: 0.5 * (upperStrike - middleStrike), // Approximate max profit
      maxRisk: 0.3 * (upperStrike - middleStrike), // Approximate max risk
      confidenceScore: isBullish && !isVolatile ? 0.8 : 0.6
    });
  }
  
  // 2. Bear Put Spread for bearish outlook
  if (isBearish) {
    const bearPutSpread = { ...predefinedStrategies[1] };
    const optimizedLegs: StrategyLeg[] = [
      { optionType: "put", strikePrice: Math.max(currentPrice, middleStrike), position: "long", quantity: 1 },
      { optionType: "put", strikePrice: lowerStrike, position: "short", quantity: 1 }
    ];
    
    suggestions.push({
      strategy: bearPutSpread,
      optimized: {
        name: "Optimized Bear Put Spread",
        description: bearPutSpread.description,
        legs: optimizedLegs
      },
      expectedProfit: 0.5 * (middleStrike - lowerStrike), // Approximate max profit
      maxRisk: 0.3 * (middleStrike - lowerStrike), // Approximate max risk
      confidenceScore: isBearish && !isVolatile ? 0.8 : 0.6
    });
  }
  
  // 3. Iron Condor for neutral/range-bound outlook
  if (isNeutral || (highRange - lowRange < currentPrice * 0.1)) {
    const ironCondor = { ...predefinedStrategies[3] };
    const buffer = Math.round((highRange - lowRange) * 0.1 / 50) * 50; // 10% buffer, rounded to nearest 50
    
    const optimizedLegs: StrategyLeg[] = [
      { optionType: "put", strikePrice: Math.max(50, lowerStrike - buffer), position: "long", quantity: 1 },
      { optionType: "put", strikePrice: lowerStrike, position: "short", quantity: 1 },
      { optionType: "call", strikePrice: upperStrike, position: "short", quantity: 1 },
      { optionType: "call", strikePrice: upperStrike + buffer, position: "long", quantity: 1 }
    ];
    
    suggestions.push({
      strategy: ironCondor,
      optimized: {
        name: "Optimized Iron Condor",
        description: ironCondor.description,
        legs: optimizedLegs
      },
      expectedProfit: buffer * 0.2, // Approximate credit received
      maxRisk: buffer * 0.8, // Approximate max risk
      confidenceScore: isNeutral ? 0.85 : 0.6
    });
  }
  
  // 4. Butterfly Spread for precise price target
  if (highRange - lowRange < currentPrice * 0.07) { // Narrow range prediction
    const butterfly = { ...predefinedStrategies[4] };
    const wingWidth = Math.round((highRange - lowRange) / 100) * 50; // Rounded to nearest 50
    
    const optimizedLegs: StrategyLeg[] = [
      { optionType: "call", strikePrice: middleStrike - wingWidth, position: "long", quantity: 1 },
      { optionType: "call", strikePrice: middleStrike, position: "short", quantity: 2 },
      { optionType: "call", strikePrice: middleStrike + wingWidth, position: "long", quantity: 1 }
    ];
    
    suggestions.push({
      strategy: butterfly,
      optimized: {
        name: "Optimized Butterfly Spread",
        description: butterfly.description,
        legs: optimizedLegs
      },
      expectedProfit: wingWidth - (wingWidth * 0.2), // Approximate max profit
      maxRisk: wingWidth * 0.2, // Approximate max risk (cost of spread)
      confidenceScore: rangeWidth < 0.05 ? 0.75 : 0.5
    });
  }
  
  // 5. Straddle or Strangle for volatile outlook
  if (isVolatile) {
    const strategy = rangeWidth > 0.12 ? predefinedStrategies[2] : predefinedStrategies[5]; // Straddle or Strangle
    const isStraddle = strategy.name === "Straddle";
    
    const optimizedLegs: StrategyLeg[] = isStraddle ? 
      [
        { optionType: "call", strikePrice: middleStrike, position: "long", quantity: 1 },
        { optionType: "put", strikePrice: middleStrike, position: "long", quantity: 1 }
      ] : 
      [
        { optionType: "call", strikePrice: upperStrike - Math.round(rangeWidth * currentPrice * 0.2 / 50) * 50, position: "long", quantity: 1 },
        { optionType: "put", strikePrice: lowerStrike + Math.round(rangeWidth * currentPrice * 0.2 / 50) * 50, position: "long", quantity: 1 }
      ];
    
    suggestions.push({
      strategy: strategy,
      optimized: {
        name: `Optimized ${strategy.name}`,
        description: strategy.description,
        legs: optimizedLegs
      },
      expectedProfit: rangeWidth * currentPrice * 0.5, // Approximate expected profit
      maxRisk: rangeWidth * currentPrice * 0.3, // Approximate premium paid
      confidenceScore: volatility > 0.25 ? 0.8 : 0.6
    });
  }
  
  // Sort by confidence score (descending)
  return suggestions.sort((a, b) => b.confidenceScore - a.confidenceScore);
}
