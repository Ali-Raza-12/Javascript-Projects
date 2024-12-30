const quote = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
// const newQuote = document.getElementById("fetchQuote");

// newQuote.addEventListener("click", createQuote);

function createQuote() {
  const APIKEY = "VQcTeXSbsOnKg6blgXw7Sg==XzpP3E1vf30DMVCV";
  const APIURL = "https://api.api-ninjas.com/v1/quotes";

  fetch(APIURL, {
    headers: {
      "X-Api-Key": APIKEY,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      quote.innerHTML = `'${data[0].quote}'`;
      quoteAuthor.innerHTML = `- ${data[0].author}`;
    })
    .catch((error) => console.log("Error in fectching data:", error));
}
