class Table {
  constructor(selector, sizeRows, sizeColumns) {
    this.initTableElements(selector, sizeRows, sizeColumns);
    this.initEventListeners();
  }

  initTableElements = (selector, sizeRows, sizeColumns) => {
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

    this.createTable(selector);
    this.createButtons(buttons);
    this.createTableElements(sizeRows, sizeColumns);
  };

  initEventListeners = () => {
    this.tableWrapper.addEventListener("mouseover", this.onMouseoverTable);
    this.tableWrapper.addEventListener("mouseout", this.hiddenRemoveButton);
    this.addRowButton.addEventListener("click", this.handleRowAppend);
    this.addColButton.addEventListener("click", this.handleColAppend);
    this.deleteRowButton.addEventListener("click", this.handleRowRemove);
    this.deleteColButton.addEventListener("click", this.handleColRemove);
    this.deleteListenersButton.addEventListener('click', this.handleEventListenersRemove);
  };

  createButtons = (buttons) => {
    buttons.forEach((button) => {
      const { buttonName, className, textContent } = button;

      this[buttonName] = document.createElement("button");
      this[buttonName].classList.add("button", className);
      this[buttonName].textContent = textContent;
      this.tableWrapper.append(this[buttonName]);
    });
  };

  createTable = (selector) => {
    this.tableWrapper = document.createElement("div");
    this.table = document.createElement("table");
    this.tableWrapper.classList.add("table-wrapper");
    this.table.classList.add("table");
    this.table.id = selector;
    this.rowsCollection = this.table.rows;
    document.body.append(this.tableWrapper);
    this.tableWrapper.append(this.table);
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

  hiddenRemoveButton = () => {
    this.deleteRowButton.style.display = "none";
    this.deleteColButton.style.display = "none";
  };

  handleRowAppend = () => {
    const newRow = this.table.insertRow(-1);
    newRow.classList.add("row");
    newRow.innerHTML = this.rowsCollection[0].innerHTML;
  };

  handleColAppend = () => {
    for (let rowRef of this.rowsCollection) {
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
    for (let rowRef of this.rowsCollection) {
      rowRef.deleteCell(this.removeCellId);
    }
  };

  onMouseoverTable = (e) => {
    this.deleteRowButton.style.display =
      this.rowsCollection.length <= 1 ? "none" : "block";
    this.deleteColButton.style.display =
      this.rowsCollection[0].childElementCount <= 1 ? "none" : "block";
    const { target } = e;

    if (target.className === "cell") {
      this.removeCellId = target.cellIndex;
      this.deleteColButton.style.left = `${target.offsetLeft}px`;
      this.removeRowId = target.parentNode.rowIndex;
      this.deleteRowButton.style.top = `${target.offsetTop}px`;
    }
  };

  handleEventListenersRemove = () => {
    const oldTable = this.tableWrapper;
    const newTable = oldTable.cloneNode(true);
    oldTable.parentNode.replaceChild(newTable, oldTable);
    this.tableWrapper = newTable;
  };
}

const firstTable = new Table("firstTable", 4, 4);
const secondTable = new Table("secondTable", 5, 5);
