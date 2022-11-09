<h1>ARROW Game

<h1>Timeframe </h1>
<ul>
  <li> 1 week </li>
 </ul> 
 <h1>Technologies & Tools Used </h1>
  <ul>
    <li> HTML
    <li>CSS
    <li>Javascript
    <li>Git & GitHub
 </ul> 
 
 <h1>Description</h1>
 <p> 
 A basic hand eye coordination game is played by matching the arrows displayed on the screen from left to right ,to the arrows pressed on the keyboard. 
 The spacebar is only allowed to be pressed once all 8 arrows have a green border around them and it will generate the next set of 8 arrows.
 Once the start button is clicked, there will be a countdown of 3 seconds before the first 8 arrows appear. Players will have 10 seconds to try and complete
 as many arrows.
</p>

<h1>Breakdown of codes</h1>
<p>
<h2> Defining of global variables </h2>
<p>
  
```  
const arrowDirection = ["left", "up", "down", "right"];
let currentscore = 0;
let highscore = 0;
let gameDuration = 10;
let arrowRow = [];
let arrowPosition = 1;</p>
```
<ul>
  <li> arrowDirection - 4 directions of arrows in an array</li>
  <li> currentscore & highscore - Setting the first score and highscore to be 0</li>
  <li> gameDuration - Game duration to be set at 10 (seconds)</li>
  <li> arrowRow - Empty array for arrows created to be pushed inside</li>
  <li> arrowPosition - To indentify which arrow we are at </li>
</ul>
  
 <h2> Creating 8 arrows </h2>
 <p>
  
The getRandomInt function below generates a number between 0 - 3 and returns the value.
```  
const getRandomInt = (numberofdirectionarrows) => {
  return Math.floor(Math.random() * numberofdirectionarrows);
};
```
The createArrow function runs a FOR loop to generate 8 arrows. The number generated in the getRandomInt function is placed in the arrowDirection array which returns a direction. This direction will be placed in the class of the arrow which will generate the arrow on the screen.
Bounce in animation is added into the class. A string consisting of the word "arrow" and the direction of the arrow is pushed into the empty array, arrowRow.
``` 
const createArrow = () => {
  for (let i = 1; i < 9; i++) {
    let x = arrowDirection[getRandomInt(4)];
    const $arrow = $("<i>")
      .addClass(
        `fa fa-arrow-circle-${x} arrow animate__animated animate__bounceIn`
      )
      .attr("id", "arrow" + i);
    $(".gameBody").append($arrow);
    arrowRow.push("arrow" + `${x.toLowerCase()}`);
  }
};
```
 </p>

 <h2> Starting the game  </h2>
 <p>
  <h3> Countdown </h3>  
The countdown function creates a 3 second countdown for the player to prepare before the game starts. time = 3, and if the value of time is greater than 0, it will run the IF statement where the header will change to indicate the time. setTimeout function is then run to minus 1 off the time every 1000ms (1 second).
   
```  
    function countdown(time) {
    //? function countdown timer
    if (time > 0) {
      $("h1").text(`${time}`);
      setTimeout(function () {
        countdown(time - 1);
      }, 1000);
```
Once countdown reaches 0, ELSE statement will run. Header will change to "ARROW" and the createArrow function will run, creating the first 8 arrows for the game. Concurrently, the game timer will start.
  
<h3> Game Timer </h3>
  
When the game timer reaches 0, all 8 arrows will be removed off the screen and a "GAMEOVER" text will be shown. The score from the game will then be compared to the highscore and if it is higher, it will replace the highscore.
   
```   
    } else {
      $("h1").text(`ARROW`);
      //? function that creates the 8 arrows
      createArrow();
      //? function for the game timer
      const timerBarFrame = () => {
        if (timerBarWidthNumerator <= 0) {
          $(".arrow").remove();
          $(".gameBody").text("GAMEOVER").css("font-size", "90px");
          $("#reset").prop("disabled", false);
          clearInterval(timerBarInterval);
          $("body").off("keydown");
          //* https://api.jquery.com/unbind/
          //? when timer = 0
          //? remove all arrows on screen
          //? clear the interval of the timerBarInterval
          //? enable "play again" button
          //? code to disable any inputs
          //? show "gameover" on scren
          //? compare current score with highscore
          //? if current score greater than highscore save current score as highscore
          if (currentscore > highscore) {
            highscore = currentscore;
            $("#highscore").text(`${highscore}`);
          }
        }
```
  
timerBarWidthNumerator will minus 10 every 10ms. The timerBarFrame function is called every 10ms. This will animate the timer bar reducing till it reaches 0.
   
```  
        
        else {
          timerBarWidthNumerator -= 10;
          const currentTimerBarWidth =
            timerBarWidthNumerator / timerBarWidthDenominator;
          $("#timerBar").css("width", `${currentTimerBarWidth * 100}%`);
        }
      };

      let timerBarWidthNumerator = gameDuration * 1000;
      const timerBarWidthDenominator = gameDuration * 1000;

      //? Calling the timerBarFrame function every 10ms.
      const timerBarInterval = setInterval(timerBarFrame, 10);
```
  
  <h3> Keydown </h3>
    
Checking index 0 of the arrowRow array. By changing the event.code to lower case, it can be compared to the elements in the arry which are also in lower case. When index[0] and the keydown is the same, it will trigger the 1st arrow on the green to have a green border. Thereafter, the arrowPosition will increase by 1 to allow all arrow borders to turn green when correct keys are pressed in order. Scores will also increase by 1 and be indicated in the Score label. Lastly, the index[0] of arrowRow will be shifted out to allow the next in the array to be index[0].
   
Only when the arrowRow is empty and spacebar is pressed, will all the arrows be removed and new 8 arrows be created. arrowPostion will also reset back to 1.
   
```   
      //? checking the first index of the array
      $("body").on("keydown", (event) => {
        let b = event.code.toLowerCase();
        if (arrowRow[0] === b) {
          $(`#arrow${arrowPostion}`).css("border", "10px solid green");
          arrowPostion++;
          currentscore++;
          $("#currentscore").text(`${currentscore}`);
          arrowRow.shift();
        }

        //? once spacebar is pressed, 8 new arrows created
        if (event.code === "Space" && arrowRow.length === 0) {
          $(".arrow").remove();
          createArrow();
          arrowPostion = 1;
        }
      });
    }
  }
  countdown(3);
});
   
```   
<h3> Reset </h3>

  When the "Play Again" button is clicked, "GAMEOVER" text is removed from the gameBody and the header is changed back to " A-R-R-O-W". Score will reset back to 0 without affecting the highscore. Hidden start button will appear for player to start next game. Game timer will be back to 100%. arrowRow array will be clear for the next game arrows to be pushed inside and arrowPosition will reset back to 1, the first arrow.
```

//? play again button on click
$("#reset").on("click", () => {
  $(".gameBody").text("");
  $("h1").text("A-R-R-O-W");
  currentscore = 0;
  $("#currentscore").text("0");
  $("#start").show();
  $("#timerBar").css("width", "100%");
  arrowRow = [];
  arrowPostion = 1;
});
//? removes "gameover"
//? header 1 becomes A-R-R-O-W
//? reset current score to 0 and apply it to screen
//? show start button
//? reset timer bar
   
```   
</p>

