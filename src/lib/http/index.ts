'use client';

import Axios, { AxiosPromise, AxiosRequestHeaders } from 'axios';
import { Cookies } from 'react-cookie';

import { UriEndPoint } from '@/interface/uriEndPoint.interface';

interface CallAxiosInput {
  uriEndPoint: UriEndPoint;
  pathParams?: PathParams;
  query?: QueryParams;
  body?: BodyParams;
  apiHostUrl?: string;
  multipart?: boolean;
}

interface CallApiProps {
  uriEndPoint: UriEndPoint;
  pathParams?: PathParams;
  query?: QueryParams;
  body?: BodyParams;
  apiHostUrl?: string;
  mock?: boolean;
  multipart?: boolean;
}

interface AxiosError {
  response?: {
    data: { message: string };
    status: number;
  };
}

Axios.defaults.withCredentials = true;

export const hostname = () => {
  return process.env.NEXT_PUBLIC_DEPLOYMENT_URL + '/api';
};

export const cookies = new Cookies();

const hostUrl = hostname();

interface PathParams {
  [key: string]: string;
}

interface BodyParams {
  [key: string]: string | number | boolean | null | object | Array<unknown>;
}

interface QueryParams {
  [key: string]: string;
}

export const makeUrl = (
  {
    uri,
    pathParams,
    query,
    version,
  }: {
    uri: string;
    pathParams?: PathParams;
    query?: QueryParams;
    version: string;
    method: string;
    headerProps?: AxiosRequestHeaders;
  },
  host: string | undefined,
): string => {
  const params = new URLSearchParams();
  if (query) {
    Object.keys(query).forEach((key) => params.append(key, query[key]));
  }
  return `${host || hostUrl}${version}${uri
    .split('/')
    .map((param) =>
      param.charAt(0) === ':'
        ? encodeURIComponent(pathParams?.[param.slice(1)] || '')
        : param,
    )
    .join('/')}${query ? `?${params.toString()}` : ''}`;
};

export const getDefaultHeaders = (
  multipart: boolean,
): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': multipart ? 'multipart/form-data' : 'application/json',
  };

  const authToken = cookies.get('authorization');
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  return headers;
};

export const getDefaultCookies = () => ({
  Cookie: `accessToken=Bearer ${cookies.get('accessToken') || ''}`,
  'Content-Type': 'application/json',
});

const createAxiosRequest = ({
  uriEndPoint,
  pathParams,
  query,
  body,
  apiHostUrl,
  multipart,
}: CallAxiosInput): AxiosPromise => {
  const url = makeUrl(
    { ...uriEndPoint, pathParams, query },
    apiHostUrl || window.location.origin,
  );

  const headers = getDefaultHeaders(multipart ?? false);
  return Axios({
    method: uriEndPoint.method,
    url,
    withCredentials: true,
    headers,
    data: body || {},
  });
};

export async function callApi<ResponseType>({
  uriEndPoint,
  pathParams,
  query,
  body,
  apiHostUrl,
  mock,
  multipart,
}: CallApiProps): Promise<ResponseType> {
  const apiCall = mock ? callMockios : createAxiosRequest;

  try {
    const response = await apiCall({
      uriEndPoint,
      pathParams,
      query,
      body,
      apiHostUrl,
      multipart,
    });

    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : (error as AxiosError)?.response?.data?.message || 'An error occurred';
    const statusCode = (error as AxiosError)?.response?.status || 500;
    return await Promise.reject({ statusCode, errorMessage });
  }
}

const callMockios = ({
  uriEndPoint,
  pathParams,
  query,
  body,
  multipart,
}: CallAxiosInput) =>
  Axios({
    method: uriEndPoint.method,
    url: makeUrl(
      { ...uriEndPoint, pathParams, query },
      `${window.location.protocol}//${window.location.hostname}:3030`,
    ),
    withCredentials: true,
    headers: {
      ...getDefaultHeaders(multipart ?? false),
      ...uriEndPoint.headerProps,
    },
    data: body || {},
  });
