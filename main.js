import $ from "jquery";
import "./style.css";

//? global variables
const arrowDirection = ["left", "up", "down", "right"];
let currentscore = 0;
let highscore = 0;
const gameDuration = 10;
let directionOfArrow = "";
let arrowRow = [];
let greenCircle = 1;
// let lowerCaseArrowRow = [];

//? main body of the game
const $mainbody = $("<main>").addClass("gameBody");
$("body").append($mainbody);

//? function to create random number between 0 - 3
const getRandomInt = (numberofdirectionarrows) => {
  return Math.floor(Math.random() * numberofdirectionarrows);
};

//? function to create 9 arrows
const createArrow = () => {
  for (let i = 1; i < 9; i++) {
    let x = arrowDirection[getRandomInt(4)];
    const $arrow = $("<i>")
      .addClass(
        `fa fa-arrow-circle-${x} arrow animate__animated animate__bounceIn`
      )
      .attr("id", "arrow" + i);
    $(".gameBody").append($arrow);
    arrowRow.push((directionOfArrow = "arrow" + `${x.toLowerCase()}`));
  }
};

//? spacebar to create new 8 arrows
const $div = $("<div id='spacebar'>");
$div.insertAfter(".gameBody");

//? start button on click
$("#start").on("click", () => {
  $("#start").hide();
  //? hide start button
  $("#reset").prop("disabled", true);
  //? disable play again button

  function countdown(time) {
    //? function countdown timer
    if (time > 0) {
      $("h1").text(`${time}`);
      setTimeout(function () {
        countdown(time - 1);
      }, 1000);
    } else {
      $("h1").text(`ARROW`);
      //? function that creates the 9 arrows
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
          if (currentscore > highscore) {
            highscore = currentscore;
            $("#highscore").text(`${highscore}`);
          }
        }
        //? if current score greater than highscore save current score as highscore
        //* https://www.geeksforgeeks.org/how-to-disable-a-button-in-jquery-dialog-from-a-function/
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

      //? checking the first index of the array
      $("body").on("keydown", (event) => {
        let b = event.code.toLowerCase();
        if (arrowRow[0] === b) {
          $(`#arrow${greenCircle}`).css("border", "10px solid green");
          greenCircle++;
          currentscore++;
          $("#currentscore").text(`${currentscore}`);
          arrowRow.shift();
        }

        //? once spacebar is pressed, 8 new arrows created
        if (event.code === "Space" && arrowRow.length === 0) {
          $(".arrow").remove();
          createArrow();
          greenCircle = 1;
        }
      });
    }
  }
  countdown(3);
});

//? play again button on click
$("#reset").on("click", () => {
  $(".gameBody").text("");
  $("h1").text("A-R-R-O-W");
  currentscore = 0;
  $("#currentscore").text("0");
  $(".arrow").remove();
  $("#start").show();
  $("#timerBar").css("width", "100%");
  arrowRow = [];
  greenCircle = 1;
});
//? removes "gameover"
//? header 1 becomes A-R-R-O-W
//? reset current score to 0 and apply it to screen
//? remove all arrows
//? show start button
//? reset timer bar
