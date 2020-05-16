var POPULATION_SIZE = 2;
var GEN_LIMIT = 0;
var generation_counter = 0;
var birds;
var pipes;
var startGameFrame;
var died_birds = [];
var slider;
var bestScore = 0;

var backgroundImg;
var birdImg;
var pipeTopImg;
var pipeBottomImg;

var sketch = (p) => {
	p.resetGame = () => {
		let scores = died_birds.map((bird) => {
			return bird.score;
		});
		let gen_highest_score = Math.max.apply(Math, scores);
		if (gen_highest_score > bestScore) {
			bestScore = gen_highest_score;
			console.log(bestScore);
		}
		died_birds.forEach((bird) => {
			bird.del();
		});
		died_birds = [];
		pipes = [ new Pipe() ];
		startGameFrame = p.frameCount;
	};
	p.preload = () => {
		backgroundImg = p.loadImage('images/background.png');
		birdImg = p.loadImage('images/fatBird.png');
		pipeTopImg = p.loadImage('images/full pipe top.png');
		pipeBottomImg = p.loadImage('images/full pipe bottom.png');
	};

	p.setup = () => {
		let canvas = p.createCanvas(600, 600);
		canvas.parent('sketch-div');
		slider = p.createSlider(1, 100, 1);
		tf.setBackend('cpu');
		birds = initialPopulation();
		p.resetGame();
	};

	p.draw = () => {
		if ((p.frameCount - startGameFrame) % 120 === 0) {
			pipes.push(new Pipe());
		}

		for (var i = pipes.length - 1; i > -1; i--) {
			pipe = pipes[i];
			pipe.update();
			if (pipe.offScreen()) {
				pipes.splice(i, 1);
			}

			for (let j = birds.length - 1; j > -1; j--) {
				bird = birds[j];
				if (pipe.hits(bird)) {
					died_birds.push(bird);
					// bird.del();
					birds.splice(j, 1)[0];
				}
			}
		}

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
				console.log('new gen');
				generation_counter++;
			}
		}

		birds.forEach((bird) => {
			bird.think(pipes);
			bird.update();
			bird.score++;
		});

		if (p.frameCount % slider.value() === 0) {
			// Drawing part
			// background(0);
			p.image(backgroundImg, 0, 0, p.width, p.height);

			birds.forEach((bird) => {
				bird.show();
			});

			pipes.forEach((pipe) => {
				pipe.show();
			});
		}
	};
};
// function keyPressed() {
// 	if (key === ' ') bird.up();
// 	// console.log('Key pressed!!')
// }
var p5SketchObj = new p5(sketch);