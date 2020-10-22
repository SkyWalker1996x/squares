const table = document.querySelector(".table");
const removeRow = document.querySelector(".remove-row");
const removeCol = document.querySelector(".remove-col");
const addRow = document.querySelector(".add-row");
const addCol = document.querySelector(".add-col");
let removeColId = 1;
let removeRowId = 1;

table.addEventListener("mouseover", () => {
  const rows = document.querySelectorAll(".row");
  const cellsRow = document.querySelector(".row").querySelectorAll(".cell");
  removeRow.style.display = rows.length <= 1 ? "none" : "block";
  removeCol.style.display = cellsRow.length <= 1 ? "none" : "block";
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

removeCol.addEventListener("click", () => {
  const rows = document.querySelectorAll(".row");
  removeCol.style.display = "none";
  rows.forEach((i, index) => {
    document
      .querySelectorAll(".row")
      [index].querySelectorAll(".cell")
      [removeColId].remove();
  });
});

removeRow.addEventListener("click", () => {
  const rows = document.querySelectorAll(".row");
  removeRow.style.display = "none";
  rows[removeRowId].remove();
});
