import AxiosHttpClient from "./client";

const apiFactory = (baseUrl: string) => {
  return new AxiosHttpClient(baseUrl);
};

export default apiFactory;