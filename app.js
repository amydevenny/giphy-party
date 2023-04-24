// define HTML elements
const $gifArea = $("#gif-area");
const $searchInput = $("#search");

// function to handle get request and append gif to page
function addGif(result) {
  // define the number of results returned from the API
  let numResults = result.data.length;
  // if results exist
  if (numResults) {
    // randomize the results
    let randomIdx = Math.floor(Math.random() * numResults);
    // create a new div with bootstrap classes
    let $newCol = $("<div>", { class: "col-md-4 col-12 mb-4" });
    // create the img tag with the src as a random index of the result data
    let $newGif = $("<img>", {
      src: result.data[randomIdx].images.original.url,
      // make the result 100px wide
      class: "w-100"
    });
    // append the gif to the column
    $newCol.append($newGif);
    // append the column to the page
    $gifArea.append($newCol);
  }
}

// event handler for search button
$("form").on("submit", async function(e) {
  // don't refresh the page
  e.preventDefault();
  // define the search term from the value of the text input 
  let searchTerm = $searchInput.val();
  // empty the text input
  $searchInput.val("");

  // define the get request to giphy's api
  const response = await axios.get("http://api.giphy.com/v1/gifs/search", {
    // set the params as the user input and authenticate with api key
    params: {
      q: searchTerm,
      api_key: "IAoqBgbotr2rgAzPPhZW0WXIYMpwz4V0"
    }
  });
  // call the function to add the gif with our api search data as the argument
  addGif(response.data);
});

// event handler on remove images button to remove all gifs from page
$("#remove").on("click", function() {
  $gifArea.empty();
});