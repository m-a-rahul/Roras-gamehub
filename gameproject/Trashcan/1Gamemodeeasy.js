var player = "Player"
var playerVar='X';
var playerColor= '#ff2919';
var computer = 'Computer'
var computerVar='O';
var computerColor= '#0493e0'
var win=false;
var res=false;
var idVar=null;
var table = $('table tr');
var game_status=true;
var invalidInput=true;
var header=document.querySelector('h2')
var restart=document.querySelector('#Restart')






// Working of Restart

function InterchangeVar(rowIndex,colIndex)
{
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').text('');
}


function InterchangeColor(rowIndex,colIndex)
{
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color','rgb(255, 255, 255)');
}


function InterchangeHeadercolor()
{
  colorInput='rgb(0, 0, 0)';
  header.style.color=colorInput;
}


function changeWin()
{
  return win=false
}


function changeCheck()
{
  if(idVar!=null)
  {
    clearInterval(idVar);
    return idVar=null;
  }
  else if (win)
  {
      idVar = setInterval("changeHeadercolor()",500);
      changeWin();
      return idVar;
  }

}

function changeRestart()
{
  if (res===false)
  {
    return res=true;
  }
  else if (res===true)
  {
    return res=false;
  }
}


function exchangeCompColor()
{
  if (computerColor==='#0493e0')
  {
    return computerColor='#ff2919'
  }
  else if(computerColor==='#ff2919')
  {
    return computerColor='#0493e0'
  }
}


function exchangePlayerColor()
{
  if (playerColor==='#0493e0')
  {
    return playerColor='#ff2919'
  }
  else if(playerColor==='#ff2919')
  {
    return playerColor='#0493e0'
  }
}


function exchangePlayerVar()
{
  if(playerVar==='X')
  {
    return playerVar='O'
  }
  else if (playerVar==='O')
  {
    return playerVar='X'
  }
}


function exchangeCompVar()
{
  if(computerVar==='X')
  {
    return computerVar='O'
  }
  else if (computerVar==='O')
  {
    return computerVar='X'
  }
}


function restartMove()
{
  if (res===true)
  {
      var currentName = computer;
      var currentColor = computerColor;
      var currentVar = computerVar;
      var cell =randomNum(3)
      var row = cell[0];
      var col = cell[1];
      checkInput(row,col);
      while (invalidInput != true)
      {
        var cell =randomNum(3)
        var row = cell[0];
        var col = cell[1];
        checkInput(row,col);
      }
      changeVar(row,col,currentVar);
      changeColor(row,col,currentColor);
      if (horizontalWinCheck() || verticalWinCheck()|| diagonalWinCheck())
      {
        gameEnd(currentName);
        changeCheck();
        return(game_status=false);
      }
      else if(DrawCheck())
      {
        gameDraw();
        return(game_status=false);
      }
  }
}


function clearBoard()
{
  for(var row=0;row<4;row++)
  {
    for(var col=0;col<4;col++)
    {
      InterchangeVar(row,col);
      InterchangeColor(row,col);
    }
  }
  changeRestart();
  if (res===false)
  {
    $('h2').text("Tic Tac Toe ")
    $('h5').text("Gameplay:  Player 'X'  Computer 'O'")
  }
  else if(res===true)
  {
    $('h2').text("Tic Tac Toe ")
    $('h5').text("Gameplay:  Player 'O'  Computer 'X'")
  }
  changeCheck();
  InterchangeHeadercolor();
  exchangeCompVar();
  exchangePlayerVar();
  exchangeCompColor();
  exchangePlayerColor();
  restartMove();
  return game_status=true;
}
restart.addEventListener('click',clearBoard)


// End




// Random Color Generator

function colorChanger()
{
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++)
  {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function changeHeadercolor()
{
  colorInput=colorChanger();
  header.style.color=colorInput;
}

// End




// Input Functions

function changeColor(rowIndex,colIndex,color)
{
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}


function changeVar(rowIndex,colIndex,vary)
{
  if(returnText(rowIndex,colIndex)!==playerVar&&returnText(rowIndex,colIndex)!==computerVar)
  {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').text(vary);
  }
}


function returnText(rowIndex,colIndex,color)
{
  return table.eq(rowIndex).find('td').eq(colIndex).text();
}


function checkInput(rowIndex,colIndex)
{
  if(returnText(rowIndex,colIndex)!==playerVar &&returnText(rowIndex,colIndex)!==computerVar)
  {
    return(invalidInput=true)
  }
  else
  {
    return(invalidInput=false)
  }
}


// End



//Win and draw check


function colorMatchCheck(one,two,three)
{
  return (one===two && one===three && one !== '' && one !== undefined);
}


function horizontalWinCheck()
{
  for(var row=0;row<4;row++)
  {
    var col=0;
      if(colorMatchCheck(returnText(row,col),returnText(row,col+1),returnText(row,col+2)))
      {
        return true;
      }
      else
      {
        continue;
      }
  }
}


function verticalWinCheck()
{
  for(var col=0;col<4;col++)
  {
    var row=0;
      if(colorMatchCheck(returnText(row,col),returnText(row+1,col),returnText(row+2,col)))
      {
        return true;
      }
      else
      {
        continue;
      }
  }
}


function diagonalWinCheck()
{
    var row=0;
    var col=0;
        if (colorMatchCheck(returnText(row,col), returnText(row+1,col+1) ,returnText(row+2,col+2)))
        {
          return true;
        }
        else if (colorMatchCheck(returnText(row,col+2), returnText(row+1,col+1) ,returnText(row+2,col)))
        {
          return true;
        }
        else
        {
          return false;
        }
}


function gameEnd(winningPlayer)
{
  for (var col = 0; col < 4; col++)
  {
    for (var row = 0; row < 4; row++)
    {
      if (winningPlayer===player)
      {
        $('h5').text("Press RESTART and Enjoy playing again ").css("fontSize", "15px")
        $('h2').text("Kudos! Amazing job..").css("fontSize", "30px")

        return win=true;
      }
      else
      {
        $('h5').text("Press RESTART and give another stab").css("fontSize", "15px")
        $('h2').text("Oops! Tough break.. ").css("fontSize", "30px")
        return win=false;
      }

    }
  }
}


function drawMatchCheck(one,two,three)
{
  return (one!==''&&two!==''&&three!=='' && one !== undefined)
}


function gameDraw()
{
    for (var col = 0; col < 4; col++)
    {
      for (var row = 0; row < 4; row++)
      {
        $('h2').text("Weighed Finishing!! ").css("fontSize", "30px")
        $('h5').text("Press RESTART and jump in again!").css("fontSize", "15px")
        return win=false;
      }
    }
}


function DrawCheck()
{
  var col=0;
  if(drawMatchCheck(returnText(0,col),returnText(0,col+1),returnText(0,col+2)))
  {
    if(drawMatchCheck(returnText(1,col),returnText(1,col+1),returnText(1,col+2)))
    {
      if(drawMatchCheck(returnText(2,col),returnText(2,col+1),returnText(2,col+2)))
      {
        return true;
      }
    }
  }
}


//End



//CompuetrInput

function randomNum(max)
{
  return [Math.floor(Math.random() * Math.floor(max)), Math.floor(Math.random() * Math.floor(max))];
}


//End



//Main function


$('h5').text("Gameplay:  Player 'X'  Computer 'O'")
$('.board button').on('click',function()
{
  var currentName = player;
  var currentVar=playerVar;
  var currentColor=playerColor;
  if(game_status)
  {
    var col = $(this).closest('td').index();
    var row = $(this).closest('tr').index();
    checkInput(row,col);
    changeVar(row,col,currentVar);

    if(invalidInput)
    {
      changeVar(row,col,currentVar);
      changeColor(row,col,currentColor);
      if (horizontalWinCheck() || verticalWinCheck()|| diagonalWinCheck())
      {
        gameEnd(currentName);
        changeCheck();
        return(game_status=false);
      }
      else if(DrawCheck())
      {
        gameDraw();
        return(game_status=false);
      }
      //Computermove
      if(game_status)
      {
        currentName = computer;
        currentColor = computerColor;
        currentVar = computerVar;
        var cell =randomNum(3)
        var row = cell[0];
        var col = cell[1];
        checkInput(row,col);
        while (invalidInput != true)
        {
          var cell =randomNum(3)
          var row = cell[0];
          var col = cell[1];
          checkInput(row,col);
        }
        changeVar(row,col,currentVar);
        changeColor(row,col,currentColor);
        if (horizontalWinCheck() || verticalWinCheck()|| diagonalWinCheck())
        {
          gameEnd(currentName);
          changeCheck();
          return(game_status=false);
        }
        else if(DrawCheck())
        {
          gameDraw();
          return(game_status=false);
        }
      }
    }
  }
})
