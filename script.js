document.addEventListener("DOMContentLoaded", async function() {
  // Define the symbols
  var symbols = ['LMWR-USDT', 'KCS-USDT'];

  // Make requests for each symbol
  for (var i = 0; i < symbols.length; i++) {
    await makeRequest(symbols[i]);
  }

  async function makeRequest(symbol) {
    try {
      // Make a request to the API endpoint
      var url = `https://arcane-shelf-63340.herokuapp.com/api/v1/market/orderbook/level1?symbol=${symbol}`;
      var response = await fetch(url);

      if (response.ok) {
        var data = await response.json();
        var price = data.price;

        // Create a div element to display the coin price
        var coinDiv = document.createElement('div');
        coinDiv.textContent = `${symbol}: ${price}`;
        coinDiv.classList.add("coinPrice");

        // Append the div to the coinPrices element
        var coinPricesDiv = document.getElementById('coinPrices');
        if (coinPricesDiv) {
          coinPricesDiv.appendChild(coinDiv);
        } else {
          console.error('coinPrices element not found');
        }
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  }
});
