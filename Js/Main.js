document.getElementsByClassName("cls")[0].addEventListener("click", (e) => {
  e.preventDefault();

  document.getElementById("name").value = null;
  document.getElementById("danaRate").value = null;
  document.getElementById("weight").value = null;
  document.getElementById("shotNo").value = null;
  document.getElementById("pieceNo").value = null;
  document.getElementById("units").value = null;
  document.getElementById("labour").value = null;
});

const form = document.getElementsByClassName("mainForm")[0];
const exchangeRates = {};

fetch('https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/INR')
  .then(response => response.json())
  .then(data => {
    exchangeRates['INR'] = 1;
    Object.keys(data.conversion_rates).forEach(currency => {
      exchangeRates[currency] = data.conversion_rates[currency];
    });
  });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  setTimeout(calculateProfit, 1000);
});

function calculateProfit() {
  const handle = document.getElementById("name").value;
  const danaRate = document.getElementById("danaRate").value;
  const weight = document.getElementById("weight").value;
  const shotNo = document.getElementById("shotNo").value;
  const pieceNo = document.getElementById("pieceNo").value;
  const pieceRate = document.getElementById("pieceRate").value;
  const units = document.getElementById("units").value;
  const unitsCost = document.getElementById("unitsCost").value;
  const labourCharge = document.getElementById("labour").value;
  const extra = document.getElementById("extra").value;
  const outputDiv = document.getElementById("output");
  const calculation = document.getElementById("calculationArea");
  const currency = document.getElementById("currency").value;

  const grossPiecePrice = shotNo * pieceNo * pieceRate;
  const grossDanaPrice = (weight * shotNo * danaRate) / 1000;
  const grossBijliPrice = units * unitsCost;
  const netProfit = grossPiecePrice - grossDanaPrice - grossBijliPrice - labourCharge - extra;
  const convertedProfit = netProfit * exchangeRates[currency];

  if (netProfit >= 0) {
    outputDiv.innerHTML = `Profit of ${convertedProfit.toFixed(2)} ${currency}`;
  } else {
    outputDiv.innerHTML = `Loss of ${Math.abs(convertedProfit.toFixed(2))} ${currency}`;
  }

  calculation.innerHTML = `
  <h2>Calculation👇</h2>
  <h4>${handle}</h4>
  <p>Gross Piece Price = ${shotNo} x ${pieceNo} x ${pieceRate}</p>
  <p>Dana Price = (${weight} x ${shotNo} x ${danaRate}) / 1000</p>
  <p>Electricity Price = ${units} x ${unitsCost}</p>
  <p>Net Profit = Gross Piece Price - Dana Price - Electricity Price - Labour Charge - Extra</p>
  <p>Net Profit = ${grossPiecePrice} - ${grossDanaPrice} - ${grossBijliPrice} - ${labourCharge} - ${extra}</p>
  `;
}

document.getElementById("generatePDF").addEventListener("click", generatePDF);

function generatePDF() {
  const handle = document.getElementById("name").value;
  const danaRate = document.getElementById("danaRate").value;
  const weight = document.getElementById("weight").value;
  const shotNo = document.getElementById("shotNo").value;
  const pieceNo = document.getElementById("pieceNo").value;
  const pieceRate = document.getElementById("pieceRate").value;
  const units = document.getElementById("units").value;
  const unitsCost = document.getElementById("unitsCost").value;
  const labourCharge = document.getElementById("labour").value;
  const extra = document.getElementById("extra").value;
  const grossPiecePrice = shotNo * pieceNo * pieceRate;
  const grossDanaPrice = (weight * shotNo * danaRate) / 1000;
  const grossBijliPrice = units * unitsCost;
  const netProfit = grossPiecePrice - grossDanaPrice - grossBijliPrice - labourCharge - extra;
  const currency = document.getElementById("currency").value;

  const doc = new jsPDF();

  doc.text(`Handle: ${handle}`, 10, 10);
  doc.text(`Weight Of 1 Shot: ${weight} gm`, 10, 20);
  doc.text(`No Of Shots: ${shotNo}`, 10, 30);
  doc.text(`Pieces In 1 Shot: ${pieceNo}`, 10, 40);
  doc.text(`Cost Of 1 Piece: ${pieceRate} ${currency}`, 10, 50);
  doc.text(`Electricity (Units): ${units}`, 10, 60);
  doc.text(`Rate Of Raw Material(Dana): ${danaRate} ${currency}`, 10, 70);
  doc.text(`Extra (Including Maintenance and Bike): ${extra} ${currency}`, 10, 80);
  doc.text(`Cost Of 1 Unit: ${unitsCost} ${currency}`, 10, 90);
  doc.text(`Labour Charge: ${labourCharge} ${currency}`, 10, 100);
  doc.text(`Gross Piece Price: ${grossPiecePrice} ${currency}`, 10, 110);
  doc.text(`Gross Dana Price: ${grossDanaPrice} ${currency}`, 10, 120);
  doc.text(`Gross Electricity Price: ${grossBijliPrice} ${currency}`, 10, 130);
  doc.text(`Net Profit: ${netProfit.toFixed(2)} ${currency}`, 10, 140);

  doc.save(`${handle}_Profit_Calculation.pdf`);
}
