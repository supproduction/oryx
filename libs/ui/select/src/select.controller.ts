import { getControl } from '../../input';
import { OptionComponent } from '../../option';
import { OryxElement } from '../../utilities';
import { SelectOptions } from './select.model';
import { ReactiveController } from 'lit';

/**
 * Whenever a select element is projected in the default slot, this controller
 * will reflect the native select options by generating a list of `oryx-option` elements.
 * The options are reflected repeatedly whenever the host is updated, so that options that
 * are added dynamically (async) will be reflected.
 *
 * If an input element is used, the input will be made `readonly`, unless filtering is enabled.
 *
 */
export class SelectController implements ReactiveController {
  protected options: { value: string; text?: string }[] = [];

  hostUpdated(): void {
    this.initSelect();
  }

  protected initSelect(): void {
    const control = getControl(this.host);
    if (control instanceof HTMLSelectElement) {
      this.reflectSelect(control);
    } else {
      if (!this.host.options.filter && !control?.readOnly) {
        control?.toggleAttribute('readonly', true);
      }
    }
    this.host
      .querySelectorAll<OptionComponent>('oryx-option')
      .forEach((option) => {
        if (!option.slot) {
          option.slot = 'option';
        }
      });
  }

  protected reflectSelect(element: HTMLSelectElement): void {
    if (this.host.options.allowEmptyValue) {
      const firstOption = Array.from(element.options)?.[0];
      if (firstOption && firstOption.value !== '') {
        const emptyOption = document.createElement('option');
        emptyOption.style.setProperty('display', 'none');
        // when an other option is selected, we do not force the selection of the
        // newly created empty option
        if (firstOption.selected) {
          emptyOption.selected = true;
        }
        element.insertBefore(emptyOption, firstOption);
      }
    }

    const options = Array.from(element.options)
      .filter((option) => option.value !== '')
      .map((nativeOption: HTMLOptionElement) => {
        nativeOption.style.setProperty('display', 'none');
        const reflectedOption: { value: string; text?: string } = {
          value: nativeOption.value,
        };
        if (
          nativeOption.innerText.trim() !== nativeOption.value &&
          nativeOption.innerText.trim() !== ''
        ) {
          reflectedOption.text = nativeOption.innerText.trim();
        }
        return reflectedOption;
      });

    if (JSON.stringify(options) !== JSON.stringify(this.options)) {
      this.options = options;
      this.reflectOptions();
    }

    if (!this.host.options.isEmpty && this.options.length === 0) {
      this.host.options = { ...this.host.options, isEmpty: true };
    } else if (this.host.options.isEmpty && this.options.length > 0) {
      this.host.options = { ...this.host.options, isEmpty: false };
    }
  }

  protected reflectOptions(): void {
    // cleanup manual created items from last time
    this.host.querySelectorAll('oryx-option').forEach((el) => el.remove());
    this.options.forEach((option) => {
      const newOption = document.createElement(
        'oryx-option'
      ) as OptionComponent;
      newOption.value = option.value;
      if (option.text) {
        newOption.innerText = option.text;
      }
      this.host.appendChild(newOption);
    });
  }

  constructor(protected host: OryxElement<SelectOptions>) {
    this.host.addController(this);
  }
}
