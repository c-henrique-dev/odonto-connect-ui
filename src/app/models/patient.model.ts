export interface Patient {
    id?: number;
    name: string;
    gender: string;
    telephone: string;
    email: string;
    cpf: string;
    date_birth: Date;
    address: {
      city: string;
      street: string;
      cep: string;
      number: number;
    }
  }
  