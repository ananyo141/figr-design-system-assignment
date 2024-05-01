import crypto from 'crypto';

export function hashResourceID(object: any): string {
  const hash = crypto.createHash('md5');
  hash.update(JSON.stringify(object));
  return hash.digest('hex');
}
