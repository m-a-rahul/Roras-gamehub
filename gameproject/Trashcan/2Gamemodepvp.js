var playerOne = 'Player 1';
var playerOneColor= 'rgb(255, 0, 0)';
var playerTwo = 'Player 2';
var playerTwoColor= 'rgb(255, 243, 36)';
var bgColor = 'rgb(19, 72, 162)'
var table = $('table tr');
var win=false;
var idVar=null;
var game_status=true;
var invalidInput=true;
var header=document.querySelector('h1')
var restart=document.querySelector('#Restart')


// Working of Restart


function InterchangeColor(rowIndex,colIndex)
{
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',bgColor);
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


function clearBoard()
{
  for(var row=0;row<7;row++)
  {
    for(var col=0;col<7;col++)
    {
      InterchangeColor(row,col);
    }
  }
  $('h1').text("Connect Four!")
  $('h5').text("Gameplay: Player 1 it is your turn! Take the plunge")
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


//End


//Input functions


function checkBottom(colIndex)
{
  var colorReport=returnColor(5,colIndex);
  for(var row=5;row>-1;row--)
  {
    colorReport=returnColor(row,colIndex);
    if(colorReport===bgColor){return row;}
  }
}


function checkInput(colIndex)
{
  if(returnColor(0,colIndex)===bgColor)
  {
    return(invalidInput=true)
  }
  else
  {
    return(invalidInput=false)
  }
}


function changeColor(rowIndex,colIndex,color)
{
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}


//End



//Win and Draw


function returnColor(rowIndex,colIndex)
{
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}



function colorMatchCheck(one,two,three,four)
{
  return (one===two && one===three && one===four && one !== bgColor && one !== undefined);
}


function horizontalWinCheck()
{
  for(var row=0;row<6;row++)
  {
    for(var col=0;col<4;col++)
    {
      if(colorMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3)))
      {
        return true;
      }
      else
      {
        continue;
      }
    }
  }
}


function verticalWinCheck()
{
  for(var col=0;col<7;col++)
  {
    for(var row=0;row<4;row++)
    {
      if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col)))
      {
        return true;
      }
      else
      {
        continue;
      }
    }
  }
}


  function diagonalWinCheck()
  {
    for (var col = 0; col < 5; col++)
    {
      for (var row = 0; row < 7; row++)
      {
        if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3)))
        {
          return true;
        }
        else
        {
          continue;
        }
      }
    }
    for (var col = 0; col < 5; col++)
    {
      for (var row = 3; row < 7; row++)
      {
        if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3)))
        {
          return true;
        }
        else
        {
          continue;
        }
      }
    }
  }


  function gameEnd(winningPlayer)
  {
    for (var col = 0; col < 7; col++)
    {
      for (var row = 0; row < 7; row++)
      {
        $('h5').text("Press RESTART and Enjoy playing again ").css("fontSize", "15px")
        $('h1').text("Well, Cheers "+winningPlayer+"! ").css("fontSize", "30px")
        return win=true;
      }
    }
  }


  function DrawCheck()
  {
    for(var colIndex=0;colIndex<7;colIndex++)
    {
      if(returnColor(0,colIndex)===bgColor)
      {
        return(false)
      }
    }
    return(true)
  }


  function gameDraw()
  {
    for (var col = 0; col < 7; col++)
    {
      for (var row = 0; row < 7; row++)
      {
        $('h5').text("Press RESTART and jump in again!").css("fontSize", "15px")
        $('h1').text("You guys Twinned! ").css("fontSize", "30px")
        return win=false;
      }
    }
  }

//End





var currentPlayer = 1;
var currentName = playerOne;
var currentColor = playerOneColor;
$('h5').text("Gameplay: Player 1 it is your turn! Take the plunge")
$('.board button').on('click',function()
{
  if(game_status)
  {
    var col = $(this).closest('td').index();
    var bottomAvail = checkBottom(col);
    checkInput(col);
    if(invalidInput)
    {
      changeColor(bottomAvail,col,currentColor);
      if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck())
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
        $('h5').text("Gameplay: "+currentName+" shoot your red one")
        currentColor= playerOneColor;
      }
      else
      {
        currentName=playerTwo;
        $('h5').text("Gameplay: "+currentName+" dunk your golden one")
        currentColor=playerTwoColor;
      }
    }
  }
})
