import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** « de » élidé devant voyelle : « de Lyon », « d'Annecy », « d'Aix-en-Provence ».
 * Le h n'est pas traité (« de Haute-Savoie » est un h aspiré) ; aucun h muet dans CITIES. */
export function deVille(name: string): string {
  const first = name.trim().charAt(0).normalize("NFD").charAt(0).toLowerCase();
  return /[aeiouy]/.test(first) ? `d'${name}` : `de ${name}`;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
