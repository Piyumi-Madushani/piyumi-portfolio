const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}
export async function getProjects() {
  const response = await fetch(`${API_URL}/api/projects`);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  const result = await response.json();

  return result.data;
}

export async function getExperiences() {
  const response = await fetch(`${API_URL}/api/experience`);

  if (!response.ok) {
    throw new Error("Failed to fetch experiences");
  }

  const result = await response.json();

  return result.data;
}

export async function getEducations() {
  const response = await fetch(`${API_URL}/api/education`);

  if (!response.ok) {
    throw new Error("Failed to fetch education");
  }

  const result = await response.json();

  return result.data;
}

export async function getCertifications() {
  const response = await fetch(`${API_URL}/api/certifications`);

  if (!response.ok) {
    throw new Error("Failed to fetch certifications");
  }

  const result = await response.json();

  return result.data;
}

export async function getSkills() {
  const response = await fetch(`${API_URL}/api/skills`);

  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }

  const result = await response.json();

  return result.data;
}

export async function sendContact(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const response = await fetch(`${API_URL}/api/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to send message");
  }

  return result;
}