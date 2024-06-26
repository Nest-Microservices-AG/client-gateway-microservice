import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Catch(RpcException)
export class RcpCustomExceptionFilter
  implements RpcExceptionFilter<RpcException>
{
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const context = host.switchToHttp();
    const responseHttp = context.getResponse();

    const rpcError = exception.getError();

    if (rpcError.toString().includes('Empty response')) {
      return responseHttp.status(500).json({
        status: 500,
        message: rpcError
          .toString()
          .substring(0, rpcError.toString().indexOf('(') - 1),
      });
    }

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;
      return responseHttp.status(status).json(rpcError);
    }

    return responseHttp.status(400).json({
      status: 400,
      message: rpcError,
    });
  }
}
