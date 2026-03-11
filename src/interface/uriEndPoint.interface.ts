import { AxiosRequestHeaders } from 'axios';

export interface UriEndPoint {
  uri: string;
  method: string;
  version: string;
  headerProps?: AxiosRequestHeaders;
  host?: string;
}
