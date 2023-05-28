const symbols = ['LMWR-USDT', 'KCS-USDT'];

symbols.forEach(async (symbol) => {
  const apiUrl = `https://git.heroku.com/arcane-shelf-63340.git/api/v1/market/orderbook/level1?symbol=${symbol}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    const data = await response.json();
    const price = data.price;
    console.log(`Symbol: ${symbol}, Price: ${price}`);
  } catch (error) {
    console.error(`Error fetching data for symbol ${symbol}: ${error.message}`);
  }
});

