//import axios from "axios";

export class HttpClient {
  /* async get(url: string) {
    const { data, status } = await axios.get(url);
    return { data, status };
  } */

  async get(url: string) {
    const resp = await fetch(url);
    const data = resp.json();
    return { data: data, status: resp.status };
  }
}
