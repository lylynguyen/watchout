
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

var axes = {
  x: d3.scale.linear().domain([0,100]).range([0,gameOptions.width]),
  y: d3.scale.linear().domain([0,100]).range([0, gameOptions.height])
}

var gameBoard = d3.select('.board').append('svg:svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height);

var updateScore = function(){
  d3.select('.current')
    .text(gameStats.score.toString());
}

var updateBestScore = function(){
  gameStats.bestScore = d3.max([gameStats.bestScore, gameStats.score]);
  d3.select('.highscore')
    .text(gameStats.bestScore.toString());
}

//Creates enemies
//returns a array of enemy objects to draw
var spawnEnemies = function(){
  var enemies = [];

  //loops from 0 to nEnemies
  for(var i = 0; i < gameOptions.nEnemies; i++){
    var currentEnemy = {}; //enemy object with 3 properties
    currentEnemy.id = i;
    currentEnemy.x = Math.random() * 100;
    currentEnemy.y = Math.random() * 100;

    enemies.push(currentEnemy); //array of all enemies
  }

  return enemies;
}

//Takes in a list of enemies
//Put those on the board
//if they exist, we want to update them
var render = function(enemies){

  //
  var drawnEnemies = gameBoard.selectAll('circle.enemy') //searches for existing circle enemies
                                    .data(enemies) //apply this data thing to our enemies
                                    

                                    // .transition().duration(1500)
                                    // .tween('custom', function(enemyData){
                                    //   currentDot = d3.select(this);
                                    //   return currentDot.attr('cx', axes.x(enemyData.x)).attr('cy', axes.y(enemyData.y));
                                    // })
                                    .attr('cx', function(enemy){ return axes.x(enemy.x);})
                                    .attr('cy', function(enemy){ return axes.y(enemy.y);})
                                    .enter()
                                      .append('svg:circle')
                                        .attr('class', 'enemy')
                                        .attr('cx', function(enemy){ return axes.x(enemy.x);})
                                        .attr('cy', function(enemy){ return axes.y(enemy.y);})
                                        .attr('r', 5);

  

  // drawnEnemies.exit().remove();
    console.log("called");

  return drawnEnemies;
}

var play = function(){
  var gameTurn = function(){
    var newEnemies = spawnEnemies();
    return render(newEnemies);
  }

  gameTurn();
  setInterval(gameTurn, 2000);
}

play();
//draw enemies

//start game
  //draw enemies
