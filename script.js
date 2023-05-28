document.addEventListener("DOMContentLoaded", function() {
    // Define the symbols
    var symbols = ['LMWR-USDT', 'KCS-USDT', 'ETH-USDT', 'BTC-USDT'];

    // Store the coin prices
    var coinPrices = {};

    // Make requests initially and every 3 seconds
    setInterval(function() {
        makeRequests();
        displayRefreshMessage();
    }, 3000);

    function makeRequests() {
        // Generate a random number to use as a cache-busting parameter
        var cacheBuster = Math.random();

        symbols.forEach(function(symbol, index) {
            // Make a request to the API endpoint
            var request = new XMLHttpRequest();
            var url = "https://arcane-shelf-63340.herokuapp.com/api/v1/market/orderbook/level1";
            var params = { "symbol": symbol, "cacheBuster": cacheBuster };
            var paramString = Object.keys(params).map(function(key) {
                return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
            }).join("&");

            request.open('GET', url + "?" + paramString, true);

            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    // Parse the JSON response
                    var response = JSON.parse(request.responseText);
                    var price = response.price;

                    // Store the price in the coinPrices object
                    coinPrices[symbol] = price;

                    // Update the coin prices display
                    updateCoinPrices();
                } else {
                    console.error('Error: ' + request.status);
                }
            };

            request.onerror = function() {
                console.error('Request failed');
            };

            request.send();
        });
    }

    function updateCoinPrices() {
        var coinPricesDiv = document.getElementById('coinPrices');
        if (coinPricesDiv) {
            // Clear previous coin prices
            coinPricesDiv.innerHTML = '';

            // Iterate over the symbols and update the coin prices
            symbols.forEach(function(symbol) {
                var price = coinPrices[symbol];

                // Create a div element to display the coin price
                var coinDiv = document.createElement('div');
                coinDiv.textContent = symbol + ": " + price;
                coinDiv.classList.add("coinPrice");

                coinPricesDiv.appendChild(coinDiv);
            });
        } else {
            console.error('coinPrices element not found');
        }
    }

    function displayRefreshMessage() {
        var refreshMessageDiv = document.getElementById('refreshMessage');
        if (refreshMessageDiv) {
            refreshMessageDiv.textContent = 'Token information refreshed.';
        } else {
            console.error('refreshMessage element not found');
        }
    }
});
