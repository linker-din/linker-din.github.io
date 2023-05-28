document.addEventListener("DOMContentLoaded", function() {
    // Define the symbols
    var symbols = ['LMWR-USDT', 'KCS-USDT'];

    // Make requests initially and every 10 seconds
    setInterval(function() {
        symbols.forEach(function(symbol) {
            makeRequest(symbol);
        });
    }, 5000);

    function makeRequest(symbol) {
        // Make a request to the API endpoint
        var request = new XMLHttpRequest();
        var url = "https://arcane-shelf-63340.herokuapp.com/api/v1/market/orderbook/level1";
        var params = { "symbol": symbol };
        var paramString = Object.keys(params).map(function(key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
        }).join("&");

        request.open('GET', url + "?" + paramString, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Parse the JSON response
                var response = JSON.parse(request.responseText);
                var price = response.price;

                // Create a div element to display the coin price
                var coinDiv = document.createElement('div');
                coinDiv.textContent = symbol + ": " + price;
                coinDiv.classList.add("coinPrice");

                // Append the div to the coinPrices element
                var coinPricesDiv = document.getElementById('coinPrices');
                if (coinPricesDiv) {
                    // Clear previous coin prices
                    coinPricesDiv.innerHTML = '';
                    coinPricesDiv.appendChild(coinDiv);
                } else {
                    console.error('coinPrices element not found');
                }
            } else {
                console.error('Error: ' + request.status);
            }
        };

        request.onerror = function() {
            console.error('Request failed');
        };

        request.send();
    }
});
