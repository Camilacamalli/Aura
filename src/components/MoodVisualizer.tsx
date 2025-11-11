import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';

export default function MoodVisualizer() {

  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const mood = searchParams.get('mood');
  }, [searchParams]);


  if (loading) {
    return <div>Loading music for you...</div>
  }
  
  return (
    <></>
  )
}
