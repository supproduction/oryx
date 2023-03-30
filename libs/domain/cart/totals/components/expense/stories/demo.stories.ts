import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../.constants';

export default {
  title: `${storybookPrefix}/Cart totals/components/expense`,
} as Meta;

const Template: Story = (): TemplateResult => {
  return html`<oryx-cart-totals-expense></oryx-cart-totals-expense>`;
};

export const demo = Template.bind({});
