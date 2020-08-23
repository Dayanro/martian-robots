import { processInstructions, turnsLeft, turnsRight, moveForward, checkBoundaries, checkScents, printRobotOutput } from './../robot/robot.js';

test('It should process the instructions correctly', () => {
    const robot = {
        position: {
            x: 1,
            y: 1
        },
        orientation: "E",
        instructions: ["R", "F", "R", "F", "R", "F", "R", "F"],
        isAlive: true
    }
    const gridLimit = { x: 5, y: 3 }
    const scents = []
    expect(processInstructions (robot, gridLimit, scents)).toMatchObject(
        {
            position: {
                x: 1,
                y: 1
            },
            orientation: "E",
            instructions: ["R", "F", "R", "F", "R", "F", "R", "F"],
            isAlive: true
        }
    );
});

test('It should procees the instructions correctly despite a scent was found', () => {
    const robot = {
        position: {
            x: 0,
            y: 3
        },
        orientation: "W",
        instructions: ["L","L","F","F","F","L","F","L","F","L"],
        isAlive: true
    }
    const gridLimit = { x: 5, y: 3 }
    const scents = [{ x: 3, y: 3 }]
    expect(processInstructions(robot, gridLimit, scents)).toMatchObject(
        {
            position: {
                x: 2,
                y: 3
            },
            orientation: "S",
            instructions: ["L", "L", "F", "F", "F", "L", "F", "L", "F", "L"],
            isAlive: true
        }
    );
});

test('It should process the instructions of turn left correctly', () => {
    expect(turnsLeft("N")).toMatchObject({ orientation: "W" });
    expect(turnsLeft("E")).toMatchObject({ orientation: "N" });
    expect(turnsLeft("S")).toMatchObject({ orientation: "E" });
    expect(turnsLeft("W")).toMatchObject({ orientation: "S" });
});

test('It should process the instructions of turn right correctly', () => {
    expect(turnsRight("N")).toMatchObject({ orientation: "E" });
    expect(turnsRight("E")).toMatchObject({ orientation: "S" });
    expect(turnsRight("S")).toMatchObject({ orientation: "W" });
    expect(turnsRight("W")).toMatchObject({ orientation: "N" });
});

test('It should process the instructions of move forward correctly', () => {
    const positionX = 1
    const positionY = 1
    const gridLimit = { x: 5, y: 3 }
    const scents = []
    expect(moveForward("N", positionX, positionY, gridLimit, scents)).toMatchObject({ position: { x: 1, y: 2 } });
    expect(moveForward("E", positionX, positionY, gridLimit, scents)).toMatchObject({ position: { x: 2, y: 1 } });
    expect(moveForward("S", positionX, positionY, gridLimit, scents)).toMatchObject({ position: { x: 1, y: 0 } });
    expect(moveForward("W", positionX, positionY, gridLimit, scents)).toMatchObject({ position: { x: 0, y: 1 } });
    expect(moveForward("Z", positionX, positionY, gridLimit, scents)).toMatchObject({ position: { x: 1, y: 1 } });
});



test('It should check the bounderies correctly', () => {
    const positionX = 3
    const positionY = 4
    const gridLimit = { x: 5, y: 3 }
    expect(checkBoundaries("N", positionX, positionY, gridLimit)).toBe(true);
    expect(checkBoundaries("E", positionX, positionY, gridLimit)).toBe(false);
    expect(checkBoundaries("S", positionX, positionY, gridLimit)).toBe(true);
    expect(checkBoundaries("W", positionX, positionY, gridLimit)).toBe(false);
    expect(checkBoundaries("Z", positionX, positionY, gridLimit)).toBe(false);
});

test('It should check the scents correctly', () => {
    const scents = [{ x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }]
    const positionX = 3
    const positionY = 3
    expect(checkScents(scents, positionX, positionY)).toBe(true);
});

test('It should print the output in the correct format', () => {
    const positionX = 3
    const positionY = 3
    const orientation= "N"
    const isAlive= false
    expect(printRobotOutput(positionX, positionY, orientation, isAlive)).toBe("3 3 N LOST")
});
