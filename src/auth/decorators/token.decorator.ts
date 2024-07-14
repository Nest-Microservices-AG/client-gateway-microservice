import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const Token = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  if (!request.token)
    throw new InternalServerErrorException(
      'Something went wrong, token not found in request',
    );

  return request.token;
});
