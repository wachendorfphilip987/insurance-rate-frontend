export interface InsuranceRate {
    rate: number;
    ratePrecise: number;
}

export interface InsuranceRateRequest {
    mileage: number;
    carType: string;
    zipCode: string;
}