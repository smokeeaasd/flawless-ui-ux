const HEADING_TAGS = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

function primaryFontFamily(fontFamily) {
  if (typeof fontFamily !== 'string') return null;
  const first = fontFamily.split(',')[0]?.trim().replace(/^["']|["']$/g, '').trim();
  return first || null;
}

function normalizeWeight(weight) {
  if (typeof weight === 'number' && Number.isFinite(weight) && weight > 0) return weight;
  if (typeof weight !== 'string') return null;
  const normalized = weight.trim().toLowerCase();
  if (normalized === 'normal') return 400;
  if (normalized === 'bold') return 700;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function isTransparentColor(value) {
  if (typeof value !== 'string') return true;
  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized === 'transparent') return true;
  const commaAlpha = /^rgba?\([^)]*,\s*([0-9.]+)\s*\)$/.exec(normalized);
  if (commaAlpha && Number(commaAlpha[1]) === 0) return true;
  const slashAlpha = /^rgba?\([^)]*\/\s*([0-9.]+)(%?)\s*\)$/.exec(normalized);
  if (slashAlpha && Number(slashAlpha[1]) === 0) return true;
  return false;
}

function isZeroRadius(value) {
  if (typeof value !== 'string') return true;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return true;
  const parts = normalized.split(/\s+/);
  return parts.every(part => /^0(?:[a-z%]+)?$/.test(part));
}

function topEntries(counts, keyName, limit) {
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([value, count]) => ({ [keyName]: value, count }));
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

export function summarizeVisualMetrics({ textSamples = [], boxSamples = [] } = {}) {
  const familyCounts = new Map();
  const textColorCounts = new Map();
  const backgroundColorCounts = new Map();
  const weights = new Set();
  const allSizes = [];
  const nonHeadingSizeCounts = new Map();
  const radii = new Set();

  for (const sample of textSamples) {
    if (!sample) continue;
    const family = primaryFontFamily(sample.fontFamily);
    if (family) familyCounts.set(family, (familyCounts.get(family) || 0) + 1);

    const size = Number(sample.fontSize);
    if (Number.isFinite(size) && size > 0) {
      const rounded = round1(size);
      allSizes.push(rounded);
      const tag = typeof sample.tag === 'string' ? sample.tag.toLowerCase() : '';
      if (!HEADING_TAGS.has(tag)) {
        nonHeadingSizeCounts.set(rounded, (nonHeadingSizeCounts.get(rounded) || 0) + 1);
      }
    }

    const weight = normalizeWeight(sample.fontWeight);
    if (weight !== null) weights.add(weight);

    if (typeof sample.color === 'string' && sample.color.trim() && !isTransparentColor(sample.color)) {
      const color = sample.color.trim();
      textColorCounts.set(color, (textColorCounts.get(color) || 0) + 1);
    }
  }

  let cardLikeContainerCount = 0;
  for (const box of boxSamples) {
    if (!box) continue;
    if (!isTransparentColor(box.backgroundColor)) {
      const color = box.backgroundColor.trim();
      backgroundColorCounts.set(color, (backgroundColorCounts.get(color) || 0) + 1);
    }
    if (!isZeroRadius(box.borderRadius)) {
      radii.add(box.borderRadius.trim());
    }
    if (box.hasCardChrome === true) cardLikeContainerCount++;
  }

  const uniqueSizes = [...new Set(allSizes)].sort((a, b) => a - b);
  const maxFontSize = uniqueSizes.length ? uniqueSizes[uniqueSizes.length - 1] : null;

  let bodyFontSize = null;
  if (nonHeadingSizeCounts.size) {
    bodyFontSize = [...nonHeadingSizeCounts.entries()]
      .sort((a, b) => b[1] - a[1] || a[0] - b[0])[0][0];
  } else if (allSizes.length) {
    const sorted = [...allSizes].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    bodyFontSize = sorted.length % 2 === 1 ? sorted[mid] : round1((sorted[mid - 1] + sorted[mid]) / 2);
  }

  const displayToBodyRatio = maxFontSize !== null && bodyFontSize && bodyFontSize > 0
    ? Math.round((maxFontSize / bodyFontSize) * 100) / 100
    : null;

  const fontWeights = [...weights].sort((a, b) => a - b);
  const borderRadii = [...radii].sort((a, b) => a.localeCompare(b));

  return {
    fontFamilyCount: familyCounts.size,
    fontFamilies: topEntries(familyCounts, 'family', 10),
    fontSizeCount: uniqueSizes.length,
    fontSizes: uniqueSizes.slice(0, 20),
    bodyFontSize,
    maxFontSize,
    displayToBodyRatio,
    fontWeightCount: fontWeights.length,
    fontWeights,
    textColorCount: textColorCounts.size,
    textColors: topEntries(textColorCounts, 'color', 12),
    backgroundColorCount: backgroundColorCounts.size,
    backgroundColors: topEntries(backgroundColorCounts, 'color', 12),
    borderRadiusCount: borderRadii.length,
    borderRadii: borderRadii.slice(0, 12),
    cardLikeContainerCount,
  };
}
