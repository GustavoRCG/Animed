// src/data/api.js
import { API_URL } from "../data/config";

/**
 * Função auxiliar para fazer fetch com timeout
 */
async function fetchWithTimeout(resource, { timeout = 8000, ...options } = {}) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(resource, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}


/**
 * Busca veterinários da API
 */
export async function getVets() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/vets`);
    const json = await res.json().catch(() => ({}));

    if (!res.ok || !json?.success) {
      const msg = json?.message || `Erro HTTP ${res.status}`;
      throw new Error(msg);
    }

    return json.data; // Retorna o array de veterinários
  } catch (err) {
    console.error("[getVets] Falha ao buscar veterinários:", err);

    if (err.name === "AbortError") {
      // Erro de timeout ou API inacessível
      throw new Error(
        "Não foi possível conectar à API. Verifique se o dispositivo está na mesma rede do servidor e se o IP/porta estão corretos."
      );
    }

    throw err;
  }
}
