
export abstract class CookieUtils {

    public static setCookie(name: string, value: string): void {
        document.cookie = `${name}=${value}; expires=Thu, 18 Dec 2100 12:00:00 UTC; path=/`;
    }

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

    public static isCookieSet(name: string): boolean {
        return this.getCookie(name) != "" && this.getCookie(name) != "NaN";
    }

    public static getCookieAsNumber(name: string): number {
        let  returnValue: number = undefined;
        if (this.isCookieSet(name)) {
            returnValue = parseFloat(this.getCookie(name));
        }
        return returnValue;
    }

}
