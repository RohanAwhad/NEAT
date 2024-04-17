# NEAT JavaScript Implementation

This project is a JavaScript implementation of the NeuroEvolution of Augmenting Topologies (NEAT) algorithm. It demonstrates the use of genetic algorithms to evolve neural networks that control game-playing agents, such as a bird navigating through obstacles. The project leverages the power of TensorFlow.js for neural network operations and p5.js for rendering the game environment.

You can checkout the project [here](https://rohanawhad.github.io/NEAT/).

## Features

- **Interactive Game Simulation**: Simulate and visualize the game with birds navigating through pipes.
- **Genetic Algorithm Control**: Control the evolution process through genetic operations such as crossover and mutation.
- **Neural Network Prediction**: Birds decide whether to move up or down based on their neural network's predictions.
- **Evolutionary Training**: Automatically evolve bird agents over generations to improve their performance in the game.
- **User Interaction**: Allow users to interact with the simulation, including playing the game or viewing the best performing bird.

## Installation

To set up this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/rohanawhad/NEAT-js.git
   ```

2. Navigate to the project directory:

   ```bash
   cd NEAT-js
   ```

3. Start a python server

  ```python
  python3 -m http.server --port 8000
  ```

4. Open the `http://localhost:8000` file in a web browser to start the simulation.

## Usage

### Controls

- **Train**: Start the training process of birds with the current parameters.
- **Play Best**: View the best-performing bird from the training.
- **Play**: Play the game manually.

### Configuration

Modify parameters such as population size, mutation rate, and crossover probability through the web interface to influence the training process.

## Development

### Key Components

- `bird.js`: Defines the bird class, including its neural network and behaviors.
- `ga.js`: Contains the genetic algorithm for evolving the population of birds.
- `nn.js`: Manages the neural network operations, including prediction and model creation.
- `pipe.js`: Implements pipe obstacles that birds must avoid.
- `sketch.js`: Sets up the p5.js environment and manages game logic and rendering.

### Adding New Features

1. Create a new branch for your feature.
2. Implement your feature with corresponding modifications to the JavaScript files.
3. Test your changes thoroughly.
4. Submit a pull request to the main branch.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
