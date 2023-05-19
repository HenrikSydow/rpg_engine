import { GameObject } from "../../../gameObjects/gameObject.js";
import { Camera, ITrackable } from "../../../gfx/camera.js";
import { Test } from "../../testing.js";

class Trackable implements ITrackable {
    public x: number = 100;
    public y: number = 100;

    getCenter(): number[] {
        return [this.x, this.y];
    }
}

export class Test_Camera {

    public Test_CameraShiftLocation(): void {
        let camera: Camera = new Camera();
        let newX: number = 100;
        let newY: number = 100;
        camera.shiftLocation(newX, newY);
        Test.assertEqual(camera.getX(), newX);
        Test.assertEqual(camera.getY(), newY);
    }

    public Test_CameraTracksObject(): void {
        // set the windows inner width:
        globalThis.innerWidth = 1920;
        globalThis.innerHeight = 1080;
        let camera: Camera = new Camera();
        let objToTrack: Trackable = new Trackable();
        camera.trackObject(objToTrack);
        camera.update();
        Test.assertEqual(camera.getX(), -(globalThis.innerWidth / 2 - objToTrack.x));
        Test.assertEqual(camera.getY(), -(globalThis.innerHeight / 2 - objToTrack.y));
    }

}
