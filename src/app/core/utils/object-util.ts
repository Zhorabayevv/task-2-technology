export class ObjectUtil {
    public static empty(o: object | undefined): boolean {
        if (!o) return true;

        if (typeof o === 'object' && o !== null) {
            for (const i in o) return false;

            return true;
        }

        return false;
    }

    /*
     Example:
     const test = {
            a: 0,
            b: null,
            c: '',
            y: undefined,
            d: {
                e: {
                    ttt: {
                        r: 4,
                        uuu: null,
                        iii: {
                            hh: undefined,
                            f: {
                                ccc: 3
                            }
                        }
                    },
                },
                f: null,
            },
            g: {
                h: null,
            },
        };
    */
    public static removeEmpty(o: object): object {
        if (typeof o === 'object' && o !== null) {
            return JSON.parse(
                JSON.stringify(
                    JSON.parse(JSON.stringify(o), (_, value) => (value === null || value === '' ? undefined : value)),
                ),
                (_, value) => (typeof value === 'object' && Object.keys(value).length === 0 ? undefined : value),
            );
        }

        return {};
    }

    public static parse<T>(value: string | null): T | null {
        if (!value) {
            return null;
        }

        return JSON.parse(value) as T;
    }

    public static getEnum<T>(d: string | undefined): T | undefined {
        if (!d) return undefined;

        return d as T;
    }

    public static getEnums<T>(d: Array<string> | undefined): T[] {
        if (!d) return [];

        const res = [];

        for (const en of d) {
            const enu = ObjectUtil.getEnum<T>(en);

            if (enu !== undefined) {
                res.push(enu);
            }
        }

        return res;
    }
}
