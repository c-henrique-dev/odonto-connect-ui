export interface MedicalRecords {
  data: [
    {
      id?: number;
      record_date: string;
      description: string;
      attachment: File;
      patient: {
        id?: number;
        name: string;
        gender: string;
        telephone: string;
        email: string;
        cpf: string;
        date_birth: Date;
      };
    }
  ];
  total: number;
}
