import { Meta, Story } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { html } from 'lit-html';
import { storybookPrefix } from '../../../../.constants';
import { setupProductMocks } from '../../../../src/mocks';

export default {
  title: `${storybookPrefix}/Attributes/Static`,
  loaders: [setupProductMocks],
} as unknown as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html` <div style="margin-right: 100px">
    <product-attributes
      sku=${8}
      .options=${{ columnCount: '2' }}
    ></product-attributes>
  </div>`;
};

export const MultiLineValues = Template.bind({});
