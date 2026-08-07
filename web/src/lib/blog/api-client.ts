/** Safe JSON parse for API responses (avoids opaque "Unexpected end of JSON"). */
export async function readApiJson<T extends { ok?: boolean; error?: string }>(
  res: Response,
): Promise<T> {
  const text = await res.text();
  if (!text.trim()) {
    throw new Error(
      res.status === 413
        ? "Request too large."
        : `Empty server response (${res.status}). Check you're signed in and try again.`,
    );
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error(
      `Server returned non-JSON (${res.status}). ${text.slice(0, 160)}`,
    );
  }
}
