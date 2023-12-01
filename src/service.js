import axios from "axios";
export const sayHello = () => {
  const url = "/demo/say/hello";
  return axios.get(url, {});
};
