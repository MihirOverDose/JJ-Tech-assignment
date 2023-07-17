import { createApiBuilderFromCtpClient as createImportApiBuilderFromCtpClient } from "@commercetools/importapi-sdk";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from "@commercetools/sdk-client-v2";
import fetch from "node-fetch";
import { ApiRoot, ImportApiRoot } from "../types/global";
import { Prefix, Config, readConfig } from "../utils/config";

type ctpClientBuilderType = {
  host: string;
  projectKey: string;
  clientId: string;
  clientSecret: string;
  scopes?: string[];
  authUrl: string;
};

const ctpCliendBuilderOfEnv = ({
  host,
  projectKey,
  clientId,
  clientSecret,
  authUrl,
}: ctpClientBuilderType) => {
  // Configure authMiddlewareOptions
  const authMiddlewareOptions: AuthMiddlewareOptions = {
    host: authUrl,
    projectKey: projectKey,
    credentials: {
      clientId: clientId,
      clientSecret: clientSecret,
    },

    fetch,
  };
  // Configure httpMiddlewareOptions
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: host,
    fetch,
  };

  return new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();
};

const createApiClient = (): ApiRoot => {
  try {
    const devConfig = readConfig("DEV");
    const client = ctpCliendBuilderOfEnv({
      host: devConfig.host,
      authUrl: devConfig.oauthHost,
      clientId: devConfig.clientId,
      clientSecret: devConfig.clientSecret,
      projectKey: devConfig.projectKey,
    });
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: devConfig.projectKey,
    });
    return apiRoot;
  } catch (err) {
    throw new Error("Error In building The Client Builder (Dev Env)");
  }
};

const createImportApiClient = (): ImportApiRoot => {
  try {
    const importConfig = readConfig("IMPORT");
    const client = ctpCliendBuilderOfEnv({
      host: importConfig.host,
      authUrl: importConfig.oauthHost,
      clientId: importConfig.clientId,
      clientSecret: importConfig.clientSecret,
      projectKey: importConfig.projectKey,
      scopes: importConfig.scopes,
    });
    const apiRoot = createImportApiBuilderFromCtpClient(
      client
    ).withProjectKeyValue({
      projectKey: importConfig.projectKey,
    });
    return apiRoot;
  } catch (err) {
    throw new Error("Error In building The Client Builder (Import Env)");
  }
};

const createStoreApiClient = (): ApiRoot => {
  try {
    const storeConfig = readConfig("STORE");
    const client = ctpCliendBuilderOfEnv({
      host: storeConfig.host,
      authUrl: storeConfig.oauthHost,
      clientId: storeConfig.clientId,
      clientSecret: storeConfig.clientSecret,
      projectKey: storeConfig.projectKey,
      scopes: storeConfig.scopes,
    });
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: storeConfig.projectKey,
    });
    return apiRoot;
  } catch (err) {
    throw new Error("Error In building The Client Builder (Store Env)");
  }
};

const createMyApiClient = (): ApiRoot => {
  try {
    const myConfig = readConfig("ME");
    const client = ctpCliendBuilderOfEnv({
      host: myConfig.host,
      authUrl: myConfig.oauthHost,
      clientId: myConfig.clientId,
      clientSecret: myConfig.clientSecret,
      projectKey: myConfig.projectKey,
    });
    const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: myConfig.projectKey,
    });
    return apiRoot;
  } catch (err) {
    throw new Error("Error In building The Client Builder (My Env)");
  }
};

export const apiRoot: ApiRoot = createApiClient();
export const importApiRoot: ImportApiRoot = createImportApiClient();
export const storeApiRoot: ApiRoot = createStoreApiClient();
export const myApiRoot: ApiRoot = createMyApiClient();
