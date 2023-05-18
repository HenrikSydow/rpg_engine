import { Hitbox } from "../../../physics/hitboxes/hitbox.js";
import { Circle } from "../../../physics/shapes/circle.js";
import { Rectangle } from "../../../physics/shapes/rectangle.js";
import { Test } from "../../testing.js";


export class Test_Hitbox {

    public Test_RectRectIntersects(): void {
        let testCases: Array<Array<Hitbox>> = [
            [
                new Hitbox(0, 0, [new Rectangle(0, 0, 100, 100)]),
                new Hitbox(0, 0, [new Rectangle(0, 0, 100, 100)])
            ],
            [
                new Hitbox(0, 0, [new Rectangle(0, 0, 100, 100)]),
                new Hitbox(0, 0, [new Rectangle(50, 50, 100, 100)])
            ],
            [
                new Hitbox(-50, -50, [new Rectangle(0, 0, 100, 100)]),
                new Hitbox(0, 0, [new Rectangle(0, 0, 100, 100)])
            ],
            [
                new Hitbox(10, 10, [new Rectangle(0, 0, 80, 80)]),
                new Hitbox(0, 0, [new Rectangle(0, 0, 100, 100)])
            ],
            [
                new Hitbox(0, 0, [
                    new Rectangle(-10, -10, 5, 5),
                    new Rectangle(10, 10, 10, 10)
                ]),
                new Hitbox(0, 0, [new Rectangle(0, 0, 100, 100)])
            ],
        ];

        testCases.forEach(testCase => {
            Test.assertTrue(testCase[0].intersects(testCase[1]));
        });
    }

    public Test_RectRectDoNotIntersect(): void {
        let testCases: Array<Array<Hitbox>> = [
            [
                new Hitbox(0, 0, [new Rectangle(0, 0, 10, 10)]),
                new Hitbox(100, 100, [new Rectangle(0, 0, 1, 1)]),
            ],
            [
                new Hitbox(-20, -20, [new Rectangle(0, 0, 10, 10)]),
                new Hitbox(0, 0, [new Rectangle(0, 0, 10, 10)]),
            ],
            [
                new Hitbox(-20, -20, [
                    new Rectangle(0, 0, 10, 10),
                    new Rectangle(-300, 0, 200, 200),
                ]),
                new Hitbox(0, 0, [new Rectangle(0, 0, 10, 10)]),
            ],
            [
                new Hitbox(0, 0, [new Rectangle(-6, 0, 10, 10)]),
                new Hitbox(0, 0, [new Rectangle(9, 0, 10, 10)]),
            ],
        ];

        testCases.forEach(testCase => {
            Test.assertFalse(testCase[0].intersects(testCase[1]));
        });
    }

    public Test_CircleCircleIntersects(): void {
        let testCases: Array<Array<Hitbox>> = [
            [
                new Hitbox(0, 0, [new Circle(0, 0, 100)]),
                new Hitbox(0, 0, [new Circle(0, 0, 100)])
            ],
            [
                new Hitbox(10, 20, [new Circle(0, 0, 100)]),
                new Hitbox(-10, 0, [new Circle(0, 0, 100)])
            ],
            [
                new Hitbox(0, 0, [
                    new Circle(-100, -50, 5),
                    new Circle(0, 0, 10)
                ]),
                new Hitbox(0, 0, [new Circle(0, 0, 100)])
            ],
            [
                new Hitbox(0, 0, [new Circle(0, 0, 100)]),
                new Hitbox(0, 0, [new Circle(0, 0, 1000)])
            ],
        ];

        testCases.forEach(testCase => {
            Test.assertTrue(testCase[0].intersects(testCase[1]));
        });
    }

    public Test_CircleCircleDoNotIntersect(): void {
        let testCases: Array<Array<Hitbox>> = [
            [
                new Hitbox(0, 0, [new Circle(0, 0, 100)]),
                new Hitbox(200, 0, [new Circle(0, 0, 100)])
            ],
            [
                new Hitbox(0, 0, [new Circle(0, 0, 100)]),
                new Hitbox(-200, 0, [new Circle(0, 0, 100)])
            ],
            [
                new Hitbox(0, 0, [new Circle(-200, 0, 100)]),
                new Hitbox(0, 0, [new Circle(0, 0, 100)])
            ],
            [
                new Hitbox(0, 0, [
                    new Circle(-200, 0, 100),
                    new Circle(0, -200, 100)
                ]),
                new Hitbox(0, 0, [
                    new Circle(-50, 0, 100),
                    new Circle(30, 0, 100)
                ])
            ],
        ];

        testCases.forEach(testCase => {
            Test.assertFalse(testCase[0].intersects(testCase[1]));
        });
    }

}
