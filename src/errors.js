export class DuplicateUserEmailError extends Error {
    errorCode = "001";

    constructor(reason, data) {
        super(reason);
        this.reason = reason;
        this.data = data;
    }
}