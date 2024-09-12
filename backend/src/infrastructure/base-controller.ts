import { Request, Response } from 'express';

/**
 * Base controller class that all controllers should extend.
 *
 * This class provides common functionality for handling requests, including error handling.
 */
export class BaseController {

    /**
     * Handles a request by executing the provided callback function.
     * If an error occurs during the execution of the callback,
     * the error is logged and a 500 response is sent to the client.
     *
     * @param res Response object, used to send unhandled errors to the client.
     * @param callback Callback function that performs the request handling logic.
     */
    async handleRequest(res: Response, callback: () => Promise<void>) {
        try {
            await callback();
        } catch (error) {
            console.error(error);
            res.status(500).send('An error occurred while processing the request.');
        }
    }
}