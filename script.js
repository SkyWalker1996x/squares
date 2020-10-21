const rows = document.querySelectorAll('.row');
const table = document.querySelector('.table');
const removeRow = document.querySelector('.remove-row')
const removeCol = document.querySelector('.remove-col')

rows.forEach((item) => {
    console.log(item.children)
});

table.addEventListener('mouseover', (e) => {
    removeRow.style.display = 'block';
    removeCol.style.display = 'block';
    console.log(e);
})

table.addEventListener('mouseout', () => {
    removeRow.style.display = 'none';
    removeCol.style.display = 'none';
})

