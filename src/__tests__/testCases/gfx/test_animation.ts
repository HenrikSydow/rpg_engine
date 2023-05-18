import { Animation } from "../../../gfx/animation.js";
import { Timer } from "../../../timer.js";
import { Test } from "../../testing.js";


class MockImage {
    public id: number;
    constructor(id) {
        this.id = id;
    }
}

export class Test_Animation {

    public Test_AnimationCyclesAllFrames(): void {
        var Image = MockImage as any;
        let frames: Array<HTMLImageElement> = [
            new Image(),
            new Image(),
            new Image(),
        ];
        let animation: Animation = new Animation(frames);
        animation.setFrameTime(0);  // makes the frame change instantly upon update call
        frames.forEach( frame => {
            Test.assertEqual(frame, animation.getCurrentFrame());
            animation.update();
        });
    }

    public Test_FramesCycleAfterFrameTime(): void {
        var Image = MockImage as any;
        let frames: Array<HTMLImageElement> = [
            new Image(),
            new Image(),
            new Image(),
        ];
        let animation: Animation = new Animation(frames);
        let frameTime: number = 10;
        let timer: Timer = new Timer();
        animation.setFrameTime(frameTime);
        frames.forEach( frame => {
            Test.assertEqual(frame, animation.getCurrentFrame());
            timer.start();
            while (timer.getElapsedTime() < frameTime) {};
            animation.update();
        });
    }

    public Test_AnimationTracksPlayCount(): void {
        var Image = MockImage as any;
        let animations: Array<Animation> = [
            new Animation([new Image()]),
            new Animation([new Image(), new Image()]),
            new Animation([new Image(), new Image(), new Image(), new Image()]),
        ];
        animations.forEach( animation => {
            animation.setFrameTime(0);  // makes the frame change instantly upon update call
            for (let playCount: number = 0; playCount < 5; playCount++) {
                Test.assertEqual(playCount, animation.getPlayCount());
                animation.getFrames().forEach( () => animation.update() );
            }
        });
    }

}
