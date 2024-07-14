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
