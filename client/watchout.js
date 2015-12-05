
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 3, //number of enemies we want to have in the game
  padding: 20
}

var gameStats = {
  score: 0,
  bestScore: 0,
  collisions: 0
}

var gameBoard = d3.select('.board').append('svg:svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height);

//returns a array of enemy objects to draw
var spawnEnemies = function(){
  var positions = placeEnemies();

  return gameBoard.selectAll('circle') //searches for existing circle enemies
                  .data(positions)
                  .enter()
                  .append('svg:circle')
                    .attr('class', 'enemy')
                    .attr('cx', function(enemy){ return enemy.x;})
                    .attr('cy', function(enemy){ return enemy.y;})
                    .attr('r', 8);
}

var placeEnemies = function(){
  var positions = [];

  //loops from 0 to nEnemies
  for(var i = 0; i < gameOptions.nEnemies; i++){
    var currentEnemy = {}; //enemy object with 3 properties
    currentEnemy.id = i;
    currentEnemy.x = Math.random() * gameOptions.width;
    currentEnemy.y = Math.random() * gameOptions.height;

    positions.push(currentEnemy); //array of all enemies
  }

  return positions;
}

//Creates enemies
var gameEnemies = spawnEnemies();

//Takes in a list of enemies
//Put those on the board
//if they exist, we want to update them
var render = function(){
  var newPositions = placeEnemies();

  return gameBoard.selectAll('circle')
                  .data(newPositions)
                  .transition().duration(1500)
                  .attr('cx', function(enemy){ return enemy.x;})
                  .attr('cy', function(enemy){ return enemy.y;});
}

var play = function(){
  setInterval(render, 2000);
}

play();



var updateScore = function(){
  d3.select('.current')
    .text(gameStats.score.toString());
}

var updateBestScore = function(){
  gameStats.bestScore = d3.max([gameStats.bestScore, gameStats.score]);
  d3.select('.highscore')
    .text(gameStats.bestScore.toString());
}
