import { AssetError } from '../types/assets';

export class ErrorHandler {
  private static instance: ErrorHandler;
  private errorListeners: Set<(error: AssetError) => void> = new Set();

  private constructor() {}

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  public handleError(error: unknown): AssetError {
    const assetError = this.normalizeError(error);
    this.notifyListeners(assetError);
    return assetError;
  }

  public addErrorListener(listener: (error: AssetError) => void): () => void {
    this.errorListeners.add(listener);
    return () => this.errorListeners.delete(listener);
  }

  private notifyListeners(error: AssetError): void {
    this.errorListeners.forEach(listener => listener(error));
  }

  private normalizeError(error: unknown): AssetError {
    if (error instanceof Error) {
      return {
        code: 'ASSET_ERROR',
        message: error.message,
        details: error.stack
      };
    }

    if (typeof error === 'string') {
      return {
        code: 'ASSET_ERROR',
        message: error
      };
    }

    return {
      code: 'UNKNOWN_ERROR',
      message: 'An unknown error occurred'
    };
  }
}

export const errorHandler = ErrorHandler.getInstance();