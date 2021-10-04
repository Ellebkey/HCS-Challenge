export interface Email {
  name: string;
  scheduledDate: string;
  patientId: string;
}

export interface EmailModel extends Email{
  _id: string;
}
