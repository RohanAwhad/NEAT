function Bird() {
	this.y = p5SketchObj.height / 2;
	this.x = 50;

	this.scale = 1.5;
	this.width = 30 * this.scale;
	this.height = 20 * this.scale;

	this.gravity = 1.5;
	this.lift = 20;
	this.velocity = 0;

	this.score = 0;
	this.fitness = 0;

	this.brain = new NeuralNetwork(5, 16, 1);

	this.think = (pipes) => {
		// find closest
		let closest = null;
		let closestD = Infinity;
		for (let i = 0; i < pipes.length; i++) {
			let d = pipes[i].width + pipes[i].x - this.x;
			if (d < closestD && d > 0) {
				closest = pipes[i];
				closestD = d;
			}
		}

		// serialize ip
		var inputs = [];
		inputs[0] = this.y / p5SketchObj.height;
		inputs[1] = closest.start_pos / p5SketchObj.height;
		inputs[2] = closest.start_pos + closest.empty_space / p5SketchObj.height;
		inputs[3] = closest.x / p5SketchObj.width;
		inputs[4] = this.velocity / 10;

		prediction = this.brain.predict(inputs);
		if (prediction > 0.5) this.up();
	};

	this.show = () => {
		// stroke(255)
		// fill(255, 50);
		// ellipse(this.x, this.y, this.width, this.height);

		p5SketchObj.push();
		p5SketchObj.translate(this.x, this.y);
		let rotateBy = p5SketchObj.map(
			p5SketchObj.constrain(this.velocity, -30, 30),
			-30,
			30,
			-2 * p5SketchObj.PI / 3,
			2 * p5SketchObj.PI / 3
		);
		p5SketchObj.rotate(rotateBy);
		p5SketchObj.imageMode(p5SketchObj.CENTER);
		p5SketchObj.image(birdImg, 0, 0, this.width, this.height);
		p5SketchObj.pop();
	};

	this.offscreen = () => {
		if (this.y <= 0 || this.y >= p5SketchObj.height) {
			return true;
		} else {
			return false;
		}
	};

	this.up = () => {
		this.velocity += -this.lift;
	};

	this.update = () => {
		this.velocity += this.gravity;
		this.velocity *= 0.9;
		this.y += this.velocity;
	};

	this.del = () => {
		tf.dispose(this.brain.model);
	};

	this.reset = () => {
		this.y = p5SketchObj.height / 2;
		this.x = 50;

		this.velocity = 0;
		this.score = 0;
	};

	this.copy = (brain) => {
		this.brain.copy(brain.model);
	};
}
