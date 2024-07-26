import { HTTPRequest, HTTPResponse } from "@/app/model/Http";
import axios from "axios";

export default class AxiosHttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async request(data: HTTPRequest): Promise<HTTPResponse> {
    try {
      const response = await axios.request({
        url: this.baseUrl + data.url,
        method: data.method,
        data: data.body,
      });
      return {
        statusCode: response.status,
        body: response.data,
      };

    } catch (error: any) {
      return {
        statusCode: error.response?.status,
        body: error.message,
      }
    }
  }
}