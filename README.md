# Martian robots challenge

 This program solves the Martian robots challange, which processes each sequence of instructions and reports the final position of the robots.

### Installing

To run the app

```
npm install
npm start
```

### Instructions to start

Please add the input sequence in the file input.txt, be aware that this input consists of a sequence of robot positions and instructions (two lines per robot). A position consists of two integers specifying the initial coordinates of the robot and an orientation (N, S, E, W), all separated by whitespace on one line. A robot instruction is a string of the letters "L", "R", and "F" on one line.

Example:
```
5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
```

## Running the tests

To run test:

```
npm run test
```

## Built With

* [node](https://nodejs.org/es/) - Is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Babel](https://babeljs.io/) - Is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments
* [Jest](https://jestjs.io/) - Is a delightful JavaScript Testing Framework

## Authors

* **Dayan Rojas** 

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
