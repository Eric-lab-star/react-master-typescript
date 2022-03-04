import { useQuery } from "react-query";
import { fetchPriceHistoryInfo } from "../api";

interface ChartProps {
  coinId: string;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery(["Price_History", coinId], () =>
    fetchPriceHistoryInfo(coinId)
  );
  console.log(data);

  return <h1>Chart</h1>;
};

export default Chart;
