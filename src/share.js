export const SHARE_VERSION = '1';

export async function encodeShareFragment({ sourceText, exampleId = null, runtimeHint = null }) {
  const params = new URLSearchParams();

  if (exampleId) {
    params.set('ex', exampleId);
  } else {
    params.set('v', SHARE_VERSION);
    params.set('code', await compressTextToBase64Url(sourceText));
  }

  if (runtimeHint) {
    params.set('rt', runtimeHint);
  }

  return `#${params.toString()}`;
}

export async function decodeShareFragment(fragment) {
  if (!fragment || fragment === '#') {
    return { type: 'empty' };
  }

  const params = new URLSearchParams(fragment.startsWith('#') ? fragment.slice(1) : fragment);
  const runtimeHint = params.get('rt');

  if (params.has('ex')) {
    return {
      type: 'example',
      exampleId: params.get('ex'),
      runtimeHint
    };
  }

  if (params.has('code')) {
    try {
      return {
        type: 'code',
        sourceText: await decompressBase64UrlToText(params.get('code')),
        runtimeHint,
        version: params.get('v') ?? SHARE_VERSION
      };
    } catch {
      return {
        type: 'error',
        reason: 'decode_failed'
      };
    }
  }

  return { type: 'empty' };
}

export function isShareUrlTooLong(url, maxLength) {
  return url.length > maxLength;
}

async function compressTextToBase64Url(text) {
  const encoded = new TextEncoder().encode(text);
  const bytes =
    typeof CompressionStream === 'function'
      ? await streamBytes(encoded, new CompressionStream('gzip'))
      : encoded;

  return toBase64Url(bytes);
}

async function decompressBase64UrlToText(encodedText) {
  const bytes = fromBase64Url(encodedText);
  const decompressed =
    typeof DecompressionStream === 'function'
      ? await streamBytes(bytes, new DecompressionStream('gzip'))
      : bytes;

  return new TextDecoder().decode(decompressed);
}

async function streamBytes(bytes, stream) {
  const writer = stream.writable.getWriter();
  await writer.write(bytes);
  await writer.close();
  const buffer = await new Response(stream.readable).arrayBuffer();
  return new Uint8Array(buffer);
}

function toBase64Url(bytes) {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(bytes).toString('base64url');
  }

  let binary = '';

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function fromBase64Url(value) {
  if (typeof Buffer !== 'undefined') {
    return new Uint8Array(Buffer.from(value, 'base64url'));
  }

  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

