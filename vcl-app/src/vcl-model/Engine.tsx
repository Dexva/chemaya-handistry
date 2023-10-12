function EngineTimestep() {
    // Interpreter --------
    //      Receive raw gesture, determine binary Hold/Not Hold
    //      Receive raw position, determine hand position and rotation
    // Searcher --------
    //      Look through entity list, and determine intersecting Entities with: 1) The hand position 2) The object with the highest z-index's hitcircle, if it exists
    // Stator --------
    //      Given all the above information, determine the states of all Entities found by the Searcher function
    
}

type Point = {
    x: number,
    y: number
}
// Returns the distance between two Points.
function dist(a: Point, b: Point): number {
    return Math.sqrt(Math.pow(b.x - a.x,2) + Math.pow(b.y - a.y,2));
}

export default EngineTimestep;