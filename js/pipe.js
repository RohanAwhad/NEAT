function Pipe() {
	this.empty_space = p5SketchObj.random(120, 200);
	// this.empty_space = 150;
	this.start_pos = p5SketchObj.random(1, p5SketchObj.height - this.empty_space);

	this.width = 100;
	this.x = p5SketchObj.width;

	this.hits = (bird) => {
		var bird_y_range = [ bird.y - bird.height / 2, bird.y + bird.height / 2 ];
		var bird_x_range = [ bird.x - bird.width / 2, bird.x + bird.width / 2 ];

		var pipe_empty_space_y_range = [ this.start_pos, this.start_pos + this.empty_space ];
		var pipe_empty_space_x_range = [ this.x, this.x + this.width ];

		if (
			((pipe_empty_space_x_range[0] > bird_x_range[0] && pipe_empty_space_x_range[0] < bird_x_range[1]) ||
				(pipe_empty_space_x_range[1] > bird_x_range[0] && pipe_empty_space_x_range[1] < bird_x_range[1])) &&
			!(pipe_empty_space_y_range[0] < bird_y_range[0] && pipe_empty_space_y_range[1] > bird_y_range[1])
		) {
			return true;
		} else {
			return false;
		}
	};

	this.show = () => {
		// fill(255);
		// rect(this.x, 0, this.width, this.start_pos);

		p5SketchObj.image(pipeTopImg, this.x, this.start_pos - 800, this.width);

		// fill(255);
		// rect(this.x, this.start_pos + this.empty_space, this.width, height);

		p5SketchObj.image(pipeBottomImg, this.x, this.start_pos + this.empty_space, this.width);
	};

	this.update = () => {
		this.x -= 3;
	};

	this.offScreen = () => {
		if (this.x < 0 - this.width) {
			return true;
		}
		return false;
	};
}
