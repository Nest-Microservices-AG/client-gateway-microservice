import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  if (!request.user)
    throw new InternalServerErrorException(
      'Something went wrong, user not found in request',
    );

  return request.user;
});
