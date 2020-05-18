class NeuralNetwork {
	constructor(input_dims, hidden_layer_dims, output_dims) {
		this.model = this.createModel(input_dims, hidden_layer_dims, output_dims);
	}

	copy(model) {
		const weights = model.getWeights();
		var weightCopies = [];
		for (let i = 0; i < weights.length; i++) {
			weightCopies[i] = weights[i].clone();
		}
		this.model.setWeights(weightCopies);
	}

	predict(inputs) {
		return tf.tidy(() => {
			var xs = tf.tensor2d([ inputs ]);
			var predictions = this.model.predict(xs).dataSync()[0];
			return predictions;
		});
	}

	createModel(input_dims, hidden_layer_dims, output_dims) {
		const model = tf.sequential();

		model.add(
			tf.layers.dense({
				inputShape: [ input_dims ],
				units: hidden_layer_dims[0],
				useBias: true,
				activation: 'relu'
			})
		);

		for (let i = 1; i < hidden_layer_dims.length; ++i) {
			model.add(
				tf.layers.dense({
					units: hidden_layer_dims[i],
					useBias: true,
					activation: 'relu'
				})
			);
		}

		model.add(
			tf.layers.dense({
				units: output_dims,
				useBias: true,
				activation: 'sigmoid'
			})
		);

		return model;
	}
}
