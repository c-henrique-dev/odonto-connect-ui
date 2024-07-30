export interface Payment {
    patient_id?: number,
    scheduling_id?: number,
    payment_date: Date,
    payment_reason: string,
    amount: number
}