
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 13, //number of enemies we want to have in the game
  padding: 20
}

var gameStats = {
  score: 0,
  bestScore: 0,
  collisions: 0
}

var playerObject = {
  size: 10,
  x: gameOptions.width/2,
  y: gameOptions.height/2,
  color: 'blue'
}

var gameBoard = d3.select('.board').append('svg:svg')
                  .attr('width', gameOptions.width)
                  .attr('height', gameOptions.height);


//returns a array of enemy objects to draw
var spawnEnemies = function(){
  var positions = placeEnemies();

  return gameBoard.selectAll('circle.enemy') //searches for existing circle enemies
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

var drag = d3.behavior.drag()
             .origin(function(d) { return d; })
             .on("drag", dragmove);

function dragmove(d) {
  d3.select(this)
      .attr("cx", d.x = Math.max(playerObject.size, Math.min(gameOptions.width - playerObject.size, d3.event.x)))
      .attr("cy", d.y = Math.max(playerObject.size, Math.min(gameOptions.height - playerObject.size, d3.event.y)));
}

var player = gameBoard.selectAll('circle.player')
                      .data([playerObject])
                      .enter()
                      .append('svg:circle')
                        .attr('class', 'player')
                        .attr('cx', function(p){ return p.x;})
                        .attr('cy', function(p){ return p.y;})
                        .attr('r', function(p){ return p.size;})
                        .style('fill', function(p){ return p.color;})
                        .call(drag);

var checkCollision = function(){
  //sets these once
  var prevX = 0;
  var prevY = 0;
  var colliding = false;

  //runs this a lot while transitioning
  return function(){
    //gets values from the actual elements
    var curX = Math.floor(d3.select(this).attr('cx'));
    var curY = Math.floor(d3.select(this).attr('cy'));
    var playX = Math.floor(player.attr('cx'));
    var playY = Math.floor(player.attr('cy'));

    //checks if the player is moving
    if(curX !== prevX && curY !== prevY){

      //when we're in the same space on the board
      if(Math.abs(curX - playX) <= playerObject.size && Math.abs(curY - playY) <= playerObject.size){
        //only register collision one time
        if(!colliding){
          //count collisions
          colliding = true;
          gameStats.collisions++;
          updateCollisions();

          //high 
          if(gameStats.highscore < gameStats.score){
            gameStats.highscore = gameStats.score;
          }
          updateBestScore();

          gameStats.score = 0;
          updateScore();
        }
      }
      else{
        colliding = false;
      }
    }
  }
}

//Takes in a list of enemies
//Put those on the board
//if they exist, we want to update them
var render = function(){
  var newPositions = placeEnemies();

  return gameBoard.selectAll('circle.enemy')
                  .data(newPositions)
                  .transition().duration(1500)
                  .tween('print', checkCollision)
                  .attr('cx', function(enemy){ return enemy.x;})
                  .attr('cy', function(enemy){ return enemy.y;});
}

var play = function(){
  render();
  setInterval(render, 2000);
  setInterval(function(){
    gameStats.score++;
    return updateScore();
  }, 100);
}

play();

var updateCollisions = function(){
  d3.select('.collisions')
    .text("Collisions: " + gameStats.collisions);
}

var updateScore = function(){
  d3.select('.current')
    .text("Current score: " + gameStats.score);
}

var updateBestScore = function(){
  gameStats.bestScore = d3.max([gameStats.bestScore, gameStats.score]);
  d3.select('.highscore')
    .text("High score: " + gameStats.bestScore);
}
