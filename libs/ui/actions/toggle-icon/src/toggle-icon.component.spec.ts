import { fixture } from '@open-wc/testing-helpers';
import './index';
import { ToggleIconComponent } from './toggle-icon.component';

describe('ToggleIconComponent', () => {
  const querySlottedElements = (type: string): Element | undefined =>
    element.renderRoot
      .querySelector('slot')
      ?.assignedElements({ flatten: true })
      .find((el) => el.tagName.toLowerCase() === type.toLowerCase());
  let element: ToggleIconComponent;

  describe('when a proper input is set', () => {
    beforeEach(async () => {
      element = await fixture(`<oryx-toggle-icon>
        <input type="radio" placeholder="make a11y happy" />
        <oryx-icon></oryx-icon>
      </oryx-toggle-icon>`);
    });

    it('should render the slotted elements', () => {
      expect(querySlottedElements('input')).not.toBeUndefined;
      expect(querySlottedElements('oryx-icon')).not.toBeUndefined;
    });

    describe('if the input is checked initially', () => {
      beforeEach(async () => {
        element = await fixture(`<oryx-toggle-icon>
          <input checked type="radio" placeholder="make a11y happy" />
          <oryx-icon></oryx-icon>
        </oryx-toggle-icon>`);
      });

      it('should set the checked property in the host', () => {
        expect(element.hasAttribute('checked')).toBe(true);
      });
    });

    describe('if the input is not checked initially', () => {
      it('should set the checked property in the host', async () => {
        expect(element.hasAttribute('checked')).toBe(false);
      });

      describe('when the input gets checked', () => {
        beforeEach(async () => {
          querySlottedElements('input')?.setAttribute('checked', 'checked');
        });

        it('should set the checked property in the host', async () => {
          expect(element.hasAttribute('checked')).toBe(true);
        });

        describe('and uncheck again', () => {
          beforeEach(async () => {
            querySlottedElements('input')?.removeAttribute('checked');
          });

          it('should update the checked property in the host', async () => {
            expect(element.hasAttribute('checked')).toBe(false);
          });
        });
      });
    });

    describe('if the input is disabled initially', () => {
      beforeEach(async () => {
        element = await fixture(`<oryx-toggle-icon>
          <input disabled type="radio" placeholder="make a11y happy" />
          <oryx-icon></oryx-icon>
        </oryx-toggle-icon>`);
      });

      it('should set the disabled property in the host', async () => {
        expect(element.hasAttribute('disabled')).toBe(true);
      });
    });

    describe('if the input is not disabled initially', () => {
      it('should set the disabled property in the host', async () => {
        expect(element.hasAttribute('disabled')).toBe(false);
      });

      describe('when the input gets disabled', () => {
        beforeEach(async () => {
          querySlottedElements('input')?.setAttribute('disabled', 'true');
        });

        it('should set the disabled property in the host', async () => {
          expect(element.hasAttribute('disabled')).toBe(true);
        });

        describe('and enabled again', () => {
          beforeEach(async () => {
            querySlottedElements('input')?.removeAttribute('disabled');
          });

          it('should update the disabled property in the host', async () => {
            expect(element.hasAttribute('disabled')).toBe(false);
          });
        });
      });
    });
  });
});
