import axios, { AxiosPromise } from "axios";
import { useQuery } from "react-query";

const API_URL = 'https://dadosabertos.camara.leg.br/api/v2';

const fetchData = async () => {
  const response = await axios.get(`${API_URL}/deputados/${'220593'}/despesas?ano=2023&mes=${2}`)
  return response.data;
}

export function useDeputyData() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: ['deputyExpense']
  })
  return query;
}