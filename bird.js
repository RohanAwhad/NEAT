function Bird() {
	this.y = height / 2;
	this.x = 40;

	this.gravity = 0.3;
	this.lift = 10;
	this.velocity = 0;

	this.show = () => {
		fill(255);
		ellipse(this.x, this.y, 16, 16);
	};

	this.up = () => {
		this.velocity += -this.lift;
	};

	this.update = () => {
		this.velocity += this.gravity;
		this.velocity *= 0.9;
		this.y += this.velocity;
		console.log(this.velocity);

		// Check top - bottom hit
		if (this.y > height) this.y = height;
		else if (this.y < 0) this.y = 0;
	};
}
