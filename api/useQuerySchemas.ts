import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

const DIGITAL_PLANNING_DATA_SCHEMAS_JSON_URL =
  "https://theopensystemslab.github.io/digital-planning-data-schemas";

// TODO: type the version more strictly
const useQuerySchemas = (
  version: string,
  options?: Readonly<Omit<UseQueryOptions<unknown>, "queryKey" | "queryFn">>
) => {
  const fetchFn = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["schemas", version],
    queryFn: () =>
      fetchFn(
        `${DIGITAL_PLANNING_DATA_SCHEMAS_JSON_URL}/${version}/schema.json`
      ),
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
    ...options,
  });
};

export default useQuerySchemas;
