
interface OptionParams {
  underlyingPrice: number;
  strikePrice: number;
  timeToExpiry: number; // in years
  volatility: number; // as decimal (0.2 = 20%)
  interestRate: number; // as decimal (0.05 = 5%)
  optionType: "call" | "put";
  model: "blackscholes" | "binomial";
}

// Calculate option price using either Black-Scholes or Binomial model
export function calculateOptionPrice(params: OptionParams): number {
  if (params.model === "blackscholes") {
    return calculateBlackScholes(params);
  } else {
    return calculateBinomial(params);
  }
}

// Black-Scholes Option Pricing Model
function calculateBlackScholes(params: OptionParams): number {
  const { underlyingPrice, strikePrice, timeToExpiry, volatility, interestRate, optionType } = params;
  
  // Check for valid inputs
  if (volatility <= 0 || timeToExpiry <= 0) {
    return 0;
  }
  
  // Calculate d1 and d2
  const d1 = (Math.log(underlyingPrice / strikePrice) + 
    (interestRate + 0.5 * volatility * volatility) * timeToExpiry) / 
    (volatility * Math.sqrt(timeToExpiry));
    
  const d2 = d1 - volatility * Math.sqrt(timeToExpiry);
  
  // Calculate option price based on option type
  if (optionType === "call") {
    return underlyingPrice * normalCDF(d1) - 
      strikePrice * Math.exp(-interestRate * timeToExpiry) * normalCDF(d2);
  } else {
    return strikePrice * Math.exp(-interestRate * timeToExpiry) * normalCDF(-d2) - 
      underlyingPrice * normalCDF(-d1);
  }
}

// Binomial Option Pricing Model
function calculateBinomial(params: OptionParams): number {
  const { underlyingPrice, strikePrice, timeToExpiry, volatility, interestRate, optionType } = params;
  
  // Number of time steps
  const steps = 50;
  // Time per step
  const dt = timeToExpiry / steps;
  
  // Up and down factors
  const u = Math.exp(volatility * Math.sqrt(dt));
  const d = 1 / u;
  
  // Risk-neutral probability
  const p = (Math.exp(interestRate * dt) - d) / (u - d);
  
  // Array to store option values at final nodes
  const optionValues: number[] = [];
  
  // Calculate option values at expiration
  for (let i = 0; i <= steps; i++) {
    const price = underlyingPrice * Math.pow(u, i) * Math.pow(d, steps - i);
    
    if (optionType === "call") {
      optionValues.push(Math.max(0, price - strikePrice));
    } else {
      optionValues.push(Math.max(0, strikePrice - price));
    }
  }
  
  // Working backward through the tree
  for (let step = steps - 1; step >= 0; step--) {
    for (let i = 0; i <= step; i++) {
      // Option value at each node is the discounted expected value from future nodes
      optionValues[i] = Math.exp(-interestRate * dt) * 
        (p * optionValues[i + 1] + (1 - p) * optionValues[i]);
    }
  }
  
  // Return the option value at the initial node
  return optionValues[0];
}

// Standard normal cumulative distribution function (CDF)
function normalCDF(x: number): number {
  // Constants for approximation
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  
  // Save the sign of x
  const sign = x < 0 ? -1 : 1;
  const absX = Math.abs(x);
  
  // A&S formula 7.1.26
  const t = 1.0 / (1.0 + p * absX);
  const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);
  
  return 0.5 * (1.0 + sign * y);
}
