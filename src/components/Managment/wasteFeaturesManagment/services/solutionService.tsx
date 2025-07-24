export async function fetchWasteFeatures() {
  const res = await fetch("/api/managment/wasteManagementFeatures");
  if (!res.ok) throw new Error("Failed to fetch waste features");
  return res.json();
}



export async function updateWasteFeature(id: number, data: any) {
  const res = await fetch(`/api/managment/wasteManagementFeatures/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update waste feature");
  return res.json();
}

