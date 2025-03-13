
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OptionCalculator from "@/components/OptionCalculator";
import PriceChart from "@/components/PriceChart";
import StrategyBuilder from "@/components/StrategyBuilder";
import StrategyChart from "@/components/StrategyChart";
import MarketHeader from "@/components/MarketHeader";
import AppFooter from "@/components/AppFooter";
import { StrategyLeg, calculateStrategyPayoff } from "@/lib/strategyCalculations";

const Index = () => {
  const [optionPrice, setOptionPrice] = useState<number | null>(null);
  const [optionData, setOptionData] = useState<any>(null);
  const [strategyData, setStrategyData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("single");

  const handleCalculationComplete = (price: number, data: any) => {
    setOptionPrice(price);
    setOptionData(data);
    toast.success("Option price calculated successfully!");
  };

  const handleStrategyCalculate = (legs: StrategyLeg[], baseParams: any) => {
    // Generate payoff points across a price range
    const minPrice = baseParams.currentPrice * 0.8;
    const maxPrice = baseParams.currentPrice * 1.2;
    const priceStep = (maxPrice - minPrice) / 40;
    
    const pricePoints = [];
    for (let i = 0; i <= 40; i++) {
      pricePoints.push(minPrice + priceStep * i);
    }
    
    const payoffPoints = calculateStrategyPayoff(legs, baseParams, pricePoints);
    
    // Set strategy data for visualization
    setStrategyData({
      strategyName: "Custom Strategy",
      currentPrice: baseParams.currentPrice,
      legs: legs,
      payoffPoints: payoffPoints
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MarketHeader />
      
      <main className="flex-1 container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-finance-dark">
            Nifty Option Calculator
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Analyze option prices and build option strategies for Nifty. Enter parameters to calculate theoretical prices and payoffs.
          </p>
        </div>

        <Tabs defaultValue="single" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="single">Single Option</TabsTrigger>
            <TabsTrigger value="strategy">Option Strategies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-6 col-span-1 lg:col-span-1 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-finance-dark">Option Parameters</h2>
                <Tabs defaultValue="blackscholes" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="blackscholes">Black-Scholes</TabsTrigger>
                    <TabsTrigger value="binomial">Binomial</TabsTrigger>
                  </TabsList>
                  <TabsContent value="blackscholes">
                    <OptionCalculator onCalculate={handleCalculationComplete} model="blackscholes" />
                  </TabsContent>
                  <TabsContent value="binomial">
                    <OptionCalculator onCalculate={handleCalculationComplete} model="binomial" />
                  </TabsContent>
                </Tabs>
              </Card>
              
              <Card className="p-6 col-span-1 lg:col-span-2 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-finance-dark">Option Price Projection</h2>
                {optionData ? (
                  <PriceChart optionData={optionData} />
                ) : (
                  <div className="flex items-center justify-center h-80 bg-gray-100 rounded-lg border border-gray-200">
                    <p className="text-gray-500">Enter parameters and calculate to see price projection</p>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="strategy">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="p-6 col-span-1 lg:col-span-1 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-finance-dark">Strategy Builder</h2>
                <StrategyBuilder 
                  onCalculate={handleStrategyCalculate} 
                  currentNiftyPrice={24500}
                />
              </Card>
              
              <Card className="p-6 col-span-1 lg:col-span-2 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-finance-dark">Strategy Payoff</h2>
                {strategyData ? (
                  <StrategyChart strategyData={strategyData} />
                ) : (
                  <div className="flex items-center justify-center h-80 bg-gray-100 rounded-lg border border-gray-200">
                    <p className="text-gray-500">Build a strategy and calculate to see payoff projection</p>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-6 p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-finance-dark">
            {activeTab === "single" ? 
              "About Option Pricing" : 
              "About Option Strategies"
            }
          </h2>
          <div className="prose max-w-none">
            {activeTab === "single" ? (
              <>
                <p>
                  Option pricing models help predict the theoretical fair value of an option based on various factors including the underlying asset price, strike price, time to expiration, volatility, and interest rates.
                </p>
                <h3 className="text-lg font-semibold mt-4">Models Used:</h3>
                <ul className="list-disc pl-5">
                  <li><strong>Black-Scholes Model:</strong> A mathematical model used for pricing European-style options, which can be exercised only at expiration.</li>
                  <li><strong>Binomial Model:</strong> A step-by-step approach that models the possible paths an underlying asset's price could take before the option expires.</li>
                </ul>
              </>
            ) : (
              <>
                <p>
                  Option strategies are combinations of options and sometimes the underlying asset that create unique risk-reward profiles. Traders use strategies to express specific market views with controlled risk.
                </p>
                <h3 className="text-lg font-semibold mt-4">Common Strategies:</h3>
                <ul className="list-disc pl-5">
                  <li><strong>Bull Call Spread:</strong> Buy a call and sell a higher strike call. Limited risk and reward, profits from moderate upward moves.</li>
                  <li><strong>Bear Put Spread:</strong> Buy a put and sell a lower strike put. Limited risk and reward, profits from moderate downward moves.</li>
                  <li><strong>Straddle:</strong> Buy a call and put at the same strike. Profits from large price movements in either direction.</li>
                  <li><strong>Iron Condor:</strong> Sell an out-of-the-money call spread and put spread. Profits when price remains within a range.</li>
                </ul>
              </>
            )}
            <p className="mt-4">
              <strong>Note:</strong> These calculations are theoretical and for educational purposes. Actual market prices may differ due to various market factors.
            </p>
          </div>
        </Card>
      </main>

      <AppFooter />
    </div>
  );
};

export default Index;
