const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// lets creater a function to intialise the game



function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  // ui pe bhee empty kro
  boxes.forEach(function(box,index){
    box.innerText="";
    boxes[index].style.pointerEvents = "all";
    // intialise box with css properties again
    box.classList=`box box-${index+1}`;
    
    })
  newGameBtn.classList.remove("active");
  gameInfo.innerText=`Current Player - ${currentPlayer}`;

}

initGame();

boxes.forEach(function(box,index){
    box.addEventListener("click",function(){
        handleClick(index);
    })
})

function swapTurn(){
  if(currentPlayer==="X"){
    currentPlayer="O";
  }
  else{
    currentPlayer="X";
  }
  gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer="";

    winningPositions.forEach(function(positions){
       // all 3 boxes shoubld be non empty and exactly same in value
       if( (gameGrid[positions[0]] !=="" && gameGrid[positions[1]] !=="" &&  gameGrid[positions[2]] !=="")
       && (gameGrid[positions[0]] === gameGrid[positions[1]]) && (gameGrid[positions[1]] === gameGrid[positions[2]]) ){

        // check the winner
        if(gameGrid[positions[0]]==="X")
          answer="X";
         else{
          answer="O";
        }
         
         // disable pointer events 
         boxes.forEach(function(box){
          box.style.pointerEvents="none";
         })

         // now we know x/o is winner
         boxes[positions[0]].classList.add("win");
         boxes[positions[1]].classList.add("win");
         boxes[positions[2]].classList.add("win");
      }
      
    });

      // it meand we have a winner
    if(answer !==""){
     gameInfo.innerText=`Winner Player - ${answer}`;
     newGameBtn.classList.add("active");
     return;
    }  

   // check tied
   let fillCount=0;
   gameGrid.forEach(function(box){
    if(box!=="")
    fillCount++;
   });

   // board is filled game is tie
   if(fillCount===9){
    gameInfo.innerText="Game Tied !";
    newGameBtn.classList.add("active");
   }


}

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        // swap karo turn kro
        swapTurn();
        // check koi jeet toh ni gya
        checkGameOver();
    }
}

newGameBtn.addEventListener("click",initGame);