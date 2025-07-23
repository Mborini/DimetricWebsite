export async function fetchSolutions() {
  const res = await fetch("/api/managment/solutions");
  if (!res.ok) throw new Error("Failed to fetch solutions");
  return res.json();
}

export async function createSolution(data: any) {
  const res = await fetch("/api/managment/solutions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create solution");
  return res.json();
}

export async function updateSolution(id: number, data: any) {
  const res = await fetch(`/api/managment/solutions/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update solution");
  return res.json();
}

export async function deleteSolution(id: number) {
  const res = await fetch(`/api/managment/solutions/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete project");
  return res.json();
}
