function addListeners() {
	$('#training_speed').on('change', function() {
		slider = $(this).val();
		console.log('changed');
	});

	$('.train').click(function() {
		POPULATION_SIZE = $('#pop_size').val();
		GEN_LIMIT = $('#gen_limit').val();
		crossover_probability = $('#crossover_probability').val();
		crossover_points_k = $('#crossover_points_k').val();
		mutation_rate = $('#mutation_rate').val();

		train = true;
		showBest = false;
		userPlay = false;

		// function call to sketch obj for restarting training
		p5SketchObj.restartTraining();
	});

	$('.best').click(function() {
		train = false;
		showBest = true;
		userPlay = false;

		p5SketchObj.playBest();
	});
}

function setFormValues() {
	slider = 1;
	$('#pop_size').val(POPULATION_SIZE);
	$('#gen_limit').val(GEN_LIMIT);
	$('#crossover_probability').val(crossover_probability);
	$('#crossover_points_k').val(crossover_points_k);
	$('#mutation_rate').val(mutation_rate);
	$('#training_speed').val(slider);
}

function resetParams() {
	POPULATION_SIZE = 250;
	GEN_LIMIT = 0;
	crossover_probability = 0.7;
	crossover_points_k = 1;
	mutation_rate = 0.05;
	slider = 1;
}

$(window).ready(function() {
	setFormValues();
	addListeners();
});
