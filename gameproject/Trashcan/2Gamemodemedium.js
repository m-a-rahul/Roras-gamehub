var player = 'Player';
var playerColor= 'rgb(255, 0, 0)';
var computer = 'Computer;'
var computerColor= 'rgb(255, 243, 36)';
var bgColor = 'rgb(19, 72, 162)'
var table = $('table tr');
var win=false;
var idVar=null;
var res=false;
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
  else if (win===true)
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
  if (computerColor==='rgb(255, 0, 0)')
  {
    return computerColor='rgb(255, 243, 36)'
  }
  else if(computerColor==='rgb(255, 243, 36)')
  {
    return computerColor='rgb(255, 0, 0)'
  }
}


function exchangePlayerColor()
{
  if (playerColor==='rgb(255, 0, 0)')
  {
    return playerColor='rgb(255, 243, 36)'
  }
  else if(playerColor==='rgb(255, 243, 36)')
  {
    return playerColor='rgb(255, 0, 0)'
  }
}


function restartMove()
{
  if(res===true)
  {
    var currentName = computer;
    var currentColor = computerColor;
    var col = randomColn(7);
    checkInput(col);
    while (invalidInput !== true)
    {
      var col = randomColn(7);
      checkInput(col);
    }
    var bottomAvail = checkBottom(col);
    changeColor(bottomAvail,col,currentColor);

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
  changeRestart();
  if (res===false)
  {
    $('h1').text("Connect Four!")
    $('h5').text("Gameplay: Player-Color 'Red'  Computer-Color 'Yellow'")
  }
  else if (res===true)
  {
    $('h1').text("Connect Four!")
    $('h5').text("Gameplay: Player-Color 'Yellow'  Computer-Color 'Red'")
  }
  changeCheck();
  InterchangeHeadercolor();
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
        if (winningPlayer==='Player')
        {
          $('h5').text("Press RESTART and Enjoy playing again ")
          $('h1').text("Kudos! Amazing job..")
          return win=true;
        }
        else
        {
          $('h5').text("Press RESTART and give another stab")
          $('h1').text("Oops! Tough break.. ")
          return win=false;
        }

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
        $('h5').text("Press RESTART and Enjoy jump in again ")
        $('h1').text("Weighed Finishing !!")
        return win=false;
      }
    }
  }


  //End


//Computer input


  function compColMatchCheck(one,two,three,four)
  {
      return (two===playerColor && three===playerColor && four === playerColor && one===bgColor)
  }


  function compColWinCheck(one,two,three,four)
  {
    return (two===computerColor && three===computerColor&& four === computerColor && one===bgColor)
  }


  function compMatchCheck(one,two,three,four)
  {
    if ((two===playerColor && three===playerColor && one === playerColor && four===bgColor))
    {
      return 'four'
    }
    else if ((two===playerColor && four===playerColor && one === playerColor && three===bgColor))
    {
      return 'three'
    }
    else if ((one===playerColor && three===playerColor && four === playerColor && two===bgColor))
    {
      return 'two'
    }
    else if((two===playerColor && three===playerColor && four === playerColor && one===bgColor))
    {
      return 'one'
    }
  }


  function compWinCheck(one,two,three,four)
  {
  if ((two===computerColor&& three===computerColor && one === computerColor && four===bgColor))
    {
      return 'four'
    }
    else if ((two===computerColor&& four===computerColor && one === computerColor && three===bgColor))
    {
      return 'three'
    }
    else if ((four===computerColor&& three===computerColor && one === computerColor && two===bgColor))
    {
      return 'two'
    }
    else if((two===computerColor && three===computerColor && four === computerColor && one===bgColor))
    {
      return 'one'
    }
}





  function randomColn(max)
  {
    for(var col=0;col<7;col++)
    {
      for(var row=0;row<4;row++)
      {
        if(compColWinCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col)))
        {
            return col;
        }
        else
        {
          continue;
        }
      }
    }
    for(var row=0;row<6;row++)
    {
      for(var col=0;col<4;col++)
      {
        if(compWinCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))==='one')
        {
          if (checkBottom(col)===row)
          {
            return  col;
          }
        }
        else if (compWinCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))==='two')
        {

           var colOne=col+1;
          if (checkBottom(colOne)===row)
          {
            return colOne;
          }

        }
        else if (compWinCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))==='three')
        {
        var colTwo=col+2;
          if (checkBottom(colTwo===row))
          {
            return colTwo;
          }

        }
        else if(compWinCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))==='four')
        {
        var colThree=col+3;
          if (checkBottom(colThree)===row)
          {
            return colThree;
          }

        }
        else
        {
          continue;
        }
      }
    }


    for(var col=0;col<7;col++)
    {
      for(var row=0;row<4;row++)
      {
        if(compColMatchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col)))
        {
          return col;
        }
        else
        {
          continue;
        }
      }
    }
    for(var row=0;row<6;row++)
    {
      for(var col=0;col<4;col++)
      {
        if(compMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))==='one')
        {
          if (checkBottom(col)===row)
          {
          return col;
          }
        }
        else if (compMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))==='two')
        {
          var colOne=col+1;
          if (checkBottom(colOne)===row)
          {
            return colOne;
          }

        }
        else if (compMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))==='three')
        {

          var colTwo=col+2;
          if (checkBottom(colTwo)===row)
          {
            return colTwo;
          }

        }
        else if(compMatchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))==='four')
        {
          var colThree=col+3;
          if (checkBottom(colThree)===row)
          {
            return colThree;
          }

        }
        else {
          continue;
        }
      }
    }
    for (var col = 0; col < 5; col++)
    {
      for (var row = 0; row < 7; row++)
      {
        if (compMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))==='one')
        {
          if (checkBottom(col)===row)
          {
          return col;
          }

        }
        else if (compMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))==='two')
        {
          var colOne=col+1;
          var rowOne=row+1;
          if (checkBottom(colOne)===rowOne)
          {
            return colOne;
          }
        }
        else if (compMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))==='three')
        {
          var colTwo=col+2;
          var rowTwo=row+2;
          if (checkBottom(colTwo)===rowTwo)
          {
            return colTwo;
          }

        }
        else if (compMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))==='four')
        {
          var colThree=col+3;
          var rowThree=row+3;
          if (checkBottom(colThree)===rowThree)
          {
            return colThree;
          }

        }
        else
        {
          continue;
        }
      }
    }
  return Math.floor(Math.random() * Math.floor(max));
  }


//End



//Main function


$('h5').text("Gameplay: Player-Color 'Red'  Computer-Color 'Yellow'")
$('.board button').on('click',function()
{
  var currentName = player;
  var currentColor = playerColor;
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
      if(game_status)
      {
        currentName = computer;
        currentColor = computerColor;
        var col = randomColn(7);
        checkInput(col);
        while (invalidInput !== true)
        {
          var col = randomColn(7);
          checkInput(col);
        }
        var bottomAvail = checkBottom(col);
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
      }
    }
  }
})
