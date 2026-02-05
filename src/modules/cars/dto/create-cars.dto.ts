export interface ICreateCarsDto {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  available: boolean;
  brand: string;
  categoryId: string;
}
