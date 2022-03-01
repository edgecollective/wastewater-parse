
fetch('waste.csv')
  .then(response => response.text())
  .then(text => console.log(text))