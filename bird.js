function Bird() {
	this.y = height / 2;
	this.x = 40;

	this.width = 20;
	this.height = 20;

	this.gravity = 0.7;
	this.lift = 15;
	this.velocity = 0;

	this.score = 0;
	this.fitness = 0;

	this.brain = new NeuralNetwork(4, 4, 1);

	this.think = (pipes) => {
		// find closest
		let closest = null;
		let closestD = Infinity;
		for (let i = 0; i < pipes.length; i++) {
			let d = pipes[i].x - this.x;
			if (d < closestD && d > 0) {
				closest = pipes[i];
				closestD = d;
			}
		}

		// serialize ip
		var inputs = [];
		inputs[0] = this.y / height;
		inputs[1] = closest.start_pos / height;
		inputs[2] = closest.start_pos + closest.empty_space / height;
		inputs[3] = closest.x / width;

		prediction = this.brain.predict(inputs);
		if (prediction > 0.5) this.up();
	};

	this.show = () => {
		stroke(255)
		fill(255, 50);
		ellipse(this.x, this.y, this.width, this.height);
	};

	this.up = () => {
		this.velocity += -this.lift;
	};

	this.update = () => {
		this.velocity += this.gravity;
		this.velocity *= 0.9;
		this.y += this.velocity;

		// Check top - bottom hit
		if (this.y > height) this.y = height;
		else if (this.y < 0) this.y = 0;
	};
}
