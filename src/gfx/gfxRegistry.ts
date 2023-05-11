
enum FileType {
    PNG     = ".png",
    JPG     = ".jpg",
    JPEG    = ".jpeg",
    GIF     = ".gif"
}

/**
 * This class defines and loads all graphics resources accessible by the engine.
 */
export abstract class GfxRegistry {

    // Define graphics resources to be loaded HERE! This example shows how to load
    // three png frames from a folder called "a_folder".
    // public static readonly EXAMPLE_ANIMATION_FRAMES: Array<HTMLImageElement> = GfxRegistry.loadAnimationArray("a_folder", FileType.PNG, 3);

    /**
     * Loads an array of images / frames, which can be used to construct animations.
     * File names have to look like this: 0.png, 1.png, ..., n.png;
     * You need to specify the exact count of images you want to load.
     * @param folder A folder path.
     * @param type A file type. (Like ".png" or ".jpg")
     * @param count The number of files to load.
     * @returns An Array of HTMLImageElements.
     */
    private static loadAnimationArray(folder: string, type: string, count: number): Array<HTMLImageElement> {
        let gfxResource: Array<HTMLImageElement> = [];
        for (let i: number = 0; i < count; i++) {
            let tempResource: HTMLImageElement = new Image();
            tempResource.src = folder + "/" + i.toString() + type;
            gfxResource.push(tempResource);
        }
        return gfxResource;
    }

}
