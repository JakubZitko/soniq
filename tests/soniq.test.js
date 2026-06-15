import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { Soniq, click, setVolume } from '../src/soniq.js';

// Minimal mock of the Web Audio API for Node tests
global.window = {
  AudioContext: class MockAudioContext {
    constructor() {
      this.state = 'running';
      this.currentTime = 0;
      this.sampleRate = 48000;
    }

    createOscillator() {
      return {
        type: 'sine',
        frequency: { setValueAtTime() {}, exponentialRampToValueAtTime() {} },
        connect() {},
        start() {},
        stop() {}
      };
    }

    createGain() {
      return {
        gain: {
          value: 0,
          setValueAtTime() {},
          linearRampToValueAtTime() {},
          exponentialRampToValueAtTime() {},
          setTargetAtTime() {}
        },
        connect() {}
      };
    }

    createDynamicsCompressor() {
      return {
        threshold: { value: 0 },
        knee: { value: 0 },
        ratio: { value: 0 },
        attack: { value: 0 },
        release: { value: 0 },
        connect() {}
      };
    }

    createBuffer(channels, length, rate) {
      return { getChannelData: () => new Float32Array(length) };
    }

    createBufferSource() {
      return { buffer: null, connect() {}, start() {}, stop() {} };
    }

    resume() {
      this.state = 'running';
      return Promise.resolve();
    }
  }
};

describe('Soniq', () => {
  beforeEach(() => {
    setVolume(0.5);
  });

  it('creates an instance with default volume', () => {
    const soniq = new Soniq();
    assert.strictEqual(soniq.volume, 0.5);
  });

  it('accepts custom volume', () => {
    const soniq = new Soniq({ volume: 0.3 });
    assert.strictEqual(soniq.volume, 0.3);
  });

  it('returns the same AudioContext after init', () => {
    const soniq = new Soniq();
    const ctx1 = soniq.init();
    const ctx2 = soniq.init();
    assert.strictEqual(ctx1, ctx2);
  });

  it('plays a click sound', () => {
    const soniq = new Soniq();
    assert.doesNotThrow(() => soniq.click());
  });

  it('plays a hover sound', () => {
    const soniq = new Soniq();
    assert.doesNotThrow(() => soniq.hover());
  });

  it('plays a toggle sound for both states', () => {
    const soniq = new Soniq();
    assert.doesNotThrow(() => soniq.toggle(true));
    assert.doesNotThrow(() => soniq.toggle(false));
  });

  it('plays all named exports without throwing', () => {
    import('../src/soniq.js').then((mod) => {
      assert.doesNotThrow(() => mod.click());
      assert.doesNotThrow(() => mod.hover());
      assert.doesNotThrow(() => mod.toggle(true));
      assert.doesNotThrow(() => mod.notification());
      assert.doesNotThrow(() => mod.success());
      assert.doesNotThrow(() => mod.error());
      assert.doesNotThrow(() => mod.type());
      assert.doesNotThrow(() => mod.swipe());
      assert.doesNotThrow(() => mod.pop());
    });
  });

  it('updates volume on default instance', () => {
    assert.doesNotThrow(() => setVolume(0.75));
  });
});
