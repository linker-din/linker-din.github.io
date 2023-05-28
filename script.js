// API request function
function fetchTokenPrice(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data && data.data && data.data.price) {
        return data.data.price;
      } else {
        throw new Error('Invalid response data');
      }
    })
    .catch(error => {
      console.log('Error:', error);
      return 'N/A';
    });
}

// Display token price
function displayTokenPrice(symbol, price) {
  const tokenPriceElement = document.getElementById('tokenPrice');
  const tokenItem = document.createElement('li');
  tokenItem.textContent = `Symbol: ${symbol} | Price: ${price}`;
  tokenPriceElement.appendChild(tokenItem);
}

// Fetch token prices and display them
function fetchAndDisplayTokenPrices() {
  const urls = [
    '/api/v1/market/orderbook/level1?symbol=LMWR-USDT',
    '/api/v1/market/orderbook/level1?symbol=KCS-USDT'
  ];

  urls.forEach(url => {
    fetchTokenPrice(url)
      .then(price => {
        const symbol = url.split('=')[1].toUpperCase();
        displayTokenPrice(symbol, price);
      });
  });
}

// Fetch and display token prices when the page loads
window.addEventListener('load', fetchAndDisplayTokenPrices);
