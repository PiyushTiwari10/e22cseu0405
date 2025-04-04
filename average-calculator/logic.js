let windowSize = 10;
let numberWindow = [];

function updateWindow(newNumbers) {
  for (const num of newNumbers) {
    if (!numberWindow.includes(num)) {
      if (numberWindow.length >= windowSize) {
        numberWindow.shift(); 
      }
      numberWindow.push(num);
    }
  }
  return numberWindow;
}

function getWindow() {
  return numberWindow;
}

module.exports = { updateWindow, getWindow };
