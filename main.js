import $ from "jquery";
import "./style.css";

//? global variables
const arrowDirection = ["left", "up", "down", "right"];
let currentscore = 0;
let highscore = 0;
const gameDuration = 5;
let directionOfArrow = "";
let arrowRow = [];
let lowerCaseArrowRow = [];

//? main body of the game
const $mainbody = $("<main>").addClass("gameBody");
$("body").append($mainbody);

//? create random number between 0 - 3
const getRandomInt = (numberofdirectionarrows) => {
  return Math.floor(Math.random() * numberofdirectionarrows);
};

//? create arrow
const createArrow = () => {
  let x = arrowDirection[getRandomInt(4)];
  const $arrow = $("<i>").addClass(
    `fa fa-arrow-circle-${x} arrow animate__animated animate__bounceIn`
  );
  $(".gameBody").append($arrow);
  arrowRow.push((directionOfArrow = "Arrow" + `${x}`));
};

//? create 9 arrows
for (let i = 1; i < 9; i++) {
  createArrow();
}

//? make the array to lowercase
for (const key in arrowRow) {
  lowerCaseArrowRow.push(arrowRow[key].toLowerCase());
}

$("body").on("keydown", (event) => {
  let b = event.code.toLowerCase();
  if (lowerCaseArrowRow[0] === b) {
    console.log(lowerCaseArrowRow[0]);
    currentscore++;
    $("#currentscore").text(`${currentscore}`);
    $(".arrow").eq(0).css("border", "5px solid green");

    return;
  }
});
