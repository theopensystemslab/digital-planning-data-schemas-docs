import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

// TODO set back to gh-pages once @next folder is fixed
const DIGITAL_PLANNING_DATA_SCHEMAS_JSON_URL =
  "https://raw.githubusercontent.com/theopensystemslab/digital-planning-data-schemas/refs/heads/main";
  // "https://theopensystemslab.github.io/digital-planning-data-schemas";

// TODO: type the version more strictly
const useQuerySchemas = (
  schemaName: string,
  options?: Readonly<Omit<UseQueryOptions<unknown>, "queryKey" | "queryFn">>
) => {
  const fetchFn = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["schemas", schemaName],
    queryFn: () =>
      fetchFn(
        `${DIGITAL_PLANNING_DATA_SCHEMAS_JSON_URL}/schemas/${schemaName}.json`
      ),
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
    ...options,
  });
};

export default useQuerySchemas;
