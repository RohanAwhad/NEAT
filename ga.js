function newGeneration() {
	calculateFitness();
	for (let i = 0; i < POPULATION_SIZE; i++) {
		let parents = getParents();
		let children = reproduce(parents);
	}
}

function reproduce(parents) {}

function calculateFitness() {
	let sum = 0;
	died_birds.forEach((bird) => {
		sum += bird.score;
	});

	died_birds.forEach((bird) => {
		bird.fitness = bird.score / sum;
	});
}

function getParents() {
	let parents = [];
	for (let i = 0; i < 2; i++) {
		let r = random(1);
		let index = 0;
		while (r > 0) {
			r -= died_birds[index].fitness;
			index++;
		}
		index--;
		parents.push(died_birds[index]);
	}
	return parents;
}
