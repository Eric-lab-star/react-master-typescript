import { useQuery } from "react-query";
import { fetchTickerInfo } from "../api";
import styled from "styled-components";

interface PriceProps {
  coinId: string;
}

interface IUSD {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: string;
  percent_from_price_ath: number;
}
interface IData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: { USD: IUSD };
}

const PriceInfoList = styled.li`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  margin: 10px 0px;
  padding: 7px 10px;
  border-radius: 10px;
  font-size: 13px;

  & :last-child {
    font-size: 15px;
    color: ${(props) => props.theme.accentColor};
    text-align: center;
  }
`;

const Price = ({ coinId }: PriceProps) => {
  const { isLoading, data } = useQuery<IData>(["priceList", coinId], () =>
    fetchTickerInfo(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading Data..."
      ) : (
        <ul>
          <PriceInfoList>
            <div>Price</div>
            <div>{`$ ${data?.quotes.USD.price.toFixed(2)}`}</div>
          </PriceInfoList>
          <PriceInfoList>
            <div>All Time High Price</div>
            <div>{`$ ${data?.quotes.USD.ath_price.toFixed(2)}`}</div>
          </PriceInfoList>
          <PriceInfoList>
            <div>Percent From Highest Price</div>
            <div>{`${data?.quotes.USD.percent_from_price_ath} %`}</div>
          </PriceInfoList>
        </ul>
      )}
    </div>
  );
};

export default Price;
