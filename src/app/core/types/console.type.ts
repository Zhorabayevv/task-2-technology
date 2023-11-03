export type TypeConsole = {
    (message?: unknown, ...optionalParams: unknown[]): void;
    (...data: unknown[]): void;
};
