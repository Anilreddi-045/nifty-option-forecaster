
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OptionCalculator from "@/components/OptionCalculator";
import PriceChart from "@/components/PriceChart";
import MarketHeader from "@/components/MarketHeader";
import AppFooter from "@/components/AppFooter";

const Index = () => {
  const [optionPrice, setOptionPrice] = useState<number | null>(null);
  const [optionData, setOptionData] = useState<any>(null);

  const handleCalculationComplete = (price: number, data: any) => {
    setOptionPrice(price);
    setOptionData(data);
    toast.success("Option price calculated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MarketHeader />
      
      <main className="flex-1 container py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-finance-dark">
            Nifty Option Price Forecaster
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Predict how option prices will change as the Nifty index moves. Enter your parameters below to calculate the theoretical price.
          </p>
        </div>

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

        <Card className="mt-6 p-6 shadow-md">
          <h2 className="text-xl font-bold mb-4 text-finance-dark">About Option Pricing</h2>
          <div className="prose max-w-none">
            <p>
              Option pricing models help predict the theoretical fair value of an option based on various factors including the underlying asset price, strike price, time to expiration, volatility, and interest rates.
            </p>
            <h3 className="text-lg font-semibold mt-4">Models Used:</h3>
            <ul className="list-disc pl-5">
              <li><strong>Black-Scholes Model:</strong> A mathematical model used for pricing European-style options, which can be exercised only at expiration.</li>
              <li><strong>Binomial Model:</strong> A step-by-step approach that models the possible paths an underlying asset's price could take before the option expires.</li>
            </ul>
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
