const table = document.querySelector(".table");
const deleteRowButton = document.querySelector(".remove-row");
const deleteColButton = document.querySelector(".remove-col");
const addRowButton = document.querySelector(".add-row");
const addColButton = document.querySelector(".add-col");
const cellWidth = document.querySelector(".cell").offsetWidth;
const cellHeight = document.querySelector(".cell").offsetHeight;
let removeColId;
let removeRowId;

const hiddenRemoveButton = () => {
  deleteRowButton.style.display = "none";
  deleteColButton.style.display = "none";
};
const handleRowAppend = () => {
  const rows = document.querySelectorAll(".row");
  const newRow = rows[0].cloneNode(true);
  table.appendChild(newRow);
};
const handleColAppend = () => {
  const rows = document.querySelectorAll(".row");
  const cell = document.querySelector(".cell");
  rows.forEach((item) => {
    item.append(cell.cloneNode(true));
  });
};
const handleRowRemove = () => {
  const rows = document.querySelectorAll(".row");
  deleteRowButton.style.display = "none";
  rows[removeRowId].remove();
};
const handleColRemove = () => {
  const rowsCollection = document.querySelectorAll(".row");
  hiddenRemoveButton();
  rowsCollection.forEach((i, index) => {
    const rowItem = rowsCollection[index];
    const removeCellItem = rowItem.querySelectorAll(".cell")[removeColId];
    removeCellItem.remove();
  });
};
const onMouseoverTable = (e) => {
  const rows = document.querySelectorAll(".row");
  const cellsRow = document.querySelector(".row").querySelectorAll(".cell");

  deleteRowButton.style.display = rows.length <= 1 ? "none" : "block";
  deleteColButton.style.display = cellsRow.length <= 1 ? "none" : "block";

  if (e.target.className === "cell") {
    const cellsArray = [...e.target.parentElement.children];
    const indexCell = cellsArray.indexOf(e.target);
    deleteColButton.style.left = `${indexCell * cellWidth}px`;
    removeColId = indexCell;

    const rowsArray = [...e.target.parentElement.parentElement.children].filter(
      (item) => item.className === "row"
    );
    const indexRow = rowsArray.indexOf(e.target.parentElement);
    deleteRowButton.style.top = `${indexRow * cellHeight}px`;
    removeRowId = indexRow;
  }
};

table.addEventListener("mouseover", onMouseoverTable);
table.addEventListener("mouseout", hiddenRemoveButton);
addRowButton.addEventListener("click", handleRowAppend);
addColButton.addEventListener("click", handleColAppend);
deleteRowButton.addEventListener("click", handleRowRemove);
deleteColButton.addEventListener("click", handleColRemove);
