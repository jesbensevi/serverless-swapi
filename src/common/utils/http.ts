import axios from 'axios';

export async function httpGet(url: string): Promise<any> {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log('[ERROR]: ', err);
      return null;
    }
    return null;
  }
}

export async function httpPost(url: string, body: any): Promise<any> {
  try {
    const { data } = await axios.post(url, body);
    return data;
  } catch (err) {
    if (err instanceof Error) {
      console.log('[ERROR]: ', err);
      return null;
    }
    return null;
  }
}
