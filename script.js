const board = document.getElementById("board");
const counter = document.querySelector(".counter");

const cells = [];

const cols = 30;
const rows = 20;
const mines = 130;

counter.innerHTML = `<img src="./img/bomb.png"/> <h2>x${mines}</h2>`;

for (i = 0; i < cols * rows; i++) {
  const c = document.createElement("div");
  cells.push(c);
  c.id = i;
}

board.addEventListener("contextmenu", (event) => event.preventDefault());

for(x of cells){
  x.setAttribute("value", "empty");
  x.setAttribute("class", "cell");
} 

function mine() {
  if (cells) {
    const randoms = []; 
    while(randoms.length<mines)
      {
        ran = Math.floor(Math.random() * cells.length);
        if(!randoms.includes(ran)){
        randoms.push(ran)
      }
    }
    for (o = 0; o < mines; o++) {
      cells[randoms[o]].setAttribute("value", "mine");
    }
  }
}
mine()

const cellLocation = [];

let count = 0;
for (u = 0; u < rows; u++) {
  const arrayx = [];
  for (y = 0; y < cols; y++) {
    arrayx.push(cells[y + count]);
  }
  cellLocation.push(arrayx);
  count += cols;
}

function number() {
  for (row = 0; row < cellLocation.length; row++) {
    for (col = 0; col < cellLocation[row].length; col++) {
      const midCell = cellLocation[row][col];
      const leftCell = cellLocation[row]?.[col - 1];
      const rightCell = cellLocation[row]?.[col + 1];
      const upperCell = cellLocation[row - 1]?.[col];
      const upperLeftCell = cellLocation[row - 1]?.[col - 1];
      const upperRightCell = cellLocation[row - 1]?.[col + 1];
      const lowerCell = cellLocation[row + 1]?.[col];
      const lowerLeftCell = cellLocation[row + 1]?.[col - 1];
      const lowerRightCell = cellLocation[row + 1]?.[col + 1];
      const neighbor = [
        leftCell,
        rightCell,
        upperCell,
        lowerCell,
        upperLeftCell,
        upperRightCell,
        lowerLeftCell,
        lowerRightCell,
      ].filter((cell) => cell !== undefined);
      if (midCell.getAttribute("value") !== "mine") {
        value = 0;
        for (e = 0; e < neighbor.length; e++)
          if (neighbor[e].getAttribute("value") === "mine") {
            value++;
            midCell.textContent = value;
            midCell.setAttribute("value", value);
          }
      }
    }
  }
  const emptyCell=cells.filter(item=>item.getAttribute('value')==='empty')
  emptyCell[Math.floor(Math.random()*emptyCell.length)].setAttribute('class','cell empty');
}
number();

function handleMark() {
  this.className === "cell marked"
    ? this.setAttribute("class", "cell")
    : this.className !== "cell clicked"
    ? this.setAttribute("class", "cell marked")
    : console.log("error");
  const marked = cells.filter((item) => item.className === "cell marked");
  counter.innerHTML = `<img src="./img/flag.png"/><h2>x${marked.length}</h2>`;
}

function handleClick() {
  if (this.className !== "cell marked") {
    this.setAttribute("class", "cell clicked");
    if(this.getAttribute('value')==='empty')reveal()
    if (this.getAttribute("value") === "mine") {
      cells.forEach((item) => {
        if (item.getAttribute("value") === "mine") {
          item.setAttribute("class", "cell mine");
          board.setAttribute("class", "board disable");
          counter.innerHTML = `<img src="./img/bomb.png"/><h2>LOSER</h2>`;
        }
      }
    );
    }
  }
  
  const notClick = cells.filter((item) => item.className !== "cell clicked");
  if (notClick.length <= mines) {
    board.setAttribute("class", "board disable");
    counter.innerHTML = `<img src="./img/flag.png"/><h2>WINNER</h2>`;
  }
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleClick);
  cell.addEventListener("contextmenu", handleMark);
  board.appendChild(cell);
});

function reveal() {
  cells.forEach(()=>{for (row = 0; row < cellLocation.length; row++) {
    for (col = 0; col < cellLocation[row].length; col++) {
      const midCell = cellLocation[row][col];
      const leftCell = cellLocation[row]?.[col - 1];
      const rightCell = cellLocation[row]?.[col + 1];
      const upperCell = cellLocation[row - 1]?.[col];
      const upperLeftCell = cellLocation[row - 1]?.[col - 1];
      const upperRightCell = cellLocation[row - 1]?.[col + 1];
      const lowerCell = cellLocation[row + 1]?.[col];
      const lowerLeftCell = cellLocation[row + 1]?.[col - 1];
      const lowerRightCell = cellLocation[row + 1]?.[col + 1];
      const neighbor = [
        leftCell,
        rightCell,
        upperCell,
        lowerCell,
        upperLeftCell,
        upperRightCell,
        lowerLeftCell,
        lowerRightCell,
      ].filter((cell) => cell !== undefined);

        if(midCell.getAttribute("value") ==='empty' && midCell.className ==='cell clicked') {   
        for (e = 0; e < neighbor.length; e++)
          if (neighbor[e].getAttribute("value") !== "mine"&&neighbor[e].getAttribute("value") !=='cell marked'&&neighbor[e].className!=='cell clicked') {
            neighbor[e].setAttribute('class','cell clicked')
          }
      }
    }
  }
}
)}



const reload = () => location.reload();


// cells.forEach((item)=>{if(item.getAttribute('value')==='mine')console.log(1);});