var playerOne = 'Player 1'
var playerOneVar='X';
var playerOneColor= '#ff2919';
var playerTwo = 'Player 2'
var playerTwoVar='O';
var playerTwoColor= '#0493e0'
var win=false;
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
  else if (win===true)
  {
      idVar = setInterval("changeHeadercolor()",500);
      changeWin();
      return idVar;
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
  $('h2').text("Tic Tac Toe ")
  $('h5').text("Gameplay: Player 1 aim on your first move")
  changeCheck();
  InterchangeHeadercolor();
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
  if(returnText(rowIndex,colIndex)!==playerOneVar&&returnText(rowIndex,colIndex)!==playerTwoVar)
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
  if(returnText(rowIndex,colIndex)!==playerOneVar &&returnText(rowIndex,colIndex)!==playerTwoVar)
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
      $('h5').text("Press RESTART and jump in again!").css("fontSize", "15px")
        $('h2').text("Well, Cheers "+winningPlayer+"! ").css("fontSize", "30px")
        return win=true;
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
        $('h2').text("You guys Twinned! ").css("fontSize", "30px")
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




//Main function
var currentPlayer = 1;
var currentName = playerOne;
var currentVar=playerOneVar;
var currentColor=playerOneColor;
$('h5').text("Gameplay: Player 1 aim on your first move")
$('.board button').on('click',function()
{
  if(game_status)
  {
    var col = $(this).closest('td').index();
    var row = $(this).closest('tr').index();
    checkInput(row,col);
    changeVar(row,col,currentVar);

    if(invalidInput)
    {
      changeColor(row,col,currentColor);
      if (horizontalWinCheck() || verticalWinCheck()|| diagonalWinCheck())
      {
        gameEnd(currentName);
        changeCheck();
        return(game_status=false);
      }
      if(DrawCheck())
      {
        gameDraw();
        return(game_status=false);
      }
      currentPlayer = currentPlayer * -1 ;
      if(currentPlayer===1)
      {
        currentName= playerOne;
        $('h5').text("Gameplay: "+currentName+" it is your turn, arrow your X")
        currentVar=playerOneVar;
        currentColor=playerOneColor;
      }
      else
      {
        currentName=playerTwo;
        $('h5').text("Gameplay: "+currentName+" it is your turn, shaft your O")
        currentVar=playerTwoVar;
        currentColor=playerTwoColor;
      }
    }
  }
})
