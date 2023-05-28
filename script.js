const symbols = ['LMWR-USDT', 'KCS-USDT'];
const tokenPricesContainer = document.getElementById('tokenPrices');

symbols.forEach(async (symbol) => {
  const apiUrl = `https://arcane-shelf-63340.herokuapp.com/api/v1/market/orderbook/level1?symbol=${symbol}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    const price = data.price;

    const tokenElement = document.createElement('div');
    tokenElement.classList.add('token');

    const symbolElement = document.createElement('span');
    symbolElement.classList.add('symbol');
    symbolElement.textContent = symbol;

    const priceElement = document.createElement('span');
    priceElement.classList.add('price');
    priceElement.textContent = price;

    tokenElement.appendChild(symbolElement);
    tokenElement.appendChild(document.createTextNode(': '));
    tokenElement.appendChild(priceElement);

    tokenPricesContainer.appendChild(tokenElement);
  } catch (error) {
    console.error(`Error fetching data for symbol ${symbol}: ${error.message}`);
  }
});
