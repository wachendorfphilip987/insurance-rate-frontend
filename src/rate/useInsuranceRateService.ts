import type {InsuranceRate} from "./insuranceRate.ts";
import {useCallback} from "react";
import {useInsuranceRateRepository} from "./useInsuranceRateRepository.ts";

interface UseInsuranceRateService {
    getRate: (mileage: number, carType: string, zipCode: string) => Promise<InsuranceRate>;
}

export const useInsuranceRateService = (): UseInsuranceRateService => {
    const {getInsuranceRate} = useInsuranceRateRepository();

    const getRate = useCallback((
        mileage: number,
        carType: string,
        zipCode: string) => {
        if (!Number.isFinite(mileage)) {
            throw new Error('Invalid mileage');
        }
        return getInsuranceRate({mileage: mileage, carType: carType, zipCode: zipCode});
    }, [getInsuranceRate]);

    return {
        getRate
    }
}