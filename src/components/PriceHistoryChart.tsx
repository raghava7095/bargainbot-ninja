
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { format } from 'date-fns';

interface PricePoint {
  date: string;  // ISO date string
  price: number;
  store?: string;
}

interface PriceHistoryChartProps {
  data: PricePoint[];
  currentPrice: number;
  lowestPrice?: number;
  expectedPrice?: number;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(label);
    return (
      <div className="bg-white shadow-md p-3 rounded border">
        <p className="font-medium">{format(date, 'MMM d, yyyy')}</p>
        <p className="text-brand-purple font-medium">${payload[0].value.toFixed(2)}</p>
        {payload[0].payload.store && (
          <p className="text-gray-500 text-xs">{payload[0].payload.store}</p>
        )}
      </div>
    );
  }
  return null;
};

const PriceHistoryChart = ({ 
  data, 
  currentPrice, 
  lowestPrice,
  expectedPrice,
  className 
}: PriceHistoryChartProps) => {
  // Format data for Recharts
  const chartData = data.map(point => ({
    ...point,
    date: new Date(point.date).getTime(),
  }));

  return (
    <div className={`chart-container ${className}`}>
      <h3 className="font-medium mb-4">Price History</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              domain={['dataMin', 'dataMax']}
              tickFormatter={(timestamp) => format(new Date(timestamp), 'MMM d')}
              type="number"
            />
            <YAxis 
              domain={[
                (dataMin: number) => Math.floor(dataMin * 0.9),
                (dataMax: number) => Math.ceil(dataMax * 1.1)
              ]}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#6E59A5" 
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            
            {/* Current price reference line */}
            <ReferenceLine 
              y={currentPrice} 
              stroke="#0EA5E9" 
              strokeDasharray="3 3"
              label={{ 
                value: "Current", 
                position: "insideTopRight",
                fill: "#0EA5E9"
              }}
            />
            
            {/* Lowest price reference line */}
            {lowestPrice && (
              <ReferenceLine 
                y={lowestPrice} 
                stroke="#10B981" 
                strokeDasharray="3 3"
                label={{ 
                  value: "Lowest", 
                  position: "insideBottomRight",
                  fill: "#10B981"
                }}
              />
            )}
            
            {/* Expected price reference line */}
            {expectedPrice && (
              <ReferenceLine 
                y={expectedPrice} 
                stroke="#F97316" 
                strokeDasharray="3 3"
                label={{ 
                  value: "Expected", 
                  position: "insideTopLeft",
                  fill: "#F97316"
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-brand-purple rounded-full mr-2"></div>
          <span className="text-sm">Price History</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-brand-teal rounded-full mr-2"></div>
          <span className="text-sm">Current Price</span>
        </div>
        {lowestPrice && (
          <div className="flex items-center">
            <div className="w-3 h-3 bg-brand-green rounded-full mr-2"></div>
            <span className="text-sm">Lowest Price</span>
          </div>
        )}
        {expectedPrice && (
          <div className="flex items-center">
            <div className="w-3 h-3 bg-brand-yellow rounded-full mr-2"></div>
            <span className="text-sm">Expected Price</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceHistoryChart;
