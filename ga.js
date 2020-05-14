var mutation_rate = 0.1;
var crossover_probability = 1;
var crossover_points_k = 1;
var incremental_learning = false;

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
	for (let i = 0; i < POPULATION_SIZE/2; i++) {
		let parents = getParents();
		let children = reproduce(parents);
		newPopulation = newPopulation.concat(children);
	}
	return newPopulation;
}

function mutate(chromosomes_of_children) {
	for (let i = 0; i < 2; i++) {
		for (let j = 0; j < chromosomes_of_children[i].length; j++) {
			if (random(1) < mutation_rate) {
				chromosomes_of_children[i][j] += (randomGaussian() * 0.5);
			}
		}
	}
	return chromosomes_of_children;
}

function crossover(chromosomes_of_parents) {
	let chromosomes_of_children = [];

	if (random(1) < crossover_probability){
		let crossover_points = [];
		for (let i = 0; i < crossover_points_k; i++){
			crossover_points.push(floor(random(chromosomes_of_parents[0].length)));
		}
		crossover_points.sort((a, b) => { return a-b })
		let parent_1 = chromosomes_of_parents[0];
		let parent_2 = chromosomes_of_parents[1];
		
		chromosomes_of_children[0] = [];
		chromosomes_of_children[1] = [];

		crossover_points.forEach((curr_point, index) => {
			if (index != 0) prev_point = crossover_points[index-1];
			else prev_point = 0;

			chromosomes_of_children[0] = chromosomes_of_children[0].concat(parent_1.slice(prev_point, curr_point));
			chromosomes_of_children[1] = chromosomes_of_children[1].concat(parent_2.slice(prev_point, curr_point));

			if( JSON.stringify(parent_1) == JSON.stringify(chromosomes_of_parents[0]) ) {
				parent_1 = chromosomes_of_parents[1];
				parent_2 = chromosomes_of_parents[0];
			} else {
				parent_1 = chromosomes_of_parents[0];
				parent_2 = chromosomes_of_parents[1];
			}

			if (index === (crossover_points.length-1)) {
				chromosomes_of_children[0] = chromosomes_of_children[0].concat(parent_1.slice(curr_point));
				chromosomes_of_children[1] = chromosomes_of_children[1].concat(parent_2.slice(curr_point));
			}

		})
	} else {
		chromosomes_of_children = chromosomes_of_parents.slice();
	}

	return chromosomes_of_children;
}

function reproduce(parents) {
	return tf.tidy(() => {
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
	});
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
