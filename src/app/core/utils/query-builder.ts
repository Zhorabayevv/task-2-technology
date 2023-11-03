import { ObjectUtil } from '@app/core/utils/object-util';

export class QueryBuilder {
    public static stringify(url: string, obj: { [key: string]: string }): string {
        if (ObjectUtil.empty(obj)) {
            return url;
        }

        const params = new URLSearchParams(obj).toString();

        return `${url}?${params}`;
    }
}
