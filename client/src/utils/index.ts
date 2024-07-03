const errorTypes: Record<string, string> = {
    400: 'Bad Request',
    500: 'Internal Server Error'
};

export class AppError extends Error {
    statusCode: number;
    statusMessage: string;
    constructor(statusCode: number, message?: string) {
        super(message);
        this.statusMessage = errorTypes[statusCode.toString()] || message || 'Ups! Something went wrong.';
        this.statusCode = statusCode;
    }
}