export async function loginUsuario(RUT: string, contrasena: string) {
  const res = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ RUT, contrasena })
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error al iniciar sesión");
  }

  return res.json(); // { token }
}