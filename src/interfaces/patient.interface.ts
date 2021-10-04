export interface Patient {
  programIdentifier: string;
  dataSource: string;
  cardNumber: string;
  memberID: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  telephoneNumber: string;
  emailAddress: string;
  consent: boolean;
  mobilePhone: string;
}

export interface PatientModel extends Patient {
  _id: string;
}

export interface PatientRaw {
  'Program Identifier': string;
  'Data Source': string;
  'Card Number': string;
  'Member ID': string;
  'First Name': string;
  'Last Name': string;
  'Date of Birth': string;
  'Address 1': string;
  'Address 2': string;
  City: string;
  State: string;
  'Zip code': string;
  'Telephone number': string;
  'Email Address': string;
  CONSENT: string;
  'Mobile Phone': string;
}
