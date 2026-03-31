import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import { APP_CONFIG } from './config.js';
import { buildExamplePagePath, buildExampleRoutePath } from './example-routes.js';
import { normalizeExampleSource } from './starter.js';

export const SHARE_VERSION = APP_CONFIG.shareVersion;

function sanitizeRuntimeHint(runtimeHint) {
  return runtimeHint === 'fast' || runtimeHint === 'full' ? runtimeHint : null;
}

export function findMatchingExample(sourceText, examples) {
  const normalizedSource = normalizeExampleSource(sourceText);
  return examples.find((example) => normalizeExampleSource(example.source) === normalizedSource) ?? null;
}

export function buildShareFragment({ source, runtimeHint, examples }) {
  const matchingExample = findMatchingExample(source, examples);
  const params = new URLSearchParams();

  if (matchingExample) {
    params.set('ex', matchingExample.id);
    if (runtimeHint && runtimeHint !== matchingExample.runtime) {
      params.set('rt', runtimeHint);
    }
  } else {
    params.set('v', SHARE_VERSION);
    params.set('code', compressToEncodedURIComponent(source));
    const validRuntimeHint = sanitizeRuntimeHint(runtimeHint);
    if (validRuntimeHint) {
      params.set('rt', validRuntimeHint);
    }
  }

  const fragment = params.toString();
  return {
    fragment,
    isExamplePermalink: Boolean(matchingExample),
    isTooLong: fragment.length > APP_CONFIG.maxShareUrlLength,
  };
}

export function buildShareUrl({ source, runtimeHint, examples, location = window.location }) {
  const matchingExample = findMatchingExample(source, examples);

  const examplePagePath =
    matchingExample?.pagePath ??
    (matchingExample?.routeSlug ? buildExampleRoutePath(matchingExample.routeSlug) : null);

  if (examplePagePath) {
    const validRuntimeHint = sanitizeRuntimeHint(runtimeHint);
    const fragmentParams = new URLSearchParams();

    if (validRuntimeHint && validRuntimeHint !== matchingExample.runtime) {
      fragmentParams.set('rt', validRuntimeHint);
    }

    const fragment = fragmentParams.toString();

    return {
      fragment,
      isExamplePermalink: true,
      isTooLong: false,
      url: `${location.origin}${buildExamplePagePath(examplePagePath, location.pathname)}${
        fragment ? `#${fragment}` : ''
      }`,
    };
  }

  const { fragment, isExamplePermalink, isTooLong } = buildShareFragment({
    source,
    runtimeHint,
    examples,
  });

  return {
    fragment,
    isExamplePermalink,
    isTooLong,
    url: `${location.origin}${location.pathname}#${fragment}`,
  };
}

export function isShareUrlTooLong(url, maxLength) {
  return url.length > maxLength;
}

export function parseShareFragment(fragment, examples) {
  const rawFragment = fragment.startsWith('#') ? fragment.slice(1) : fragment;
  if (!rawFragment) {
    return null;
  }

  const params = new URLSearchParams(rawFragment);
  const runtimeHint = sanitizeRuntimeHint(params.get('rt'));

  if (runtimeHint && [...params.keys()].length === 1 && params.has('rt')) {
    return {
      source: null,
      exampleId: null,
      runtimeHint,
      error: null,
    };
  }

  if (params.has('ex')) {
    const exampleId = params.get('ex');
    const example = examples.find((entry) => entry.id === exampleId);
    if (!example) {
      return {
        source: null,
        exampleId: null,
        runtimeHint,
        error: `Shared example "${exampleId}" was not found. Loaded the starter script instead.`,
      };
    }

    return {
      source: example.source,
      exampleId: example.id,
      runtimeHint: runtimeHint ?? example.runtime,
      error: null,
    };
  }

  const version = params.get('v');
  const code = params.get('code');
  if (!version || !code) {
    return null;
  }

  const decompressed = decompressFromEncodedURIComponent(code);
  if (typeof decompressed !== 'string') {
    return {
      source: null,
      exampleId: null,
      runtimeHint,
      error: 'This shared link could not be decoded. Loaded the starter script instead.',
    };
  }

  return {
    source: decompressed,
    exampleId: null,
    runtimeHint,
    error: null,
  };
}
