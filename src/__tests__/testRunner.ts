import { Test_Animation } from "./testCases/gfx/test_animation.js";
import { Test_Camera } from "./testCases/gfx/test_camera.js";
import { Test_Hitbox } from "./testCases/physics/test_hitbox.js";

export abstract class TestRunner {
    
    private static testClasses = [
        Test_Hitbox,
        Test_Camera,
        Test_Animation
    ];

    private static colorTextRed: String = "[31m";
    private static colorTextGreen: String = "[32m";
    private static colorTextYellow: String = "[33m";
    private static colorTextDefault: String = "[0m";
    private static boldText: String = "[1m";

    private static getMethods(object: Object): string[] {
        let properties: Set<string> = new Set();
        let currentObj: Object = object;
        do {
            Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
        } while ((currentObj = Object.getPrototypeOf(currentObj)))
        return [...properties.keys()].filter(item => typeof object[item] === 'function')
    }
    
    public static runAll(): void {
        let allClassesTestCount: number = 0;
        let allClassesTestFails: number = 0;

        TestRunner.testClasses.forEach(testClass => {
            let testInstance = new testClass();
            let methods: Array<string> = this.getMethods(testInstance);
            let totalTests: number = 0;
            let failedTests: number = 0;
            console.log("\n".padEnd(51, "-"));
            console.log(`Executing ${this.colorTextYellow}${testInstance.constructor.name}${this.colorTextDefault}:`);
            methods.forEach(testMethod => {
                if (testMethod.match("Test_.+")) {
                    totalTests++;
                    let result: boolean = TestRunner.runMethod(testInstance, testMethod);
                    if (!result)
                        failedTests++;
                }
            });
            console.log();
            if (failedTests != 0) {
                console.log(`${this.colorTextYellow}${failedTests}${this.colorTextDefault} of ${this.colorTextYellow}${totalTests}${this.colorTextDefault} tests ${this.colorTextRed}${this.boldText}failed${this.colorTextDefault}`);
            } else {
                console.log(`${this.colorTextYellow}${totalTests}${this.colorTextDefault} of ${this.colorTextYellow}${totalTests}${this.colorTextDefault} tests ${this.colorTextGreen}${this.boldText}passed${this.colorTextDefault}`)
            }
            console.log("".padEnd(50, "-"));

            allClassesTestCount += totalTests;
            allClassesTestFails += failedTests;
        });

        console.log("\n".padEnd(51, "="));
        console.log(`Executed a total of ${this.colorTextYellow}${allClassesTestCount} tests${this.colorTextDefault}:`);
        console.log(`   ${this.colorTextYellow}${allClassesTestCount - allClassesTestFails} tests${this.colorTextDefault} ${this.colorTextGreen}${this.boldText}passed${this.colorTextDefault}`);
        if (allClassesTestFails > 0)
            console.log(`   ${this.colorTextYellow}${allClassesTestFails} tests${this.colorTextDefault} ${this.colorTextRed}${this.boldText}failed${this.colorTextDefault}`);
    }

    private static runMethod(instance, methodName: string): boolean {
        let padding: number = 40;
        let succeeded: boolean = false;
        try {
            instance[methodName].apply(instance);
            succeeded = true;
            console.log(`   - ${methodName}`.padEnd(padding) + ` ${this.colorTextGreen}${this.boldText}passed${this.colorTextDefault}`);
        } catch (error) {
            console.log(`   - ${methodName}`.padEnd(padding) + ` ${this.colorTextRed}${this.boldText}failed${this.colorTextDefault}`);
            console.log(`       Error: ${error.message}`);
        }
        return succeeded;
    }

}

TestRunner.runAll();
