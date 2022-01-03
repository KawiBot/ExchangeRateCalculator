const currencyEleOne = document.getElementById("currency-one");
const amountEleOne = document.getElementById("amount-one");
const currencyEleTwo = document.getElementById("currency-two");
const amountEleTwo = document.getElementById("amount-two");

const rate = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEleOne.value;
  const currency_two = currencyEleTwo.value;

  fetch(`https://api.exchangerate.host/latest`)
    .then((res) => res.json())
    .then((data) => {
      const rate_two = data.rates[currency_two];
      rate.innerText = `1 ${currency_one} = ${rate_two} ${currencyEleTwo.value}`;

      amountEleTwo.value = (amountEleOne.value * rate_two).toFixed(2);
    });
}

// Event listeners
currencyEleOne.addEventListener("change", calculate);
amountEleOne.addEventListener("input", calculate);
currencyEleTwo.addEventListener("change", calculate);
amountEleTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEleOne.value;

  currencyEleOne.value = currencyEleTwo.value;

  currencyEleTwo.value = temp;
  calculate();
});

calculate();
