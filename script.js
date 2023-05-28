document.addEventListener('DOMContentLoaded', fetchAndDisplayTokenPrices);

function fetchTokenPrice(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => data.price)
    .catch(error => {
      console.error('Error fetching token price:', error);
      return 'N/A';
    });
}

async function fetchAndDisplayTokenPrices() {
  const symbols = ['LMWR-USDT', 'KCS-USDT'];
  const tokenPricesElement = document.getElementById('tokenPrices');

  for (const symbol of symbols) {
    const url = `/api/v1/market/orderbook/level1?symbol=${symbol}`;
    const price = await fetchTokenPrice(url);
    const symbolPriceElement = document.createElement('p');
    symbolPriceElement.innerText = `Symbol: ${symbol} | Price: ${price}`;
    tokenPricesElement.appendChild(symbolPriceElement);
  }
}
