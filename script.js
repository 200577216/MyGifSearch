const searchButton = document.getElementById("searchButton");
const gifContainer = document.getElementById("gifContainer");
let isSearchActive = true;

searchButton.addEventListener("click", () => {
  if (isSearchActive) {
    const searchQuery = document.getElementById("searchInput").value;
    if (searchQuery.trim() === "") {
      alert("Your search is empty!!!");
      return;
    }

    const apiKey = "dmPUZGuKrZyDWGwHFjlkh0Kjt5qA1zGX";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchQuery}&limit=10`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        gifContainer.innerHTML = "";
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
        searchButton.classList.remove("btn-primary");
        searchButton.classList.add("btn-warning");
        isSearchActive = false;
      })
      .catch((error) => console.error("Error fetching GIFs:", error));
  } else {
    gifContainer.innerHTML = ""; // Clear GIFs
    document.getElementById("searchInput").value = "";
    searchButton.textContent = "Search";
    searchButton.classList.remove("btn-warning");
    searchButton.classList.add("btn-primary");
    isSearchActive = true;
  }
});
