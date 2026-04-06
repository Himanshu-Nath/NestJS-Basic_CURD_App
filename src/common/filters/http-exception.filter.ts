import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json({
        status: false,
        message: exception.getResponse(),
      });
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: false,
      message: 'Internal server error',
    });
  }
}