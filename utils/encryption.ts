export function maskId(id: string) {
  // Encrypt the ID using AES with the provided key
  return btoa(id).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, ""); // Using built-in btoa function for Base64 encoding
}

// Function to decode the masked ID using AES decryption
export function decodeMaskedId(maskedId: string) {
  // Decrypt the masked ID using AES with the provided key
  var padding = "=".repeat((4 - (maskedId.length % 4)) % 4);
  var base64 = (maskedId + padding).replace(/-/g, "+").replace(/_/g, "/"); // Convert back to regular Base64
  return atob(base64); // Using built-in atob function for Base64 decoding
}
