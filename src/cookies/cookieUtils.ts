
/**
 * Class which handels all cookie interactions.
 */
export abstract class CookieUtils {

    /**
     * Sets the value of the given cookie.
     * @param name A cookie name from the Cookie enum found in cookieNames.ts.
     * @param value A value to assign to the specified cookie.
     */
    public static setCookie(name: string, value: string): void {
        document.cookie = `${name}=${value}; expires=Thu, 18 Dec 2100 12:00:00 UTC; path=/`;
    }

    /**
     * Returns the value of a cookie.
     * @param name A cookie name from the Cookie enum found in cookieNames.ts.
     * @returns Returns the value assigned to the specified cookie.
     */
    public static getCookie(name: string): string {
        let value: string = "";
        let cookies: Array<string> = decodeURIComponent(document.cookie).split(";");
        cookies.forEach(cookie => {
            let items: Array<string> = cookie.trim().split("=");
            if (items[0] == name) {
                value = items[1];
            }
        });
        return value;
    }

    /**
     * Checks whether the value assigned to the given cookie is not null / exists.
     * @param name A cookie name from the Cookie enum found in cookieNames.ts.
     * @returns Is a value assigned to the specified cookie?
     */
    public static isCookieSet(name: string): boolean {
        return this.getCookie(name) != "" && this.getCookie(name) != "NaN";
    }

    /**
     * Gets the value of a specified cookie, converts it to a number and returns it.
     * @param name A cookie name from the Cookie enum found in cookieNames.ts.
     * @returns The value of the specified cookie parsed as a number.
     */
    public static getCookieAsNumber(name: string): number {
        let returnValue: number = undefined;
        if (this.isCookieSet(name)) {
            returnValue = parseFloat(this.getCookie(name));
        }
        return returnValue;
    }

}
