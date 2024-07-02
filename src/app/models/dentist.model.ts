export interface Dentist {
    id?: number;
    name: string;
    cpf?: string;
    specialty: string;
    telephone: string;
    email?: string;
    address: {
        city: string;
        street: string;
        cep: string;
        number: number;
      }
}