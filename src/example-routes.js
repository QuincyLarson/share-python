export const EXAMPLE_ROUTE_PREFIX = 'financial-calculators';
export const MATH_EXAMPLE_ROUTE_PREFIX = 'math-calculators';
export const HEALTH_EXAMPLE_ROUTE_PREFIX = 'health-calculators';
export const EXAMPLE_ROUTE_PREFIXES = [
  EXAMPLE_ROUTE_PREFIX,
  MATH_EXAMPLE_ROUTE_PREFIX,
  HEALTH_EXAMPLE_ROUTE_PREFIX,
];

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

  for (const routePrefix of EXAMPLE_ROUTE_PREFIXES) {
    const routeMarker = `/${routePrefix}/`;
    const routeIndex = normalized.indexOf(routeMarker);

    if (routeIndex >= 0) {
      return normalized.slice(0, routeIndex + 1);
    }
  }

  return normalized;
}

export function buildExampleRoutePath(routeSlug, pathname = '/') {
  const basePath = getAppBasePath(pathname);
  return `${basePath}${EXAMPLE_ROUTE_PREFIX}/${routeSlug}/`;
}

export function normalizeExamplePagePath(pagePath = '/') {
  return ensureTrailingSlash(normalizePathname(pagePath));
}

export function buildExamplePagePath(pagePath, pathname = '/') {
  const basePath = getAppBasePath(pathname);
  return `${basePath}${normalizeExamplePagePath(pagePath).slice(1)}`;
}
