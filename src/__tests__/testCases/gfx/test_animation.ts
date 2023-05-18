import { Animation } from "../../../gfx/animation.js";
import { Test } from "../../testing.js";


class MockImage {}

export class Test_Animation {

    public Test_AnimationCyclesAllFrames(): void {
        if (Image == null) {  // sets a mock image
            var Image = MockImage as any;
        }
        let frames: Array<HTMLImageElement> = [
            new Image(0),
            new Image(1),
            new Image(2),
        ];
        let animation: Animation = new Animation(frames);
        animation.setFrameTime(0);  // makes the frame change instantly upon update call
        frames.forEach( frame => {
            Test.assertEqual(frame, animation.getCurrentFrame());
            animation.update();
        });
    }

}
