export const CoinListAPI = () => 
"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false&price_change_percentage=24h"

export const CoinAPI = (id) => 
`https://api.coingecko.com/api/v3/coins/${id}`

export const CoinChartAPI = (id) => 
`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365&interval=hourly`
