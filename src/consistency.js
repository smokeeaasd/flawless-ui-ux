export function consistency(observations) {
  const groups = new Map();
  for (const observation of observations) for (const item of observation.inventory || []) {
    const key = JSON.stringify([item.role, observation.viewport, observation.state]);
    if (!groups.has(key)) groups.set(key, { role: item.role, viewport: observation.viewport, state: observation.state, variants: [] });
    const group = groups.get(key);
    const signature = JSON.stringify(item.style);
    let variant = group.variants.find(entry => entry.signature === signature);
    if (!variant) { variant = { signature, style: item.style, occurrences: [] }; group.variants.push(variant); }
    variant.occurrences.push({ surface: observation.surface, target: item.target });
  }
  return { status: 'needs-review', groups: [...groups.values()].filter(group => new Set(group.variants.flatMap(v => v.occurrences.map(o => o.surface))).size > 1).map(group => ({ ...group, differs: group.variants.length > 1, variants: group.variants.map(({ signature, ...variant }) => variant) })),
    limit: 'Roles and computed styles are review evidence. Variants can be intentional; no automatic defect or restyle is inferred.' };
}
