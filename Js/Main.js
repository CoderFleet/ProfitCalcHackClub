// main.js

const form = document.getElementsByClassName("mainForm")[0];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (validateForm()) {
    setTimeout(calculateProfit, 1000);
  }
});

function validateForm() {
  const name = document.getElementById("name").value.trim();
  const danaRate = parseFloat(document.getElementById("danaRate").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const shotNo = parseInt(document.getElementById("shotNo").value);
  const pieceNo = parseInt(document.getElementById("pieceNo").value);
  const pieceRate = parseFloat(document.getElementById("pieceRate").value);
  const units = parseFloat(document.getElementById("units").value);
  const unitsCost = parseFloat(document.getElementById("unitsCost").value);
  const labourCharge = parseFloat(document.getElementById("labour").value);
  const extra = parseFloat(document.getElementById("extra").value);

  if (!name) {
    alert("Please enter Handle Name.");
    return false;
  }
  if (isNaN(danaRate) || danaRate <= 0) {
    alert("Please enter a valid Rate Of Raw Material (Dana).");
    return false;
  }
  if (isNaN(weight) || weight <= 0) {
    alert("Please enter a valid Weight Of 1 Shot (gm).");
    return false;
  }
  if (isNaN(shotNo) || shotNo <= 0) {
    alert("Please enter a valid No Of Shots.");
    return false;
  }
  if (isNaN(pieceNo) || pieceNo <= 0) {
    alert("Please enter a valid Pieces In 1 Shot.");
    return false;
  }
  if (isNaN(pieceRate) || pieceRate <= 0) {
    alert("Please select a valid Cost Of 1 Piece (₹).");
    return false;
  }
  if (isNaN(units) || units <= 0) {
    alert("Please enter a valid Electricity (Units).");
    return false;
  }
  if (isNaN(unitsCost) || unitsCost <= 0) {
    alert("Please select a valid Cost Of 1 Unit (₹).");
    return false;
  }
  if (isNaN(labourCharge) || labourCharge < 0) {
    alert("Please enter a valid Labour Charge (₹).");
    return false;
  }
  if (isNaN(extra) || extra < 0) {
    alert("Please enter a valid Extra (Including Maintenance and Bike) (₹).");
    return false;
  }

  return true;
}

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

  const grossPiecePrice = shotNo * pieceNo * pieceRate;
  const grossDanaPrice = (weight * shotNo * danaRate) / 1000;
  const grossBijliPrice = units * unitsCost;

  const netProfit =
    grossPiecePrice - grossDanaPrice - grossBijliPrice - labourCharge - extra;

  outputDiv.innerHTML = `Profit: ₹ ${netProfit}`;

  calculation.innerHTML = `
    <h2>Calculation Details</h2>
    <h4>${handle}</h4>
    <p>Gross Piece Price: ${shotNo} * ${pieceNo} * ${pieceRate} = ₹ ${grossPiecePrice}</p>
    <p>Dana Price: (${weight} * ${shotNo} * ${danaRate}) / 1000 = ₹ ${grossDanaPrice}</p>
    <p>Electricity Price: ${units} * ${unitsCost} = ₹ ${grossBijliPrice}</p>
    <p>Labour Charge: ₹ ${labourCharge}</p>
    <p>Extra Costs: ₹ ${extra}</p>
    <p>Net Profit: ₹ ${netProfit}</p>
  `;
}
