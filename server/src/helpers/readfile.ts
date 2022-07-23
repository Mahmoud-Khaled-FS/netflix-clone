import { readFileSync } from 'fs';
export default function readFileKeys(path: string, onError: () => void): string | void {
  const PRIVATE_KEY = readFileSync(path, { encoding: 'utf-8' });
  if (!PRIVATE_KEY) return onError();
  return PRIVATE_KEY;
}
