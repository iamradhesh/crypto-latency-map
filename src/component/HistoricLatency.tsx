"use client";
import React, { useEffect, useState } from "react";
import {
  X,
  TrendingUp,
  BarChart3,
  Server,
  Clock,
  Activity,
  ChevronDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface Exchange {
  name: string;
  region: string;
  provider: string;
}

interface HistoricalLatencyProps {
  selectedExchange: Exchange;
  allExchanges: Exchange[];
  onClose: () => void;
}

const HistoricalLatency: React.FC<HistoricalLatencyProps> = ({
  selectedExchange,
  allExchanges,
  onClose,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [comparisonExchanges, setComparisonExchanges] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Generate mock latency data
  useEffect(() => {
    const generateData = () => {
      const points = Array.from({ length: isMobile ? 20 : 30 }, (_, i) => ({
        time: `${i + 1}m`,
        latency: 30 + Math.random() * 70,
      }));
      setData(points);
    };
    generateData();
  }, [selectedExchange, isMobile]);

  // Mock data for comparisons
  const comparisonData = comparisonExchanges.map((exchange) => ({
    name: exchange,
    data: Array.from({ length: data.length }, (_, i) => ({
      time: `${i + 1}m`,
      latency: 40 + Math.random() * 60,
    })),
  }));

  // Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 md:p-3 shadow-xl">
          <p className="text-xs md:text-sm text-gray-300 mb-1">Time: {label}</p>
          {payload.map((p: any, i: number) => (
            <p key={i} className="text-xs md:text-sm font-medium" style={{ color: p.color }}>
              {p.name}: {p.value.toFixed(2)} ms
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Toggle exchange comparison
  const toggleComparisonExchange = (exchangeName: string) => {
    setComparisonExchanges((prev) => {
      if (prev.includes(exchangeName)) {
        return prev.filter((e) => e !== exchangeName);
      }
      if (prev.length >= 3) return prev; // Max 3
      return [...prev, exchangeName];
    });
  };

  const stats = {
    avg: data.length ? (data.reduce((acc, d) => acc + d.latency, 0) / data.length).toFixed(1) : "0",
    max: data.length ? Math.max(...data.map((d) => d.latency)).toFixed(1) : "0",
    min: data.length ? Math.min(...data.map((d) => d.latency)).toFixed(1) : "0",
    uptime: (98 + Math.random() * 2).toFixed(1),
  };

  return (
    <div className={`w-full ${
      isMobile ? "h-full" : "max-w-4xl"
    } bg-gray-900/95 rounded-xl ${
      isMobile ? "p-4" : "p-6"
    } backdrop-blur-sm shadow-2xl border border-gray-800`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4 md:mb-5 border-b border-gray-800 pb-3">
        <div className="flex items-start gap-2 md:gap-3 flex-1 min-w-0">
          <Server className="text-green-400 w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <h2 className="text-base md:text-lg font-semibold text-white truncate">
              Latency History – {selectedExchange.name}
            </h2>
            <p className="text-xs md:text-sm text-gray-400 truncate">
              {selectedExchange.region} • {selectedExchange.provider}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition p-1 flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-4 md:mb-6 text-center">
        <div className="bg-gray-800/70 rounded-lg p-2 md:p-3 border border-gray-700">
          <Clock className="mx-auto text-blue-400 w-4 h-4 md:w-5 md:h-5 mb-1" />
          <p className="text-gray-400 text-[10px] md:text-sm">Min Latency</p>
          <p className="text-sm md:text-lg font-semibold text-white truncate">
            {stats.min} ms
          </p>
        </div>
        <div className="bg-gray-800/70 rounded-lg p-2 md:p-3 border border-gray-700">
          <Activity className="mx-auto text-green-400 w-4 h-4 md:w-5 md:h-5 mb-1" />
          <p className="text-gray-400 text-[10px] md:text-sm">Avg Latency</p>
          <p className="text-sm md:text-lg font-semibold text-white truncate">
            {stats.avg} ms
          </p>
        </div>
        <div className="bg-gray-800/70 rounded-lg p-2 md:p-3 border border-gray-700">
          <Activity className="mx-auto text-yellow-400 w-4 h-4 md:w-5 md:h-5 mb-1" />
          <p className="text-gray-400 text-[10px] md:text-sm">Max Spike</p>
          <p className="text-sm md:text-lg font-semibold text-white truncate">
            {stats.max} ms
          </p>
        </div>
        <div className="bg-gray-800/70 rounded-lg p-2 md:p-3 border border-gray-700">
          <TrendingUp className="mx-auto text-green-400 w-4 h-4 md:w-5 md:h-5 mb-1" />
          <p className="text-gray-400 text-[10px] md:text-sm">Uptime</p>
          <p className="text-sm md:text-lg font-semibold text-white truncate">
            {stats.uptime}%
          </p>
        </div>
      </div>

      {/* Line Chart */}
      <div className={`${isMobile ? "h-64" : "h-72"} mb-4 bg-gray-800/30 rounded-lg p-2 md:p-4`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey="time" 
              stroke="#888" 
              style={{ fontSize: isMobile ? 10 : 12 }}
              interval={isMobile ? "preserveStartEnd" : "preserveStart"}
            />
            <YAxis 
              stroke="#888" 
              style={{ fontSize: isMobile ? 10 : 12 }}
              width={isMobile ? 35 : 50}
            />
            <Tooltip content={<CustomTooltip />} />
            {!isMobile && <Legend />}
            <Line
              type="monotone"
              dataKey="latency"
              stroke="#10b981"
              strokeWidth={2}
              dot={false}
              name={selectedExchange.name}
            />
            {comparisonData.map((c, idx) => (
              <Line
                key={idx}
                type="monotone"
                data={c.data}
                dataKey="latency"
                stroke={`hsl(${idx * 60}, 70%, 50%)`}
                strokeWidth={1.5}
                dot={false}
                name={c.name}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Comparison Exchange Selector */}
      <div className="border-t border-gray-800 pt-4">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="flex items-center justify-between w-full text-left mb-2"
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="text-gray-400 w-4 h-4" />
            <p className="text-xs md:text-sm text-gray-400 font-medium">
              Compare with other exchanges {comparisonExchanges.length > 0 && `(${comparisonExchanges.length})`}
            </p>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              showComparison ? "rotate-180" : ""
            }`}
          />
        </button>
        
        {showComparison && (
          <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3">
            {allExchanges
              .filter((e) => e.name !== selectedExchange.name)
              .map((exchange) => (
                <button
                  key={exchange.name}
                  onClick={() => toggleComparisonExchange(exchange.name)}
                  disabled={
                    !comparisonExchanges.includes(exchange.name) &&
                    comparisonExchanges.length >= 3
                  }
                  className={`px-2 md:px-3 py-1 text-xs md:text-sm rounded-full border ${
                    comparisonExchanges.includes(exchange.name)
                      ? "bg-green-600/40 border-green-500 text-white"
                      : comparisonExchanges.length >= 3
                      ? "border-gray-700 text-gray-600 cursor-not-allowed"
                      : "border-gray-700 text-gray-400 hover:border-gray-500 hover:text-white"
                  } transition`}
                >
                  {exchange.name}
                </button>
              ))}
          </div>
        )}

        {comparisonExchanges.length >= 3 && showComparison && (
          <p className="text-xs text-amber-400 mt-2">
            Maximum 3 exchanges for comparison
          </p>
        )}
      </div>

      {/* Latency Indicators */}
      <div className="border-t border-gray-800 pt-4 mt-4">
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-2 md:p-3">
            <div className="text-[10px] md:text-xs text-green-400 mb-1">Excellent</div>
            <div className="text-xs md:text-sm text-gray-300">&lt; 50 ms</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-2 md:p-3">
            <div className="text-[10px] md:text-xs text-yellow-400 mb-1">Good</div>
            <div className="text-xs md:text-sm text-gray-300">50-100 ms</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2 md:p-3">
            <div className="text-[10px] md:text-xs text-red-400 mb-1">Poor</div>
            <div className="text-xs md:text-sm text-gray-300">&gt; 100 ms</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalLatency;