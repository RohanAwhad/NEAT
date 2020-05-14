function Pipe() {
	// this.empty_space = random(80, 200);
	this.empty_space = 150;
	this.start_pos = random(1, height - this.empty_space);
	this.width = 50;
	this.x = width;

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
		fill(255);
		rect(this.x, 0, this.width, this.start_pos);
		fill(255);
		rect(this.x, this.start_pos + this.empty_space, this.width, height);
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
