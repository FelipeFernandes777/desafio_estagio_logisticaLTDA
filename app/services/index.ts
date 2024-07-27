import { HTTPResponse } from "../model/Http";
import { CaractersResponseDTO } from "./dto/get-caracters-response-dto";
import apiFactory from "./Http/factory";

export default class RequestServices {

  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async listCaracters(): Promise<HTTPResponse<CaractersResponseDTO[]>> {
    return await apiFactory(this.baseUrl).request({
      method: 'get',
      url: this.baseUrl
    });
  }
}