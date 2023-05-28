document.addEventListener("DOMContentLoaded", function() {
    // Define the symbols
    var symbols = ['LMWR-USDT', 'KCS-USDT'];

    // Make requests for each symbol
    symbols.forEach(function(symbol) {
        makeRequest(symbol);
    });

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
                coinDiv.innerHTML = symbol + ": " + price;

                // Append the div to the coinPrices element
                var coinPricesDiv = document.getElementById('coinPrices');
                coinPricesDiv.appendChild(coinDiv);
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
