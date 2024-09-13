const searchButton = document.getElementById("searchButton");
const gifContainer = document.getElementById("gifContainer");
let isSearchActive = true; // To track whether the button should be in "Search" or "Clear" mode

searchButton.addEventListener("click", () => {
  if (isSearchActive) {
    // If it's in "Search" mode
    const searchQuery = document.getElementById("searchInput").value;
    if (searchQuery.trim() === "") {
      alert("Please enter a search term");
      return; // Exit if input is empty
    }

    const apiKey = "dmPUZGuKrZyDWGwHFjlkh0Kjt5qA1zGX"; // Replace with your Giphy API key
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&limit=10`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        gifContainer.innerHTML = ""; // Clear previous GIFs
        data.data.forEach((gif) => {
          const colDiv = document.createElement("div");
          colDiv.classList.add("col-md-3");
          colDiv.classList.add("my-2");

          const img = document.createElement("img");
          img.src = gif.images.fixed_height.url;
          img.classList.add("w-100");
          img.style.height = "200px";
          colDiv.appendChild(img);

          gifContainer.appendChild(colDiv);
        });

        // Update the button to "Clear" and change its color to yellow
        searchButton.textContent = "Clear";
        searchButton.classList.remove("btn-primary"); // Remove the primary color class
        searchButton.classList.add("btn-warning"); // Add the warning class for yellow button
        isSearchActive = false;
      })
      .catch((error) => console.error("Error fetching GIFs:", error));
  } else {
    // If it's in "Clear" mode
    gifContainer.innerHTML = ""; // Clear GIFs
    document.getElementById("searchInput").value = ""; // Clear the input field

    // Revert the button text to "Search" and change its color back to blue
    searchButton.textContent = "Search";
    searchButton.classList.remove("btn-warning"); // Remove the warning (yellow) class
    searchButton.classList.add("btn-primary"); // Add the primary class for blue button
    isSearchActive = true;
  }
});
