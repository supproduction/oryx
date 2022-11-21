import { ProviderType } from '@spryker-oryx/checkout/mocks';
import { Meta, Story } from '@storybook/web-components';
import { TemplateResult } from 'lit';
import { storybookPrefix } from '../../../../.constants';
import { renderSelector } from '../helper';

export default {
  title: `${storybookPrefix}/Shipment Selector/Static`,
} as unknown as Meta;

const Template: Story = (): TemplateResult => {
  return renderSelector(ProviderType.NoProvider);
};

export const NoProviders = Template.bind({});
