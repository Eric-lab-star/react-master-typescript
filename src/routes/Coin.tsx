import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  useLocation,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchTickerInfo } from "../api";
import { Helmet } from "react-helmet";

const Title = styled.h1`
  font-size: 30px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 20px;
  max-width: 300px;
  margin: 0 auto;
`;

const Header = styled.div`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackBtn = styled.div`
  font-size: 13px;
  margin: 5px;
`;

const Overview = styled.div`
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  border-radius: 10px;
  display: flex;
  justify-content: center;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 10px;
  font-size: 13px;
  & :last-child {
    font-size: 15px;
    color: ${(props) => props.theme.accentColor};
  }
`;

const Description = styled.div`
  font-size: 13px;
  padding: 10px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 10px 0px;
`;
const Tab = styled.div<{ isActive: boolean }>`
  width: 100%;
  background-color: ${(props) => props.theme.textColor};
  text-align: center;
  border-radius: 8px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.bgColor};
  font-size: 13px;
  a {
    padding: 5px;
    display: block;
  }
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  state: string;
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links_extended: object;
  first_data_at: string;
  last_data_at: string;
}
interface IUSD {
  ath_date: string;
  ath_price: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_1h: number;
  percent_change_1y: number;
  percent_change_6h: number;
  percent_change_7d: number;
  percent_change_12h: number;
  percent_change_15m: number;
  percent_change_24h: number;
  percent_change_30d: number;
  percent_change_30m: number;
  percent_from_price_ath: number;
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
}

interface InfoPrice {
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
  quotes: {
    USD: IUSD;
  };
}

interface ICoinProps {
  isDark: boolean;
}

const Coin = ({ isDark }: ICoinProps) => {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  const priceMatch = useRouteMatch(`/:conId/price`);
  const chartMatch = useRouteMatch(`/:conId/chart`);

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickerData } = useQuery<InfoPrice>(
    ["tickers", coinId],
    () => fetchTickerInfo(coinId),
    {
      refetchInterval: 5000,
    }
  );
  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>Coin: {infoData ? infoData.name : ""}</title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Link to="/">
            <BackBtn>&larr; Go Back</BackBtn>
          </Link>
          <Overview>
            <OverviewItem>
              <div>RANK: </div>
              <div>{infoData?.rank}</div>
            </OverviewItem>
            <OverviewItem>
              <div>SYMBOL:</div>
              <div>{infoData?.symbol}</div>
            </OverviewItem>
            <OverviewItem>
              <div>PRICE:</div>
              <div>{tickerData?.quotes.USD.price.toFixed(2)}</div>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <div>TOTAL SUPPLY: </div>
              <div>{tickerData?.total_supply}</div>
            </OverviewItem>

            <OverviewItem>
              <div>MAX SUPPLY</div>
              <div>{tickerData?.max_supply}</div>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price coinId={coinId} />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart isDark={isDark} coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
};

export default Coin;
