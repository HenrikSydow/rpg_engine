
export class AssertionError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, AssertionError.prototype);
    }
}

export abstract class Test {

    public static assertEqual(objectOne: any, objectTwo: any): void {
        if (objectOne != objectTwo) {
            throw new AssertionError(`${objectOne} != ${objectTwo}`);
        }
    }

    public static assertTrue(object: any) {
        if (!object) {
            throw new AssertionError(`${object} was expected to be true.`);
        }
    }

    public static assertFalse(object: any) {
        if (object) {
            throw new AssertionError(`${object} was expected to be false.`);
        }
    }

}
