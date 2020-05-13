var POPULATION_SIZE = 50;
var birds;
var pipes;
var startGameFrame;
var died_birds;
var generation_counter = 0;

function resetGame() {
	died_birds = [];
	pipes = [ new Pipe() ];
	startGameFrame = frameCount;
}

function setup() {
	createCanvas(400, 400);
	tf.setBackend('cpu');
	birds = initialPopulation();
	resetGame();
}

function draw() {
	background(0);

	if ((frameCount - startGameFrame) % 100 === 0) {
		pipes.push(new Pipe());
	}

	for (var i = pipes.length - 1; i > -1; i--) {
		pipe = pipes[i];
		pipe.update();
		pipe.show();
		if (pipe.offScreen()) {
			pipes.splice(i, 1);
		}

		for (let j = birds.length - 1; j > -1; j--) {
			bird = birds[i];
			if (pipe.hits(bird)) {
				birds.splice(i, 1);
				died_birds.push(bird);
			}
		}

		if (birds.length === 0) {
			birds = newGeneration();
			resetGame();
			generation_counter++;
			console.log(generation_counter);
		}
	}

	birds.forEach((bird) => {
		bird.think(pipes);
		bird.update();
		bird.show();
		bird.score++;
	});
}

// function keyPressed() {
// 	if (key === ' ') bird.up();
// 	// console.log('Key pressed!!')
// }
