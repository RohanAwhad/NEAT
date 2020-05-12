class NeuralNetwork {
	constructor(input_dims, hidden_layer_dims, output_dims) {
		this.model = this.createModel(input_dims, hidden_layer_dims, output_dims);
	}

	predict(inputs) {
		var xs = tf.tensor2d([ inputs ]);
		var predictions = this.model.predict(xs).dataSync();
		return predictions[0];
	}

	createModel(input_dims, hidden_layer_dims, output_dims) {
		const model = tf.sequential();

		model.add(
			tf.layers.dense({
				inputShape : [ input_dims ],
				units      : hidden_layer_dims,
				useBias    : true,
				activation : 'relu'
			})
		);

		model.add(
			tf.layers.dense({
				units      : output_dims,
				useBias    : true,
				activation : 'sigmoid'
			})
		);

		return model;
	}
}
