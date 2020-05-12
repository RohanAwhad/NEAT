var bird;
var pipes;
var startGameFrame;

function resetGame() {
	bird = new Bird();
	pipes = [ new Pipe() ];
	startGameFrame = frameCount;
	console.log(startGameFrame);
}

function setup() {
	createCanvas(500, 600);
	resetGame();
}

function draw() {
	background(0);
	bird.show();
	bird.update();

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

		if (pipe.hits(bird)) {
			resetGame();
		}
	}
}

function keyPressed() {
	if (key === ' ') bird.up();
	// console.log('Key pressed!!')
}
