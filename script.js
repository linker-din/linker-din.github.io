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
    const tokenList = [
      { symbol: 'LMWR-USDT', url: 'https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=LMWR-USDT' },
      { symbol: 'KCS-USDT', url: 'https://api.kucoin.com/api/v1/market/orderbook/level1?symbol=KCS-USDT' }
      // Add more tokens here as needed
    ];
  
    const tokenPriceElement = document.getElementById('tokenPrice');
    tokenPriceElement.innerHTML = ''; // Clear previous token prices
  
    // Fetch and display token prices sequentially
    function fetchSequentially(index) {
      if (index >= tokenList.length) {
        return; // Exit when all tokens have been fetched
      }
  
      const { symbol, url } = tokenList[index];
      fetchTokenPrice(url)
        .then(price => {
          displayTokenPrice(symbol, price);
          fetchSequentially(index + 1); // Fetch next token
        });
    }
  
    fetchSequentially(0); // Start fetching from the first token
  }
  
  // Fetch and display token prices when the page loads
  window.addEventListener('load', fetchAndDisplayTokenPrices);
  
