const table = document.querySelector(".table");
const removeRow = document.querySelector(".remove-row");
const removeCol = document.querySelector(".remove-col");
const addRow = document.querySelector(".add-row");
const addCol = document.querySelector(".add-col");

table.addEventListener("mouseover", () => {
  removeRow.style.display = "block";
  removeCol.style.display = "block";
});

table.addEventListener("mouseout", () => {
  removeRow.style.display = "none";
  removeCol.style.display = "none";
});

addRow.addEventListener("click", () => {
  const rows = document.querySelectorAll(".row");
  const newRow = rows[0].cloneNode(true);
  table.appendChild(newRow);
});

addCol.addEventListener("click", () => {
  const rows = document.querySelectorAll(".row");
  const cell = document.querySelector(".cell");
  rows.forEach((item) => {
    item.append(cell.cloneNode(true));
  });
});

removeCol.addEventListener("click", (e) => {
  console.log(e);
});

removeRow.addEventListener("click", (e) => {
  console.log(e);
});
