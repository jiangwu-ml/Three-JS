import axios from "axios";
export const sayHello = () => {
  const url = "/api/demo/say/hello";
  return axios.get(url, {});
};
