import { Meta, Story } from '@storybook/web-components';
import { html, TemplateResult } from 'lit';
import '../index';

export default {
  title: 'form/Password',
} as Meta;

const Template: Story<unknown> = (): TemplateResult => {
  return html`<oryx-password-input
    label="Customised password"
    suffixFill
    prefixIcon="add"
  >
    <input type="password" value="Change123$" placeholder="Placeholder..." />
    <span slot="suffix">suffix</span>
    <div slot="error">
      You're password needs to:
      <div style="color:green">
        ✅ Include both lower and upper case characters
      </div>
      <div>
        <style>
          oryx-icon {
            display: inline-flex;
            --oryx-icon-size-default: 12px;
          }
        </style>
        <oryx-icon type="error"></oryx-icon>
        Include at least one number or symbol
      </div>
      <div>
        <oryx-icon type="error"></oryx-icon>
        be at least 8 characters long
      </div>
    </div>
  </oryx-password-input>`;
};
export const CustomUI = Template.bind({});
