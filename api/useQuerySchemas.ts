import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const DIGITAL_PLANNING_DATA_SCHEMAS_JSON_URL =
  "https://theopensystemslab.github.io/digital-planning-data-schemas/v0.7.0/schema.json";

const useQuerySchemas = () => {
  const fetchFn = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };

  return useQuery({
    queryKey: ["schemas"],
    queryFn: () => fetchFn(DIGITAL_PLANNING_DATA_SCHEMAS_JSON_URL),
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });
};

export default useQuerySchemas;
