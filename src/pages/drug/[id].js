import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const DrugDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [drug, setDrug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchDrugDetails = async () => {
      try {
        const response = await fetch(
          "https://api.fda.gov/drug/label.json?limit=15"
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        if (!data.results || !data.results[id]) throw new Error("Drug not found");

        const drugData = {
          name: data.results[id].openfda?.brand_name?.[0] || "Unknown Drug",
          details: data.results[id].indications_and_usage?.[0] || "No details available",
          warnings: data.results[id].warnings?.[0] || "No warnings available",
        };

        setDrug(drugData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDrugDetails();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">{drug.name}</h1>
      <p className="text-gray-600"><strong>Usage:</strong> {drug.details}</p>
      <p className="text-gray-600 mt-4"><strong>Warnings:</strong> {drug.warnings}</p>
      <button 
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => router.push("/drugs")}
      >
        Back to List
      </button>
    </div>
  );
};

export default DrugDetail;
