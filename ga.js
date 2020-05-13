function initialPopulation() {
	let birds = [];
	for (let i = 0; i < POPULATION_SIZE; i++) {
		birds.push(new Bird());
	}
	return birds;
}

function newGeneration() {
	let newPopulation = [];
	calculateFitness();
	for (let i = 0; i < POPULATION_SIZE; i++) {
		let parents = getParents();
		let children = reproduce(parents);
		newPopulation = newPopulation.concat(children);
	}
	return newPopulation;
}

function mutate(chromosomes_of_children) {
	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < chromosomes_of_children[i].length; j++) {
			if (random(1) < 0.2) {
				chromosomes_of_children[i][j] += randomGaussian() * 0.5;
			}
		}
	}
	return chromosomes_of_children;
}

function crossover(chromosomes_of_parents) {
	let chromosomes_of_children = [];

	crossover_point = floor(random(chromosomes_of_parents[0].length));

	chromosomes_of_children.push(
		chromosomes_of_parents[0].slice(0, crossover_point).concat(chromosomes_of_parents[1].slice(crossover_point))
	);
	chromosomes_of_children.push(
		chromosomes_of_parents[1].slice(0, crossover_point).concat(chromosomes_of_parents[0].slice(crossover_point))
	);

	return chromosomes_of_children;
}

function reproduce(parents) {
	let chromosomes_of_parents = [];

	parents.forEach((parent) => {
		let chromosome_parent = [];
		parent.brain.model.getWeights().forEach((weight_matrix) => {
			weights = weight_matrix.dataSync();
			weights.forEach((weight) => {
				chromosome_parent.push(weight);
			});
		});
		chromosomes_of_parents.push(chromosome_parent);
	});

	let chromosomes_of_children = crossover(chromosomes_of_parents);
	chromosomes_of_children = mutate(chromosomes_of_children);

	let children = [];
	chromosomes_of_children.forEach((chromosome) => {
		let child = new Bird();
		let weight_matrices = [];
		child.brain.model.getWeights().forEach((weight_matrix) => {
			let len_of_weights = weight_matrix.size;
			let weights = chromosome.slice(0, len_of_weights);
			chromosome = chromosome.slice(len_of_weights);

			let shape_of_matrix = weight_matrix.shape;
			if (shape_of_matrix.length == 1) {
				weight_matrices.push(tf.tensor1d(weights));
			} else {
				weight_matrices.push(tf.tensor2d(weights, shape_of_matrix));
			}
		});
		child.brain.model.setWeights(weight_matrices);
		children.push(child);
	});

	return children;
}

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
