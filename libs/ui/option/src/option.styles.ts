import { css } from 'lit';

export const optionStyles = css`
  :host([hidden]) {
    display: none;
  }

  :host {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 42px;
    box-sizing: border-box;
    padding: 9px 13px;
    list-style: none;
    border: solid 1px transparent;
    border-radius: var(--oryx-border-radius-small);
    outline: none;
    transition: background var(--oryx-transition-time-medium);
    cursor: pointer;
  }

  oryx-icon.mark {
    --oryx-icon-size: var(--oryx-icon-size-small);

    display: none;
    color: var(--oryx-color-primary-300);
    margin-inline-start: auto;
  }

  :host([selected]) oryx-icon {
    display: flex;
  }

  :host(:hover),
  :host([highlight]) {
    background-color: var(--oryx-color-canvas-200);
  }

  :host([selected]) {
    background-color: var(--oryx-color-primary-100);
  }

  :host(:not([selected]):active) {
    background-color: var(--oryx-color-canvas-100);
  }

  :host(:active) {
    border-color: var(--oryx-color-primary-300);
    box-shadow: var(--oryx-elevation-0) var(--oryx-color-primary-300);
    transition: box-shadow, border;
    transition-duration: var(--oryx-transition-time);
  }

  :host([hide]) {
    padding: 0;
    max-height: 0;
    overflow: hidden;
    border: 0;
  }

  slot:not([name]) {
    display: inline;
  }

  ::slotted(mark),
  mark {
    background-color: transparent;
    color: var(--oryx-color-primary-300);
    display: inline;
  }
`;
