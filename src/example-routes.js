export const EXAMPLE_ROUTE_PREFIX = 'financial-calculators';

function normalizePathname(pathname = '/') {
  if (!pathname.startsWith('/')) {
    return `/${pathname}`;
  }

  return pathname;
}

function ensureTrailingSlash(pathname = '/') {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

export function getAppBasePath(pathname = '/') {
  const normalized = ensureTrailingSlash(normalizePathname(pathname));
  const routeMarker = `/${EXAMPLE_ROUTE_PREFIX}/`;
  const routeIndex = normalized.indexOf(routeMarker);

  if (routeIndex >= 0) {
    return normalized.slice(0, routeIndex + 1);
  }

  return normalized;
}

export function buildExampleRoutePath(routeSlug, pathname = '/') {
  const basePath = getAppBasePath(pathname);
  return `${basePath}${EXAMPLE_ROUTE_PREFIX}/${routeSlug}/`;
}
