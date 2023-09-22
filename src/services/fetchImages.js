import AxiosClient from "./AxiosClient";

export default async function fetchImages({
  offset
}) {
  return AxiosClient.get(`v2/list?page=${offset}&limit=20`).then(
    (res) => res.data
  );
}
