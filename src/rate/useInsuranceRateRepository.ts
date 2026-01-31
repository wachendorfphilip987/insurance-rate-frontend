import {useCallback, useState} from "react";
import type {InsuranceRate, InsuranceRateRequest} from "./insuranceRate.ts";

export const useInsuranceRateRepository = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getInsuranceRate = useCallback((body: InsuranceRateRequest): Promise<InsuranceRate> => {
        setLoading(true);
        return fetch('/rate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        })
            .then(async res => {
                if (!res.ok) throw new Error("Network error");
                return Promise.resolve(await res.json());
            })
            .then(json => {
                setError(null);
                return Promise.resolve(json as unknown as InsuranceRate);
            })
            .catch(err => {
                setError(err.message);
                return Promise.reject(err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    return {
        getInsuranceRate,
        loading,
        error
    }
}