import * as dotenv from 'dotenv';
dotenv.config();

export interface IEnvVars {
  SQL_HOST: string;
  SQL_USER: string;
  SQL_PORT: string;
  SQL_PASSWORD: string;
  SQL_DATABASE: string;
}

const ENVIRONMENT_VARIABLES = {
  SQL_HOST: '',
  SQL_USER: '',
  SQL_PORT: 5432,
  SQL_PASSWORD: '',
  SQL_DATABASE: '',
};

let fetched = false;

const fetchEnvVar = envVarName => {
  ENVIRONMENT_VARIABLES[envVarName] = process.env[envVarName] || ENVIRONMENT_VARIABLES[envVarName] || '';
};

export default function envVars() {
  if (fetched) {
    return ENVIRONMENT_VARIABLES;
  }
  Object.keys(ENVIRONMENT_VARIABLES).map(fetchEnvVar);
  Object.freeze(ENVIRONMENT_VARIABLES);
  fetched = true;
  return ENVIRONMENT_VARIABLES;
}
