function openHtmlDocument(path) {
      var contentDiv = document.getElementById('overlay');
      //var img = document.getElementById('shopping_image');
      //img.style.visibility = 'hidden';

      // Fetch the content of the HTML document
      fetch(path)
          .then(response => response.text())
          .then(htmlContent => {
              // Inject the retrieved HTML into the content div
              contentDiv.innerHTML = htmlContent;
          })
          .catch(error => {
              console.error('Error fetching HTML document:', error);
              contentDiv.innerHTML = 'Failed to load the HTML document.';
          });
      document.getElementById("overlay").style.display = "block";
  }

  let cart = [];
  let totalAmount = 0;
function printProducts() {

    document.getElementById('csvFileInput').addEventListener('change', handleFileSelect);
}

function handleFileSelect(event) {
    //const file = "../DB/products.csv";
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const contents = e.target.result;
            displayProductList(contents);
        };

        reader.readAsText(file);
    }
}

function displayProductList(contents) {
    const lines = contents.split('\n');
    const productListDiv = document.getElementById('productList');
    productListDiv.innerHTML = '<h3>Product List:</h3>';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            const columns = line.split(',');
            const itemName = columns[0];
            const price = parseFloat(columns[2]).toFixed(2);

            const rowDiv = document.createElement('div');
            rowDiv.className = "productItem";
            rowDiv.innerHTML = `
                ${itemName} - $${price}
                <button onclick="addToCart('${itemName}', ${price})">Add to Cart</button>
                <button onclick="removeFromCart('${itemName}', ${price})">Remove from Cart</button>
            `;

            productListDiv.appendChild(rowDiv);
        }
    }
}

function addToCart(itemName, price) {
    cart.push({ itemName, price });
    updateCart();
}

function removeFromCart(itemName, price) {
    const index = cart.findIndex(item => item.itemName === itemName && item.price === price);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

function updateCart() {
    const cartList = document.getElementById('cartList');
    const totalAmountSpan = document.getElementById('totalAmount');

    // Clear and update the cart list
    cartList.innerHTML = '';
    totalAmount = 0;

    cart.forEach(item => {
        totalAmount += parseFloat(item.price);
        const listItem = document.createElement('li');
        listItem.textContent = `${item.itemName} - $${item.price}`;
        cartList.appendChild(listItem);
    });
    console.log("amount is " + totalAmount)
    // Update the total amount
    totalAmountSpan.textContent = totalAmount.toFixed(2);
}

function submitMessage() {
    var userName = document.getElementById('userName').value;
    var userMessage = document.getElementById('userMessage').value;

    if (userName && userMessage) {
        var messagesList = document.getElementById('messages');

        // Create a new list item for the message
        var messageItem = document.createElement('li');
        messageItem.className = 'message';
        messageItem.innerHTML = '<strong>' + userName + ':</strong> ' + userMessage;

        // Append the message to the messages list
        messagesList.appendChild(messageItem);

        // Clear the input fields
        document.getElementById('userName').value = '';
        document.getElementById('userMessage').value = '';
    } else {
        alert('Please enter both name and message.');
    }
}

function searchCSV() {
    const fileInput = document.getElementById('csvFileInput');
    const keywordInput = document.getElementById('keyword');
    const resultsDiv = document.getElementById('searchResults');
    const filter = document.getElementById('filter').value;
    const priceRange = document.getElementById('price').value.split("-");
    console.log("price is " + priceRange);

    const file = fileInput.files[0];
    const keyword = keywordInput.value.toLowerCase();

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const contents = e.target.result;
            const lines = contents.split('\n');

            // Clear previous results
            resultsDiv.innerHTML = '';

            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].toLowerCase();
                const lineList = line.split(',');
                const name = String(lineList[0]).toLowerCase();
                const category = String(lineList[1]).toLowerCase();
                const price = lineList[2];
                if (line.includes(keyword)) {
                    const resultItem = document.createElement('div');
                    if (filter == "all") {
                        if (priceRange.length == 2) {
                            if (price >= priceRange[0] && price <= priceRange[1]) {
                                resultItem.textContent = lines[i];
                                resultsDiv.appendChild(resultItem);
                            }
                        } else {
                            resultItem.textContent = lines[i];
                            resultsDiv.appendChild(resultItem);
                        }
                    } else {
                        if (filter == "name" && name.includes(keyword)) {
                            if (priceRange.length == 2) {
                                if (price >= priceRange[0] && price <= priceRange[1]) {
                                    resultItem.textContent = lines[i];
                                    resultsDiv.appendChild(resultItem);
                                }
                            } else {
                                resultItem.textContent = lines[i];
                                resultsDiv.appendChild(resultItem);
                            }
                        } else if (filter == "category" && category.includes(keyword)) {
                            if (priceRange.length == 2) {
                                if (price >= priceRange[0] && price <= priceRange[1]) {
                                    resultItem.textContent = lines[i];
                                    resultsDiv.appendChild(resultItem);
                                }
                            } else {
                                resultItem.textContent = lines[i];
                                resultsDiv.appendChild(resultItem);
                            }
                        }
                    }
                }
            }
        };

        reader.readAsText(file);
    }
}