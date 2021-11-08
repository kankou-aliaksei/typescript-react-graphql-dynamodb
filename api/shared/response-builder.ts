import { Response, ResponseWithResult } from './api.interfaces';

export class ResponseBuilder {
  public static badRequestError(errorMessage: string): Response {
    return {
      error: {
        code: 'BAD_REQUEST',
        message: errorMessage
      },
      success: false
    };
  }

  public static internalServerError(errorMessage: string): Response {
    return {
      error: {
        code: 'SERVER_ERROR',
        message: errorMessage
      },
      success: false
    };
  }

  public static notFound(): Response {
    return {
      error: {
        code: 'NOT_FOUND',
        message: 'An item not found'
      },
      success: false
    };
  }

  public static ok(): Response {
    return {
      success: true
    };
  }

  public static okWithResult<T>(result: T): ResponseWithResult<T> {
    return {
      result,
      success: true
    };
  }
}
