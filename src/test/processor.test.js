
import { processInputFile, createRobots } from '../processor/processor';

test('It should process the file correctly', () => {
    expect(processInputFile("../test/file/input_validation.txt")).toMatchObject({
        gridLimit: {x:5, y:3},
        position: ["1 1 E", "3 2 N", "0 3 W"],
        instruction: ["RFRFRFRF", "FRRFLLFFRRFLL", "LLFFFLFLFL"],
    });
});

test('If an instruction has more than 100 characters, it should process a instrution with only the first 100 characters', () => {
    expect(processInputFile("../test/file/input_validation2.txt")).toMatchObject({
        gridLimit: { x: 5, y: 3 },
        position: ["1 1 E", "3 2 N", "0 3 W"],
        instruction: ["RFRFRFRF", "FRRFLLFFRRFLLFRRFLLFFRRFLLFRRFLLFFRRFLLFRRFLLFFRRFLLFRRFLLFFRRFLLFRRFLLFFRRFLLFRRFLLFFRRFLLFRRFLLFF", "LLFFFLFLFL"],
    });
});

test('If any coordionate is over 50, it should process a maximum value of 50', () => {
    expect(processInputFile("../test/file/input_validation3.txt")).toMatchObject({
        gridLimit: { x: 50, y: 50 },
        position: ["1 1 E", "3 2 N", "0 3 W"],
        instruction: ["RFRFRFRF", "FRRFLLFFRRFLL", "LLFFFLFLFL"],
    });
});


test('It should create a robot', () => {
    const position = ["1 1 E", "3 2 N"]
    const instruction= ["RFRFRFRF", "FRRFLLFFRRFLL"]
    expect(createRobots(position, instruction)).toMatchObject(
        [{
            position: {
                x: 1,
                y: 1
            },
            orientation:"E",
            instructions:["R","F","R","F","R","F","R","F"],
            isAlive: true
        }, {
                position: {
                    x: 3,
                    y: 2
                },
                orientation:"N",
                instructions:["F","R","R","F","L","L","F","F","R","R","F","L","L"],
                isAlive: true
            }]
    );
});