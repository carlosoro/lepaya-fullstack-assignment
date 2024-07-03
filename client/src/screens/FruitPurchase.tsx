import { Alert, Button, Col, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { createPurchase, getLocations, getFruits } from "../services/ledgersService";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { Location, Fruit, AlertState } from "../types";
import CustomAlert from "../components/Alert";
import CustomButton from "../components/Button";
import Select from "../components/Select";
import Input from "../components/Input";

function FruitPurchase() {

    const [locations, setLocations] = useState<Location[]>([]);
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<number>(0);
    const [selectedFruit, setSelectedFruit] = useState<number>(0);
    const [fruitAmount, setFruitAmount] = useState<number>(0);
    const [formSubmitDisabled, setFormSubmitDisabled] = useState<boolean>(true);
    const [alertState, setAlertState] = useState<AlertState>({
        show: false,
        header: 'Oh snap! You got an error!',
        message: '',
        type: 'danger'
    });

    useEffect(() => {
        const getLocationOptions = async () => {
            const response = await getLocations();
            setLocations(response);
        }
        const getFruitOptions = async () => {
            const response = await getFruits();
            setFruits(response);
        }
        getLocationOptions();
        getFruitOptions();
    }, [])

    useEffect(() => {
        setFormSubmitDisabled(!isFormValid());
        resetAlertState();
    }, [selectedLocation, selectedFruit, fruitAmount]);

    const resetAlertState = () => {
        setAlertState({
            show: false,
            header: 'Oh snap! You got an error!',
            message: '',
            type: 'danger'
        });
    }

    const isFormValid = (): boolean => {
        return selectedLocation !== 0
            && selectedFruit !== 0
            && fruitAmount > 0;
    }

    const handleLocationChange = (event: BaseSyntheticEvent) => {
        setSelectedLocation(event.target.value);
    }

    const handleFruitChange = (event: BaseSyntheticEvent) => {
        setSelectedFruit(Number(event.target.value));
    }

    const handleFruitAmountChange = (event: BaseSyntheticEvent) => {
        const amount = parseFloat(event.target.value) || 0;
        event.target.value = amount;
        setFruitAmount(amount);
    }

    const handleSubmit = async () => {
        try {
            if (!isFormValid()) {
                setAlertState({
                    show: true,
                    header: 'Oh snap! You got an error!',
                    message: 'Make sure you selected filled all options and try again.',
                    type: 'danger'
                });
            }
            const response = await createPurchase({
                locationId: selectedLocation,
                fruitId: selectedFruit,
                amount: fruitAmount
            });

            if (response) {
                setAlertState({
                    show: true,
                    header: 'Great Success!',
                    message: 'Purchase created.',
                    type: 'success'
                });
            }
        } catch (error) {
            const message = (error as Error)?.message || 'An error occurred while Creating the purchase.';
            setAlertState({ show: true, header: 'Oh snap! You got an error!', message, type: 'danger' });
        }
    }

    return (
        <Container fluid>
            <Row>
                <Row>
                    <Col>
                        {alertState.show &&
                            <CustomAlert
                                type={alertState.type}
                                onClose={resetAlertState}
                                header={alertState.header}
                                message={alertState.message}
                            />
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Create Purchase</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Select
                            label="Location"
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            options={locations.map(location => ({ key: location.id, value: location.id, text: location.name }))}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Select
                            label="Fruit"
                            value={selectedFruit}
                            onChange={handleFruitChange}
                            options={fruits.map(fruit => ({ key: fruit.id, value: fruit.id, text: fruit.name }))}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            type="number"
                            label="Amount"
                            value={fruitAmount}
                            onChange={handleFruitAmountChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CustomButton
                            variant='primary'
                            isDisabled={formSubmitDisabled}
                            onClick={handleSubmit}
                            text="Submit" />
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default FruitPurchase;
