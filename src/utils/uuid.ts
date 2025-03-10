import crypto from 'node:crypto';

// generate random uuid
export default function getUUID () {
    return crypto.randomUUID();
}