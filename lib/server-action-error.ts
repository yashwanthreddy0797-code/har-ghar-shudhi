export function isStaleServerActionError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const err = error as { name?: string; message?: string };
  return (
    err.name === "UnrecognizedActionError" ||
    (typeof err.message === "string" &&
      err.message.includes("was not found on the server"))
  );
}
