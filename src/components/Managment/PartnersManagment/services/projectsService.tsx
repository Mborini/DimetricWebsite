export async function fetchPartners() {
  const res = await fetch("/api/managment/partners");
  if (!res.ok) throw new Error("Failed to fetch partners");
  return res.json();
}

export async function createPartner(data: any) {
  const res = await fetch("/api/managment/partners", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create partner");
  return res.json();
}

export async function updatePartner(id: number, data: any) {
  const res = await fetch(`/api/managment/partners/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update partner");
  return res.json();
}

export async function deletePartner(id: number) {
  const res = await fetch(`/api/managment/partners/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete partner");
  return res.json();
}
