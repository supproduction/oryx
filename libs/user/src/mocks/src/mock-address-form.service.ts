import { AddressFormQualifier, AddressFormService } from '@spryker-oryx/user';
import { AddressForm } from '@spryker-oryx/user/address-form';
import { Observable, of } from 'rxjs';

export class MockAddressFormService implements Partial<AddressFormService> {
  static mockForm: Record<string, AddressForm> = {
    US: {
      id: 'US',
      name: 'United States',
      data: {
        options: [
          {
            id: 'salutation',
            label: 'Salutation',
            type: 'select',
            width: 100,
            options: [
              {
                value: 'mr',
                text: 'Mr',
              },
              {
                value: 'mrs',
                text: 'Mrs',
              },
              {
                value: 'miss',
                text: 'Miss',
              },
              {
                value: 'ms',
                text: 'Ms',
              },
              {
                value: 'dr',
                text: 'Dr',
              },
            ],
          },
          {
            id: 'firstName',
            title: 'First Name',
            label: '',
            type: 'input',
            required: true,
          },
          {
            id: 'lastName',
            title: 'Last Name',
            label: '',
            type: 'input',
            required: true,
          },
          {
            id: 'company',
            title: 'Company',
            label: '',
            type: 'input',
            required: false,
            width: 100,
          },
          {
            id: 'address1',
            title: 'Street Address or P.O. box',
            label: '',
            type: 'input',
            required: true,
            width: 100,
          },
          {
            id: 'address2',
            title: 'Apt, suite, unit, building, floor, etc.',
            label: '',
            type: 'input',
            required: true,
            width: 100,
          },
          {
            id: 'city',
            title: 'City',
            label: '',
            type: 'input',
            required: true,
            width: 100,
          },
          {
            id: 'state',
            label: 'State/Province',
            type: 'select',
            options: [
              {
                value: 'TX',
                text: 'Texas',
              },
              {
                value: 'CA',
                text: 'California',
              },
              {
                value: 'NY',
                text: 'New York',
              },
            ],
          },
          {
            id: 'zipcode',
            title: 'ZIP code',
            label: '',
            type: 'input',
            required: true,
          },
          {
            id: 'email',
            title: 'Email',
            label: '',
            type: 'email',
            required: true,
            width: 100,
          },
          {
            id: 'phone',
            title: 'Phone',
            label: '',
            type: 'tel',
            required: false,
            width: 100,
          },
        ],
      },
    },
    DE: {
      id: 'DE',
      name: 'Germany',
      data: {
        options: [
          {
            id: 'salutation',
            label: 'Salutation',
            type: 'select',
            width: 100,
            options: [
              {
                value: 'mr',
                text: 'Mr',
              },
              {
                value: 'ms',
                text: 'Ms',
              },
              {
                value: 'dr',
                text: 'Dr',
              },
            ],
          },
          {
            id: 'firstName',
            title: 'First Name',
            label: '',
            type: 'input',
            required: true,
          },
          {
            id: 'lastName',
            title: 'Last Name',
            label: '',
            type: 'input',
            required: true,
          },
          {
            id: 'company',
            title: 'Company',
            label: '',
            width: 100,
            type: 'input',
            required: false,
          },
          {
            id: 'address1',
            title: 'Street and House number',
            label: '',
            width: 100,
            type: 'input',
            required: true,
          },
          {
            id: 'address2',
            title: 'Apt, suite, unit, building, floor, etc.',
            label: '',
            width: 100,
            type: 'input',
            required: true,
          },
          {
            id: 'zipcode',
            title: 'PLZ',
            label: '',
            type: 'input',
            required: true,
          },
          {
            id: 'city',
            title: 'City',
            label: '',
            type: 'input',
            required: true,
          },
          {
            id: 'email',
            title: 'Email',
            label: '',
            width: 100,
            type: 'email',
            required: true,
          },
          {
            id: 'phone',
            title: 'Phone',
            label: '',
            width: 100,
            type: 'tel',
            required: false,
          },
        ],
      },
    },
  };

  getForm(qualifier: AddressFormQualifier): Observable<AddressForm> {
    return of(MockAddressFormService.mockForm[qualifier.country]);
  }
}
