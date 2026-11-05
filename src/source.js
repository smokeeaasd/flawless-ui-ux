import { finding, readSource } from './shared.js';

export async function inspectSources(root, inputs) {
  const sources = [], findings = [], limits = [], targets = [];
  for (const input of inputs) {
    try {
      const source = await readSource(root, input);
      const { text, ...metadata } = source;
      sources.push(metadata);
      let occurrence = 0;
      for (const match of text.matchAll(/font-size\s*:\s*(\d+(?:\.\d+)?)px/gi)) {
        const target = `${metadata.path}:font-size:${++occurrence}`;
        targets.push(target);
        if (Number(match[1]) < 12) findings.push(finding('source.text-size', target, `A literal font size of ${match[1]}px may be hard to read.`, {
          evidence: { file: metadata.path, line: text.slice(0, match.index).split('\n').length, value: Number(match[1]) },
          recommendation: 'Check computed size, role, contrast, and zoom in the rendered interface. WCAG does not define a universal minimum font size.',
        }));
      }
      const arrows = [...text.matchAll(/[↗↘↖↙→←↑↓➜➔]|\bArrow(?:Up|Down|Left|Right|UpRight|DownRight)\b/gu)].map(match => ({ line: text.slice(0, match.index).split('\n').length, value: match[0] }));
      const target = `${metadata.path}:arrow-inventory`;
      targets.push(target);
      if (arrows.length > 1) findings.push(finding('source.arrow-inventory', target, `${arrows.length} literal arrow/icon cues occur in this source.`, { evidence: { file: metadata.path, occurrences: arrows }, recommendation: 'Review rendered uses for redundant direction cues. Source occurrences may include comments or code that is never rendered; count is not a defect.' }));
    } catch (error) { limits.push(error.message); }
  }
  return { sources, findings, limits, targets };
}
