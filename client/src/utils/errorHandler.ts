import { AxiosError } from "axios";
import { AppError } from ".";

export const requestErrorHandler = (error: AxiosError) => {
    const status = error.response?.status;
    const message = (error.response?.data as Record<string, unknown>).message || error.message;
    return new AppError(status as number, message as string);
};