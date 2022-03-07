import { useQuery } from "react-query";
import { fetchPriceHistoryInfo } from "../api";
import ApexCharts from "react-apexcharts";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

interface ChartProps {
  coinId: string;
}

interface IHitory {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = ({ coinId }: ChartProps) => {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHitory[]>(
    ["Price_History", coinId],
    () => fetchPriceHistoryInfo(coinId),
    {
      refetchInterval: 5000,
    }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data: data?.map(({ time_open, open, high, low, close }) => ({
                x: time_open.slice(0, 10),
                y: [
                  open.toFixed(2),
                  high.toFixed(2),
                  low.toFixed(2),
                  close.toFixed(2),
                ],
              })),
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              type: "candlestick",
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
