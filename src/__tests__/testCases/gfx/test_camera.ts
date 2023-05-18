import { GameObject } from "../../../gameObjects/gameObject.js";
import { Camera } from "../../../gfx/camera.js";
import { Test } from "../../testing.js";

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
        globalThis.innerWidth = 100;
        globalThis.innerHeight = 100;
        let camera: Camera = new Camera();
        let objToTrack: GameObject = new Camera();
        objToTrack.setX(100);
        objToTrack.setY(100);
        camera.trackObject(objToTrack);
        camera.update();
        Test.assertEqual(camera.getX(), objToTrack.getX() / 2);
        Test.assertEqual(camera.getY(), objToTrack.getY() / 2);
    }

}
