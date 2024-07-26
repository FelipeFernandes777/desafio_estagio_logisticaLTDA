import { getResponseApi } from "../utils/getResponseApi";
import { CaractersResponseDTO } from "./dto/get-caracters-response-dto";

export default class RequestServices {
  private url: string;
  constructor(url: string) {
    this.url = url;
  }

  public async getCaracters(): Promise<CaractersResponseDTO> {
    return await getResponseApi(this.url);
  }

  

}