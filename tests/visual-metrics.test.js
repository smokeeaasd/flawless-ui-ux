import { describe, test } from 'bun:test';
import assert from 'node:assert/strict';
import { summarizeVisualMetrics } from '../src/visual-metrics.js';

describe('visual metrics telemetry', () => {
  test('returns zeroed counts and null ratio for empty samples', () => {
    const metrics = summarizeVisualMetrics();
    assert.equal(metrics.fontFamilyCount, 0);
    assert.deepEqual(metrics.fontFamilies, []);
    assert.equal(metrics.fontSizeCount, 0);
    assert.deepEqual(metrics.fontSizes, []);
    assert.equal(metrics.bodyFontSize, null);
    assert.equal(metrics.maxFontSize, null);
    assert.equal(metrics.displayToBodyRatio, null);
    assert.equal(metrics.fontWeightCount, 0);
    assert.equal(metrics.textColorCount, 0);
    assert.equal(metrics.backgroundColorCount, 0);
    assert.equal(metrics.borderRadiusCount, 0);
    assert.equal(metrics.cardLikeContainerCount, 0);
  });

  test('computes primary font extraction, display-to-body ratio, weights, colors, radii, and card chrome', () => {
    const metrics = summarizeVisualMetrics({
      textSamples: [
        { fontFamily: '"Instrument Serif", Georgia, serif', fontSize: 48, fontWeight: '400', color: 'rgb(20, 24, 30)', tag: 'h1' },
        { fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 16, fontWeight: 'normal', color: 'rgb(20, 24, 30)', tag: 'p' },
        { fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 16, fontWeight: '400', color: 'rgb(20, 24, 30)', tag: 'p' },
        { fontFamily: '"Plus Jakarta Sans", sans-serif', fontSize: 14, fontWeight: 'bold', color: 'rgb(75, 85, 99)', tag: 'span' },
      ],
      boxSamples: [
        { backgroundColor: 'rgba(0, 0, 0, 0)', borderRadius: '0px', hasCardChrome: false },
        { backgroundColor: 'transparent', borderRadius: '0px 0px 0px 0px', hasCardChrome: false },
        { backgroundColor: 'rgb(255, 255, 255)', borderRadius: '16px', hasCardChrome: true },
        { backgroundColor: 'rgb(248, 250, 252)', borderRadius: '8px', hasCardChrome: true },
        { backgroundColor: 'rgb(255 255 255 / 0)', borderRadius: '16px', hasCardChrome: false },
      ],
    });

    assert.equal(metrics.fontFamilyCount, 2);
    assert.deepEqual(metrics.fontFamilies, [
      { family: 'Plus Jakarta Sans', count: 3 },
      { family: 'Instrument Serif', count: 1 },
    ]);
    assert.deepEqual(metrics.fontSizes, [14, 16, 48]);
    assert.equal(metrics.bodyFontSize, 16);
    assert.equal(metrics.maxFontSize, 48);
    assert.equal(metrics.displayToBodyRatio, 3);
    assert.deepEqual(metrics.fontWeights, [400, 700]);
    assert.equal(metrics.textColorCount, 2);
    assert.equal(metrics.backgroundColorCount, 2);
    assert.deepEqual(metrics.borderRadii, ['16px', '8px']);
    assert.equal(metrics.borderRadiusCount, 2);
    assert.equal(metrics.cardLikeContainerCount, 2);
  });

  test('falls back to median size when only heading tags are present and caps large lists', () => {
    const textSamples = Array.from({ length: 25 }, (_, index) => ({
      fontFamily: `"Font${index}", sans-serif`,
      fontSize: 12 + index,
      fontWeight: 400 + (index % 3) * 100,
      color: `rgb(${index}, 10, 20)`,
      tag: 'h2',
    }));
    const boxSamples = Array.from({ length: 15 }, (_, index) => ({
      backgroundColor: `rgb(240, 240, ${200 + index})`,
      borderRadius: `${index + 1}px`,
      hasCardChrome: index % 2 === 0,
    }));

    const metrics = summarizeVisualMetrics({ textSamples, boxSamples });
    assert.equal(metrics.bodyFontSize, 24);
    assert.equal(metrics.maxFontSize, 36);
    assert.equal(metrics.displayToBodyRatio, 1.5);
    assert.equal(metrics.fontFamilies.length, 10);
    assert.equal(metrics.fontSizes.length, 20);
    assert.equal(metrics.textColors.length, 12);
    assert.equal(metrics.backgroundColors.length, 12);
    assert.equal(metrics.borderRadii.length, 12);
    assert.equal(metrics.cardLikeContainerCount, 8);
  });
});
