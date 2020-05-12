function Bird() {
	this.y = height / 2;
	this.x = 40;

	this.width = 20;
	this.height = 20;

	this.gravity = 0.5;
	this.lift = 15;
	this.velocity = 0;

	this.brain = new NeuralNetwork(4, 4, 1);

	this.think = (pipe) => {
		var inputs = [];
		inputs[0] = this.y;
		inputs[1] = pipe.start_pos;
		inputs[2] = pipe.start_pos + pipe.empty_space;
		inputs[3] = pipe.x;

		prediction = this.brain.predict(inputs);
		if (prediction > 0.5) this.up();
	};

	this.show = () => {
		fill(255);
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
