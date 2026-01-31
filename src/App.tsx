import './App.css'
import {useInsuranceRateService} from "./rate/useInsuranceRateService.ts";
import {Alert, Button, Container, Form, InputGroup} from "react-bootstrap";
import {type FormEvent, useCallback, useState} from "react";
import type {InsuranceRate} from "./rate/insuranceRate.ts";

const FieldNames = {
    mileage: 'mileage',
    carType: 'carType',
    zipCode: 'zipCode',
};

function App() {
    const {getRate} = useInsuranceRateService();
    const [result, setResult] = useState<InsuranceRate | null>(null);

    const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page reload
        const formData = new FormData(e.currentTarget);
        const mileageRaw = formData.get(FieldNames.mileage);
        const carType = formData.get(FieldNames.carType);
        const zipCode = formData.get(FieldNames.zipCode);

        if (
            typeof mileageRaw !== 'string' ||
            typeof carType !== 'string' ||
            typeof zipCode !== 'string'
        ) {
            return;
        }

        const mileage = Number(mileageRaw);
        if (Number.isNaN(mileage)) {
            return;
        }

        getRate(mileage, formData.get(FieldNames.carType) + '', formData.get(FieldNames.zipCode) + '')
            .then(value => setResult(value));
        return;
    }, [getRate]);

    return (
        <Container className={'p-4'}>
            <h3 className={'mb-5'}>Versicherungsrate/ -bonus berechnen</h3>

            <Form onSubmit={handleSubmit}>
                <InputGroup className={'mb-3'}>
                    <InputGroup.Text className={'flex-shrink-0 w-25'} id={FieldNames.mileage}>Kilometerstand</InputGroup.Text>
                    <Form.Control
                        placeholder={'10000'}
                        aria-label={'Kilometerstand'}
                        aria-describedby={FieldNames.mileage}
                        name={FieldNames.mileage}
                    />
                </InputGroup>
                <InputGroup className={'mb-3'}>
                    <InputGroup.Text className={'flex-shrink-0 w-25'} id={FieldNames.carType}>Auto Typ</InputGroup.Text>
                    <Form.Control
                        placeholder={'SUV'}
                        aria-label={'Auto Typ'}
                        aria-describedby={FieldNames.carType}
                        name={FieldNames.carType}
                    />
                </InputGroup>
                <InputGroup className={'mb-3'}>
                    <InputGroup.Text className={'flex-shrink-0 w-25'} id={FieldNames.zipCode}>Postleitzahl</InputGroup.Text>
                    <Form.Control
                        placeholder={'50374'}
                        aria-label={'Postleitzahl'}
                        aria-describedby={FieldNames.zipCode}
                        name={FieldNames.zipCode}
                    />
                </InputGroup>
                <Button color={'primary'} type={'submit'}>Berechnen</Button>
            </Form>

            {result && (
                <Alert variant="success" className="mt-3">
                    <div>Monatliche Rate: {result.rate.toLocaleString('de-DE', {style: 'currency', currency: 'EUR'})}</div>
                    <div>Nicht Versteckter Wert, präzise Errechnung: {result.ratePrecise}</div>
                </Alert>
            )}
        </Container>
    )
}

export default App
