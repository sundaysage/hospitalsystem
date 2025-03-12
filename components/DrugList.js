import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const DrugList = () => {
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        const response = await fetch(
          "https://api.fda.gov/drug/label.json?limit=15"
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        if (!data.results) throw new Error("No data found");

        const formattedDrugs = data.results.map((drug, index) => ({
          id: index, // Use index as ID (openFDA has no unique ID)
          name: drug.openfda?.brand_name?.[0] || "Unknown Drug",
          details: drug.indications_and_usage?.[0] || "No details available",
        }));

        setDrugs(formattedDrugs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrugs();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Drug List</h1>
      <ul className="list-disc pl-5">
        {drugs.map((drug) => (
          <li
            key={drug.id}
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={() => router.push(`/drug/${drug.id}`)}
          >
            {drug.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrugList;
