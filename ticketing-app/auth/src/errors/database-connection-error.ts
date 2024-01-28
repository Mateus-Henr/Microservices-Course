export default class DatabaseConnectionError extends Error {
    private reason = 'Error connecting to database';

    constructor() {
        super();

        // Because we are using ts, we have to do the following:
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    public getReason(): string {
        return this.reason;
    }
};
