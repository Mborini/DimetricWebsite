export async function fetchVisions() {
  const res = await fetch("/api/managment/Vision");
  if (!res.ok) throw new Error("Failed to fetch vision");
  return res.json();
}


export async function updateVision(id: number, data: any) {
  const res = await fetch(`/api/managment/Vision/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update vision");
  return res.json();
}
