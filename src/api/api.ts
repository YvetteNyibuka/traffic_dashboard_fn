export type TrafficData = {
  id: string;
  road: number;
  ir1: number;
  ir2: number;
  ir3: number;
  created_at: string | null;
};

const API_URL = "https://traffic-backend-6ykq.onrender.com";

export async function fetchTrafficData(): Promise<TrafficData[]> {
  const response = await fetch(`${API_URL}/fetch.php`);
  const data = await response.json();
  return data;
}
