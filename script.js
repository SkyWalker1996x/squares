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
  {
    buttonName: "deleteListenersButton",
    className: "remove-listeners",
    textContent: "RL",
  },
];

class Table {
  constructor(tableConfig) {
    const { selector, ...tableSize } = tableConfig;

    this.parent = document.getElementById(selector);
    this.table = document.createElement("table");
    this.rows = this.table.rows;
    this.addRowButton = null;
    this.addColButton = null;
    this.deleteRowButton = null;
    this.deleteColButton = null;
    this.deleteListenersButton = null;
    this.removeRowId = -1;
    this.removeCellId = -1;

    this.initTableElements(tableSize);
    this.initEventListeners();
  }

  initTableElements = (tableSize) => {
    this.createTableLayout();
    this.createButtons();
    this.createTableElements(tableSize);
  };

  initEventListeners = () => {
    this.parent.addEventListener("mouseover", this.onMouseoverTable);
    this.parent.addEventListener("mouseout", this.hiddenRemoveButton);
    this.addRowButton.addEventListener("click", this.handleRowAppend);
    this.addColButton.addEventListener("click", this.handleColAppend);
    this.deleteRowButton.addEventListener("click", this.handleRowRemove);
    this.deleteColButton.addEventListener("click", this.handleColRemove);
    this.deleteListenersButton.addEventListener(
      "click",
      this.handleEventListenersRemove
    );
  };

  createButtons = () => {
    buttons.forEach((button) => {
      const { buttonName, className, textContent } = button;

      this[buttonName] = document.createElement("button");
      this[buttonName].classList.add("button", className);
      this[buttonName].textContent = textContent;
      this.parent.append(this[buttonName]);
    });
  };

  createTableLayout = () => {
    this.table.classList.add("table");
    this.parent.classList.add("table-wrapper");
    this.parent.append(this.table);
  };

  createTableElements = (tableSize) => {
    const { rowsNumber, columnsNumber } = tableSize;

    for (let i = 0; i < rowsNumber; i++) {
      const newRow = this.table.insertRow(-1);
      newRow.classList.add("row");
      for (let k = 0; k < columnsNumber; k++) {
        const newCell = newRow.insertCell(-1);
        newCell.classList.add("cell");
      }
    }
  };

  hiddenRemoveButton = () => {
    this.deleteRowButton.style.display = "none";
    this.deleteColButton.style.display = "none";
  };

  handleRowAppend = () => {
    const newRow = this.table.insertRow(-1);
    newRow.classList.add("row");
    newRow.innerHTML = this.rows[0].innerHTML;
  };

  handleColAppend = () => {
    for (let rowRef of this.rows) {
      const newCell = rowRef.insertCell(-1);
      newCell.classList.add("cell");
    }
  };

  handleRowRemove = () => {
    this.hiddenRemoveButton();
    this.table.deleteRow(this.removeRowId);
  };

  handleColRemove = () => {
    this.hiddenRemoveButton();
    for (let rowRef of this.rows) {
      rowRef.deleteCell(this.removeCellId);
    }
  };

  onMouseoverTable = (e) => {
    this.deleteRowButton.style.display =
      this.rows.length <= 1 ? "none" : "block";
    this.deleteColButton.style.display =
      this.rows[0].childElementCount <= 1 ? "none" : "block";
    const { target } = e;

    if (target.className === "cell") {
      this.removeCellId = target.cellIndex;
      this.deleteColButton.style.left = `${target.offsetLeft}px`;
      this.removeRowId = target.parentNode.rowIndex;
      this.deleteRowButton.style.top = `${target.offsetTop}px`;
    }
  };

  handleEventListenersRemove = () => {
    const oldTable = this.parent;
    const newTable = oldTable.cloneNode(true);
    oldTable.parentNode.replaceChild(newTable, oldTable);
    this.parent = newTable;
  };
}

const tableConfig = {
  selector: "table",
  rowsNumber: 7,
  columnsNumber: 7,
};

const firstTable = new Table(tableConfig);
