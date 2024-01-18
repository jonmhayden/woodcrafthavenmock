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