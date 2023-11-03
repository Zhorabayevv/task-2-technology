import {
  animate,
  AnimationTriggerMetadata,
  keyframes,
  sequence,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const DEFAULT_ANIMATION_DURATION_NUMBER = 0.5;
export const DEFAULT_ANIMATION_DURATION = `${DEFAULT_ANIMATION_DURATION_NUMBER}s`;
export const DEFAULT_ANIMATION_TIMING_FUNCTION =
  ' cubic-bezier(0.66, 0.0, 0.34, 1)';
export const DEFAULT_ANIMATION =
  DEFAULT_ANIMATION_DURATION + DEFAULT_ANIMATION_TIMING_FUNCTION;

export const OWNER_HAMBURGER_ANIMATIONS: {
  readonly topLine: AnimationTriggerMetadata;
  readonly middleLine: AnimationTriggerMetadata;
  readonly bottomLine: AnimationTriggerMetadata;
} = {
  topLine: trigger('topLine', [
    state('initial', style({ transform: 'translateY(0)' })),
    state(
      'cross',
      style({
        transform: 'translateY(8px) rotate(45deg)',
        width: '100%',
        marginLeft: 'auto',
      }),
    ),
    transition(
      'initial => cross',
      sequence([
        animate(
          DEFAULT_ANIMATION,
          style({
            transform: 'translateY(8px) rotate(0deg)',
            width: '100%',
            marginLeft: 'auto',
          }),
        ),
        animate(
          DEFAULT_ANIMATION,
          style({ transform: 'translateY(8px) rotate(45deg)' }),
        ),
      ]),
    ),
    transition(
      'cross => initial',
      sequence([
        animate(
          DEFAULT_ANIMATION,
          style({
            transform: 'translateY(8px) rotate(0deg)',
            width: '15px',
            marginLeft: '9px',
          }),
        ),
        animate(DEFAULT_ANIMATION, style({ transform: 'translateY(0)' })),
      ]),
    ),
  ]),
  middleLine: trigger('middleLine', [
    state('initial', style({ opacity: 1 })),
    state('cross', style({ opacity: 0, marginLeft: 0 })),
    transition(
      'initial => cross',
      sequence([
        animate(DEFAULT_ANIMATION, style({ marginLeft: 0 })),
        animate(0, style({ opacity: 0 })),
      ]),
    ),
    transition(
      'cross => initial',
      animate(
        `${DEFAULT_ANIMATION_DURATION_NUMBER * 2}s`,
        keyframes([
          style({ marginLeft: 0, offset: 0 }),
          style({ marginLeft: 'unset', offset: 0.5 }),
        ]),
      ),
    ),
  ]),
  bottomLine: trigger('bottomLine', [
    state('initial', style({ transform: 'translateY(0)' })),
    state(
      'cross',
      style({
        transform: 'translateY(-8px) rotate(-45deg)',
        width: '100%',
        marginLeft: 'auto',
      }),
    ),
    transition(
      'initial => cross',
      sequence([
        animate(
          DEFAULT_ANIMATION,
          style({
            transform: 'translateY(-8px) rotate(0deg)',
            width: '100%',
            marginLeft: 'auto',
          }),
        ),
        animate(
          DEFAULT_ANIMATION,
          style({ transform: 'translateY(-8px) rotate(-45deg)' }),
        ),
      ]),
    ),
    transition(
      'cross => initial',
      sequence([
        animate(
          DEFAULT_ANIMATION,
          style({
            transform: 'translateY(-8px) rotate(0deg)',
            width: '15px',
            marginLeft: '0',
          }),
        ),
        animate(DEFAULT_ANIMATION, style({ transform: 'translateY(0) ' })),
      ]),
    ),
  ]),
};
