/*const tableRef = document.getElementById("tableID");
const rowsCollection = tableRef.rows;
const tableWrapper = document.querySelector(".table-wrapper");
const deleteRowButton = document.querySelector(".remove-row");
const deleteColButton = document.querySelector(".remove-col");
const addRowButton = document.querySelector(".add-row");
const addColButton = document.querySelector(".add-col");
let removeCellId;
let removeRowId;

const hiddenRemoveButton = () => {
  deleteRowButton.style.display = "none";
  deleteColButton.style.display = "none";
};
const handleRowAppend = () => {
  const newRow = tableRef.insertRow(-1);
  newRow.classList.add("row");
  newRow.innerHTML = rowsCollection[0].innerHTML;
};
const handleColAppend = () => {
  for (let rowRef of rowsCollection) {
    const newCell = rowRef.insertCell(-1);
    newCell.classList.add("cell");
  }
};
const handleRowRemove = () => {
  hiddenRemoveButton();
  tableRef.deleteRow(removeRowId);
};
const handleColRemove = () => {
  hiddenRemoveButton();
  for (let rowRef of rowsCollection) {
    rowRef.deleteCell(removeCellId);
  }
};
const onMouseoverTable = (e) => {
  deleteRowButton.style.display = rowsCollection.length <= 1 ? "none" : "block";
  deleteColButton.style.display =
    rowsCollection[0].childElementCount <= 1 ? "none" : "block";
  const { target } = e;

  if (target.className === "cell") {
    removeCellId = target.cellIndex;
    deleteColButton.style.left = `${target.offsetLeft}px`;
    removeRowId = target.parentNode.rowIndex;
    deleteRowButton.style.top = `${target.offsetTop}px`;
  }
};

tableWrapper.addEventListener("mouseover", onMouseoverTable);
tableWrapper.addEventListener("mouseout", hiddenRemoveButton);
addRowButton.addEventListener("click", handleRowAppend);
addColButton.addEventListener("click", handleColAppend);
deleteRowButton.addEventListener("click", handleRowRemove);
deleteColButton.addEventListener("click", handleColRemove);*/

class Table {
  constructor(selector, sizeRows, sizeColumns) {
    this.initTableElements(selector, sizeRows, sizeColumns);
  }

  initTableElements = (selector, sizeRows, sizeColumns) => {
    this.selector = selector;
    this.sizeRows = sizeRows;
    this.sizeColumns = sizeColumns;

    const buttons = [
      {
        buttonName: "addRowButton",
        className: "add-row",
        textContent: "+",
      },
      {
        buttonName: "addColButton",
        className: "add-col",
        textContent: "+",
      },
      {
        buttonName: "deleteRowButton",
        className: "remove-row",
        textContent: "-",
      },
      {
        buttonName: "deleteColButton",
        className: "remove-col",
        textContent: "-",
      },
    ];

    this.tableWrapper = document.createElement("div");
    this.table = document.createElement("table");

    this.tableWrapper.classList.add("table-wrapper");
    this.table.classList.add("table");
    this.table.id = this.selector;

    document.body.append(this.tableWrapper);
    this.tableWrapper.append(this.table);

    this.createButtons(buttons);
    this.createTableElements(this.sizeRows, this.sizeColumns);
  };

  initEventListeners = () => {};

  createButtons = (buttons) => {
    buttons.forEach((button) => {
      const { buttonName, className, textContent } = button;

      this[buttonName] = document.createElement("button");
      this[buttonName].classList.add(className, "button");
      this[buttonName].textContent = textContent;
      this.tableWrapper.append(this[buttonName]);
    });
  };

  createTableElements = (sizeRows, sizeColumns) => {
    for (let i = 0; i < sizeRows; i++) {
      const newRow = this.table.insertRow(-1);
      newRow.classList.add("row");
      for (let k = 0; k < sizeColumns; k++) {
        const newCell = newRow.insertCell(-1);
        newCell.classList.add("cell");
      }
    }
  };
}

const newTable = new Table("new-table", 4, 4);