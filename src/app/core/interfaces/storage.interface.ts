export interface IStorage extends Storage {
    getItemParsed<T>(key: string): T | null;

    setItemParsed<T>(key: string, value: T): void;
}
