import 'dotenv/config';
import * as joi from 'joi';

interface EnvironmentVars {
  PORT: number;
  PRODUCTS_MICROSERVICE_HOST: string;
  PRODUCTS_MICROSERVICE_PORT: number;
  ORDERS_MICROSERVICE_HOST: string;
  ORDERS_MICROSERVICE_PORT: number;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),

    ORDERS_MICROSERVICE_HOST: joi.string().required(),
    ORDERS_MICROSERVICE_PORT: joi.number().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config valudation error: ${error.message}`);
}

const environmentsVariables: EnvironmentVars = value;

export const envs = {
  port: environmentsVariables.PORT,
  productsMicroserviceHost: environmentsVariables.PRODUCTS_MICROSERVICE_HOST,
  productsMicroservicePort: environmentsVariables.PRODUCTS_MICROSERVICE_PORT,
  ordersMicroserviceHost: environmentsVariables.ORDERS_MICROSERVICE_HOST,
  ordersMicroservicePort: environmentsVariables.ORDERS_MICROSERVICE_PORT,
};
