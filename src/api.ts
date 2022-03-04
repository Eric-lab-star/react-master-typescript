const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoin() {
  return fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchTickerInfo(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchPriceHistoryInfo(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const oneWeek = 60 * 60 * 24 * 7;
  const startDate = endDate - oneWeek * 2;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
