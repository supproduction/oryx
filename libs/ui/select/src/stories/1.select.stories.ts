import { storybookPrefix } from '../../../constant';
import '../../../option/src/index';
import { sideBySide } from '../../../utilities/storybook';
import '../index';
import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';

export default {
  title: `${storybookPrefix}/form/Select`,
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  const compOptions = { label: 'select' };
  const selectOptions = ['Red', 'Green', 'Blue'];

  return sideBySide(html`
    <oryx-select .options=${compOptions}>
      <select>
        ${selectOptions.map((state) => html`<option>${state}</option>`)}
      </select>
    </oryx-select>
  `);
};

export const StandardSelect = Template.bind({});
