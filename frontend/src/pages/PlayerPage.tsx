import { useEffect, useState } from "react";
import { fetchRecommendation } from "@/lib/api";
import { adaptRecommendation, UIRecommendation } from "@/lib/adapter";

import RaagaPlayer from "@/components/RaagaPlayer";
import GenAIOutput from "@/components/GenAIResults";

const PlayerPage = () => {
  const [data, setData] = useState<UIRecommendation | null>(null);

  useEffect(() => {
    fetchRecommendation({
      timestamp: new Date().toISOString(),
      mood: "Calm",
      genre: "Semi-Classical",
      language: "Hindi",
    }).then((raw) => {
      setData(adaptRecommendation(raw));
    });
  }, []);

  if (!data) return null;

  return (
    <div className="space-y-6">

      

      {/* NEW AI OUTPUT */}
      <GenAIOutput
        reasoning={data.explanation}
        recommendations={data.recommendations}
      />

      {/* Existing component*/}
      <RaagaPlayer raaga={data.raaga} />
      
    </div>
  );
};

export default PlayerPage;
