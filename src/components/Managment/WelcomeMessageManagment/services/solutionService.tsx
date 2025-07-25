export async function fetchWelcomeMessages() {
  const res = await fetch("/api/managment/WelcomeMessage");
  if (!res.ok) throw new Error("Failed to fetch welcome messages");
  return res.json();
}


export async function updateWelcomeMessage(id: number, data: any) {
  const res = await fetch(`/api/managment/WelcomeMessage/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update welcome message");
  return res.json();
}
