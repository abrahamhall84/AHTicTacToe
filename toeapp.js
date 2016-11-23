
var box = $('[id^=box]');
    currentPlayer = 'X';
    nextTurn = $('.player-turn');
    scoreX = $('.X-score-sum');
    scoreO = $('.O-score-sum');
    scoreBoard = scoreX & scoreO;
    alertNotice = $('.notice');
    sumX = sumO = 0;
    restartGame = $('#restart-game');
    startGame = $('#start-game');
    restartScore = $('#restart-score');


// message board
function displayNextTurn(player) {
  if(player === 'X') {
    nextTurn.text('X');
  } else  {
    nextTurn.text('O');
  } 
}
function displayStartAlert() {
  alertNotice.append('<div id="alertdiv" class="alert alert-info"><h4>Press <i>Start Game</i> to begin the game.</h4></div>');
}
function showAlert(message) {
  alertNotice.append('<div id="alertdiv" class="alert alert-info"><h4>'+message+'</h4></div>');
  removeAlert(4000);
}
function removeAlert(time) {
  $('#alertdiv').fadeOut(time, function() { 
    $(this).remove(); 
  });
}
function displayPlayerWin(player) {
  showAlert('<strong>'+player+'</strong> Wins!!');
  box.off();
}
function addScoreX(num) {
  sumX = sumX + num;
  scoreX.text(sumX);
}
function addScoreO(num) {
  sumO = sumO + num;
  scoreO.text(sumO);
}
// Game
// player moves
function nextPlayer(player) {
  if(player ==='X') {
    currentPlayer = 'O';
  } else {
    currentPlayer = 'X';
  }
}
function isMoveValid(cell) {
  if(cell.text() === '') {
    return true;
  } else {
    showAlert('Choose another cell.');
    return false;
  }
}
// scores(wins)
function horizontalWins(player) {
  if(player === "X" ) {
    addScoreX(1);
  } else {
    addScoreO(1);
  }    
}
function verticalWins(player) {
  if(player === "X" ) {
    addScoreX(2);
  } else {
    addScoreO(2);
  }    
}
function diagonalWins(player) {
  if(player === "X" ) {
    addScoreX(3);
  } else {
    addScoreO(3);
  }    
}
// moves(wins)
function playerVictory(player) {
  box1 = $('#box1').text();
  box2 = $('#box2').text();
  box3 = $('#box3').text(); 
  box4 = $('#box4').text(); 
  box5 = $('#box5').text(); 
  box6 = $('#box6').text(); 
  box7 = $('#box7').text(); 
  box8 = $('#box8').text(); 
  box9 = $('#box9').text(); 
  empty = '';
  switch(true) {
    // horizontal wins---
    // top row
    case box1 === player && box2 === player && box3 === player:
      horizontalWins(player);
      displayPlayerWin(player);
      break;
    // center row 
    case box4 === player && box5 === player && box6 === player:
      horizontalWins(player);
      displayPlayerWin(player);
      break;
    // bottom row
    case box7 === player && box8 === player && box9 === player:
      horizontalWins(player);
      displayPlayerWin(player);
      break;
    // vertical wins---
    // left column 
    case box1 === player && box4 === player && box7 === player:
      verticalWins(player);
      displayPlayerWin(player);
      break;
    // center column
    case box2 === player && box5 === player && box8 === player:
      verticalWins(player);
      displayPlayerWin(player);
      break;
    // right column
    case box3 === player && box6 === player && box9 === player:
      verticalWins(player);
      displayPlayerWin(player);
      break;
    //diagonal wins---
    // top left to bottom right
    case box1 === player && box5 === player && box9 === player:
      diagonalWins(player);
      displayPlayerWin(player);
      break;
    // top right to bottom left
    case box3 === player && box5 === player && box7 === player:
      diagonalWins(player);
      displayPlayerWin(player);
      break;
    // draw---
    case box1 !== empty && box2 !== empty && box3 !== empty && box4 !== empty && box5 !== empty && box6 !== empty && box7 !== empty && box8 !== empty && box9 !== empty:
      showAlert('Draw!! No one wins.');
      nextTurn.text(empty);
      box.off();
      break;
  }
}

// buttons board
function clearGameBoard() {
  box.each(function() {
    $(this).empty();
    currentPlayer = 'X';
  });
}
// actions
function activeGameBoard() {
  box.on({
    click: function() {
      if(isMoveValid($(this)) === true) {
        $(this).text(currentPlayer);
        playerVictory(currentPlayer);
        nextPlayer(currentPlayer);
        displayNextTurn(currentPlayer);
      }
    }
  });
}
function game() {
  startGame.on({
    click: function() {
      removeAlert(400);
      nextTurn.text(currentPlayer);
      activeGameBoard();
      restartGame.on({
        click: function() {
          clearGameBoard();
          currentPlayer = 'X';
          displayNextTurn(currentPlayer);
          activeGameBoard();
        }, 
        dblclick: function() {
          location.reload(true);
        }
      });
      restartScore.on({
        click: function() {
          scoreX.text('').html('<br>');
          scoreO.text('').html('<br>');
          sumX = sumO = 0;
        }
      });
      $(this).removeClass('btn-primary').addClass('btn-success').off();
    }
  });
}
// testing 
function test(string) {
  $('#test').append('<li>'+string+'</li>');
}

$(function() {
  displayStartAlert();
  currentPlayer = 'X';
  game();
});

//Notes -------------------------------------------------
// winner ? 'X' : 'O'
// $(document).on("click", restartGame, function(){
//     location.reload(true);
// });
// $(".box").hover(function () {
//    $(this).animate({'opacity':'0.7'}, 100);
// },
// function (){
//    $(this).animate({'opacity':'0'}, 100);
// });​
// function playerTurn() {
//   if(currentPlayer === 'X') {
//     box.on({
//       mouseenter: function() {
//         $(this).text('X').css('opacity', '0.5');
//       }
//     }); 
//   } else {
//     box.on({
//       mouseenter: function() {
//         $(this).text('O').css('opacity', '0.5');
//       }
//     });
//   }
// }
// function playerTurn(player) {
//   if(player === 'X') {
//     box.on({
//       mouseenter: function() {
//         $(this).text('X', function() { 
//           $(this).animate({'opacity':'0.4'}, 100);
//         });
//       },
//       mouseleave: function() {
//         $(this).text('X', function() {
//           $(this).animate({'opacity':'0'}, 100);
//         });
//       }
//     });
//   } else {
//     box.on({
//       mouseenter: function() {
//         $(this).text('O', function() { 
//           $(this).animate({'opacity':'0.4'}, 100);
//         });
//       },
//       mouseleave: function() {
//         $(this).text('O', function() {
//           $(this).animate({'opacity':'0'}, 100);
//         });
//       }
//     });
//   }
// }
// function hover(player) {
//   box.on({
//     mouseenter: function() {
//       $(this).text(player).addClass('faint');
//     },
//     mouseleave: function() {
//       $(this).text('').removeClass('faint');
//     }
//   });
// }
// function isMoveHoverable() {
//   if(box.text === '') {
//     hover(currentPlayer);
//   }
// }
// function scoreTest() {
//     $('#1').on({
//       click: function() {
//         addScoreX(1);
//         test("added 1 to score");
//       }
//     });
//     $('#2').on({
//       click: function() {
//         addScoreX(2);
//         test("added 2 to score");
//       }
//     });
//     $('#3').on({
//       click: function() {
//         addScoreX(3);
//         test("added 3 to score");
//       }
//     });
// }
// function playerVictory(player) {
//   box1 = $('#box1').text();
//   box2 = $('#box2').text();
//   box3 = $('#box3').text(); 
//   box4 = $('#box4').text(); 
//   box5 = $('#box5').text(); 
//   box6 = $('#box6').text(); 
//   box7 = $('#box7').text(); 
//   box8 = $('#box8').text(); 
//   box9 = $('#box9').text(); 
//   empty = '';
//   if(box1 === player && box2 === player && box3 === player) {
//     horizontalWins(player);
//     displayPlayerWin(player);
//   } else if(box4 === player && box5 === player && box6 === player) {
//     horizontalWins(player);
//     displayPlayerWin(player);
//   } else if(box7 === player && box8 === player && box9 === player) {
//     horizontalWins(player);
//     displayPlayerWin(player);
//   } else if(box1 === player && box4 === player && box7 === player) {
//     verticalWins(player);
//     displayPlayerWin(player);
//   } else if(box2 === player && box5 === player && box8 === player) {
//     verticalWins(player);
//     displayPlayerWin(player);
//   } else if(box3 === player && box6 === player && box9 === player) {
//     verticalWins(player);
//     displayPlayerWin(player);
//   } else if(box1 === player && box5 === player && box9 === player) {
//     diagonalWins(player);
//     displayPlayerWin(player);
//   } else if(box3 === player && box5 === player && box7 === player) {
//     diagonalWins(player);
//     displayPlayerWin(player);
//   } else if(box1 !== empty && box2 !== empty && box3 !== empty && box4 !== empty && box5 !== empty && box6 !== empty && box7 !== empty && box8 !== empty && box9 !== empty) {
//     showAlert('Draw!! No one wins.');
//     test('found Draw');
//     nextTurn.text('');
//     box.off();
//   }
// }