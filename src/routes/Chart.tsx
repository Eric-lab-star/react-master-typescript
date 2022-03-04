import { useQuery } from "react-query";
import { fetchPriceHistoryInfo } from "../api";
import ApexCharts from "react-apexcharts";

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
  const { isLoading, data } = useQuery<IHitory[]>(
    ["Price_History", coinId],
    () => fetchPriceHistoryInfo(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "Price",
              data: data?.map((i) => i.close),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
            },
            stroke: {
              curve: "smooth",
              width: 3,
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
