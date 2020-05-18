var POPULATION_SIZE = 250;
var GEN_LIMIT = 0;
var generation_counter = 0;
var birds;
var pipes;
var startGameFrame;
var died_birds = [];
var slider;

var gameScore = 0;
var bestScore = 0;
var bestBird = null;
var userBird = null;

var backgroundImg;
var birdImg;
var pipeTopImg;
var pipeBottomImg;

var showBest = false;
var userPlay = false;
var gameOver = false;
var train = true;

var sketch = (p) => {
	p.resetGame = () => {
		// console.log('called sketch reset');
		let scores = died_birds.map((bird) => {
			return bird.score;
		});
		let gen_highest_score = Math.max.apply(Math, scores);
		if (!showBest && gen_highest_score > bestScore) {
			bestScore = gen_highest_score;
			let temp = died_birds.find((bird) => bird.score === bestScore);
			if (!bestBird) bestBird = new Bird();
			bestBird.copy(temp.brain);
			// bestBird.brain = temp.brain;
			// console.log(bestScore);
		}
		died_birds.forEach((bird) => {
			bird.del();
		});
		died_birds = [];
		pipes = [ new Pipe() ];
		startGameFrame = p.frameCount;
		gameScore = 1;
	};

	p.preload = () => {
		backgroundImg = p.loadImage('images/background.png');
		birdImg = p.loadImage('images/fatBird.png');
		pipeTopImg = p.loadImage('images/full pipe top.png');
		pipeBottomImg = p.loadImage('images/full pipe bottom.png');
	};

	p.restartTraining = () => {
		birds = initialPopulation();
		p.resetGame();
		generation_counter = 0;
		bestScore = 0;
		died_birds = [];
		bestBird = null;
		p.userGameOver.html('');
		p.loop();
	};

	p.playBest = () => {
		birds.forEach((bird) => {
			bird.del();
		});
		birds = [];
		// bestBird = bestBird;
		p.resetGame();
		p.userGameOver.html('');
		p.loop();
	};

	p.playUser = () => {
		birds.forEach((bird) => {
			bird.del();
		});
		birds = [];
		if (!userBird) userBird = new Bird();
		p.resetGame();
	};

	p.setup = () => {
		let f = [ 'font-family', "'Share Tech', sans-serif" ];
		p.scoreElement = p.createDiv('Score = 0');
		p.scoreElement.position(170, 30);
		p.scoreElement.id = 'score';
		p.scoreElement.style('color', 'white');
		p.scoreElement.style(f[0], f[1]);
		p.scoreElement.style('font-size', '1.35rem');

		p.generationCounter = p.createDiv('Generation = 0');
		p.generationCounter.position(350, 30);
		p.generationCounter.id = 'genCntr';
		p.generationCounter.style('color', 'white');
		p.generationCounter.style(f[0], f[1]);
		p.generationCounter.style('font-size', '1.35rem');

		p.scoreElementTrainBestYet = p.createDiv('');
		p.scoreElementTrainBestYet.position(560, 30);
		p.scoreElementTrainBestYet.id = 'bestScore';
		p.scoreElementTrainBestYet.style('color', 'white');
		p.scoreElementTrainBestYet.style(f[0], f[1]);
		p.scoreElementTrainBestYet.style('font-size', '1.35rem');

		p.userGameOver = p.createDiv('');
		p.userGameOver.position(300, 300);
		p.userGameOver.id = 'gameOverMsg';
		p.userGameOver.style('color', 'white');
		p.userGameOver.style(f[0], f[1]);
		p.userGameOver.style('font-size', '2rem');

		let canvas = p.createCanvas(600, 600);
		canvas.parent('sketch-div');
		tf.setBackend('cpu');
		birds = initialPopulation();
		p.resetGame();
	};

	p.draw = () => {
		gameScore++;
		if (slider < 100) p.scoreElement.html('Score = ' + gameScore);
		if (train) p.scoreElementTrainBestYet.html('Highest Score = ' + bestScore);
		p.generationCounter.html('Generation = ' + generation_counter);

		if ((p.frameCount - startGameFrame) % 120 === 0) {
			pipes.push(new Pipe());
		}

		for (var i = pipes.length - 1; i > -1; i--) {
			pipe = pipes[i];
			pipe.update();
			if (pipe.offScreen()) {
				pipes.splice(i, 1);
			}
			if (train) {
				for (let j = birds.length - 1; j > -1; j--) {
					bird = birds[j];
					if (pipe.hits(bird)) {
						died_birds.push(bird);
						// bird.del();
						birds.splice(j, 1)[0];
					}
				}
			} else {
				if (showBest) {
					if (pipe.hits(bestBird)) {
						// console.log(bestBird.score);
						p.resetGame();
						bestBird.reset();
					}
				} else {
					if (pipe.hits(userBird)) {
						p.userGameOver.html('GAME OVER.<br>PRESS SPACEBAR TO PLAY');
						gameOver = true;
						p.noLoop();
					}
				}
			}
		}

		if (train) {
			birds.forEach((bird, i) => {
				if (bird.offscreen()) {
					died_birds.push(bird);
					// bird.del();
					birds.splice(i, 1)[0];
				}
			});

			if (birds.length === 0) {
				if (GEN_LIMIT != 0 && generation_counter >= GEN_LIMIT) {
					p.noLoop();
					// Display best player and give out message
				} else {
					birds = newGeneration();
					p.resetGame();
					// console.log('new gen');
					generation_counter++;
				}
			}

			birds.forEach((bird) => {
				bird.think(pipes);
				bird.update();
				bird.score++;
			});
		} else if (showBest) {
			if (bestBird.offscreen()) {
				p.resetGame();
				// console.log(bestBird.score);
				bestBird.reset();
			} else {
				bestBird.think(pipes);
				bestBird.update();
				bestBird.score++;
			}
		} else {
			if (userBird.offscreen()) {
				gameOver = true;
				p.userGameOver.html('GAME OVER.<br>PRESS SPACEBAR TO PLAY');
				p.noLoop();
			} else {
				userBird.update();
				userBird.score++;
			}
		}

		if (p.frameCount % slider === 0) {
			// Drawing part
			// background(0);
			p.image(backgroundImg, 0, 0, p.width, p.height);
			if (train) {
				birds.forEach((bird) => {
					bird.show();
				});
			} else if (showBest) {
				bestBird.show();
			} else {
				userBird.show();
			}

			pipes.forEach((pipe) => {
				pipe.show();
			});
		}
	};
	p.keyPressed = () => {
		if (p.key === ' ') {
			if (userPlay) {
				if (gameOver) {
					gameOver = false;
					p.userGameOver.html('');
					// console.log(bird.score);
					p.loop();
					p.resetGame();
					userBird.reset();
				} else {
					// console.log('calling bird.up()');
					userBird.up();
				}
			}
		}
		// console.log('Key pressed!!')
	};
};
var p5SketchObj = new p5(sketch);
