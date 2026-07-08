export interface Rental {
  id: number;
  vehicleId: string;
  customerName: string;
  customerAge: number;
  customerEmail: string;
  customerPhone: string;
  givenPlace: string;
  returnPlace: string;
  givenTime: string;
  returnTime: string;
  address: string;
  carModel: string;
  totalHours: number;
  pricePerHour: number;
  advancePaid: number;
  totalTripCharges: number;
  documentsSubmitted: boolean;
}

export type RentalCreateRequest = Omit<Rental, 'id'>;
