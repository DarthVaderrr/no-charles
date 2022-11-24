type Handler<T> = (r: T) => void;
type RequestHandler = (req: Request, id?: string) => void;
type ResponseHandler = Handler<Response>;
type ErrorHandler = Handler<Response | Error>;

const nativeFetch = fetch;

export default function fetchHook({
    onRequest,
    onResponse,
    onError,
}: {
    onRequest: (p: { request: Request, handler: RequestHandler }) => void;
    onResponse: (p: {
        response: Response,
        modifiedRequest: Request,
        originRequest: Request,
        handler: ResponseHandler,
        requestId?: string
    }) => void;
    onError: (p: {
        error: Error,
        modifiedRequest: Request,
        originRequest: Request,
        handler: ErrorHandler,
        requestId?: string
    }) => void;
}) {
    const fetchWithHook: typeof nativeFetch = async function (
        input,
        init?
    ): Promise<Response> {
        return new Promise(async (resolve, reject) => {
            const responseHandler: ResponseHandler = (modifiedResponse) => {
                resolve(modifiedResponse);
            };
            const errorHandler: ErrorHandler = (res) => {
                if (res instanceof Response) resolve(res);
                else reject(res);
            };
            const requestHandler: RequestHandler = async (modifiedRequest, requestId) => {
                const originRequest = new Request(input, init)
                try {
                    const originResponse = await nativeFetch(modifiedRequest);
                    onResponse({
                        response: originResponse,
                        originRequest,
                        modifiedRequest,
                        handler: responseHandler,
                        requestId
                    });
                } catch (error) {
                    onError({
                        error,
                        originRequest,
                        modifiedRequest,
                        handler: errorHandler,
                        requestId
                    });
                }
            };
            onRequest({
                request: new Request(input, init),
                handler: requestHandler
            });
        });
    };
    window.fetch = fetchWithHook;
}

export const stop = () => {
    window.fetch = nativeFetch;
};