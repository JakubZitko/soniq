/**
 * Soniq — Procedural UI sounds for the web.
 */

export interface SoniqOptions {
  /** Global output volume from 0 to 1. Default: 0.5 */
  volume?: number;
}

export interface ToneOptions {
  /** Frequency in Hz. Default: 440 */
  freq?: number;
  /** Duration in seconds. Default: 0.1 */
  duration?: number;
  /** Oscillator type. Default: 'sine' */
  type?: OscillatorType;
  /** Peak gain from 0 to 1. Default: 0.5 */
  gain?: number;
  /** Attack time in seconds. Default: 0.005 */
  attack?: number;
  /** Decay time in seconds. Default: 0.05 */
  decay?: number;
  /** Optional pitch envelope target in Hz. */
  pitchEnv?: { to: number } | null;
}

export interface NoiseOptions {
  /** Duration in seconds. Default: 0.1 */
  duration?: number;
  /** Peak gain from 0 to 1. Default: 0.3 */
  gain?: number;
  /** Attack time in seconds. Default: 0.005 */
  attack?: number;
  /** Decay time in seconds. Default: 0.03 */
  decay?: number;
  /** Noise color. Default: 'white' */
  color?: 'white' | 'pink';
}

export interface ClickOptions {
  /** Use a quieter, thinner click. Default: false */
  subtle?: boolean;
}

export interface HoverOptions {
  /** Use a quieter hover tone. Default: true */
  subtle?: boolean;
}

export interface TypeOptions {
  /** Use a quieter keystroke. Default: true */
  subtle?: boolean;
}

export interface NotificationOptions {
  /** Use an insistent, higher-pitched alert. Default: false */
  urgent?: boolean;
}

export interface SwipeOptions {
  /** Swipe direction. Default: 'right' */
  direction?: 'left' | 'right';
}

export declare class Soniq {
  constructor(options?: SoniqOptions);

  /** Initialize or return the AudioContext. */
  init(): AudioContext;

  /** Set global output volume (0–1). */
  setVolume(value: number): void;

  /** Synthesize a tone. */
  tone(options?: ToneOptions): Soniq;

  /** Synthesize noise. */
  noise(options?: NoiseOptions): Soniq;

  /** Button click sound. */
  click(options?: ClickOptions): Soniq;

  /** Cursor hover/landing sound. */
  hover(options?: HoverOptions): Soniq;

  /** Toggle switch sound. Pass `true` for on, `false` for off. */
  toggle(on?: boolean): Soniq;

  /** Notification alert. */
  notification(options?: NotificationOptions): Soniq;

  /** Success confirmation chord. */
  success(): Soniq;

  /** Error/failure buzz. */
  error(): Soniq;

  /** Keystroke tick. */
  type(options?: TypeOptions): Soniq;

  /** Gesture swipe sound. */
  swipe(options?: SwipeOptions): Soniq;

  /** Soft bubble pop. */
  pop(): Soniq;
}

/** Default Soniq instance used by named exports. */
declare const soniq: Soniq;

export default soniq;

export declare function init(): AudioContext;
export declare function setVolume(value: number): void;
export declare function tone(options?: ToneOptions): Soniq;
export declare function noise(options?: NoiseOptions): Soniq;
export declare function click(options?: ClickOptions): Soniq;
export declare function hover(options?: HoverOptions): Soniq;
export declare function toggle(on?: boolean): Soniq;
export declare function notification(options?: NotificationOptions): Soniq;
export declare function success(): Soniq;
export declare function error(): Soniq;
export declare function type(options?: TypeOptions): Soniq;
export declare function swipe(options?: SwipeOptions): Soniq;
export declare function pop(): Soniq;
