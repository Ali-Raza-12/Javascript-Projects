const convertCurrency = async () => {
  const from = document.getElementById("fromCurrency").value;
  const to = document.getElementById("toCurrency").value;
  const amount = document.getElementById("amount").value;
  const spinner = document.getElementById('spiner')
  const convertButton = document.getElementById('convertButton')

  if (!from || !to || !amount) {
    alert("Please select both currencies and enter an amount.");
    return;
  }

  const resultBox = document.getElementById("result");
  spinner.style.display = 'inline-block';
  convertButton.disabled = true;

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/convertcurrency?have=${from}&want=${to}&amount=${amount}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "VQcTeXSbsOnKg6blgXw7Sg==XzpP3E1vf30DMVCV",
        },
      }
    );

    const data = await response.json();

    if (data.error) {
      resultBox.textContent = "Error: " + data.error;
    } else {
      resultBox.textContent = `${amount} ${from} = ${data.new_amount} ${to}`;
    }
  } catch (error) {
    console.log("Error during currency conversion:", error);
    resultBox.textContent = "Error fetching conversion rate.";
  } finally {
    spinner.style.display = 'none';
    convertButton.disabled = false;
  }
};
