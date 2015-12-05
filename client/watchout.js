
var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 30,
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

var spawnEnemies = function(){
  var range = d3.range(0, gameOptions.nEnemies);
  var enemies = range.map(function(index){
    return {
      id: index,
      x: Math.random() * 100,
      y: Math.random() * 100
    }
  });

  var drawnEnemies = gameBoard.selectAll('circle.enemy')
                       .data(enemies, function(d){ return d.id; });

  drawnEnemies.enter()
    .append('svg:circle')
      .attr('class', 'enemy')
      .attr('cx', function(enemy){ return axes.x(enemy.x);})
      .attr('cy', function(enemy){ return axes.y(enemy.y);})
      .attr('r', 5);
}

spawnEnemies();

//draw enemies

//start game
  //draw enemies
