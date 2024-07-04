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

type FruitPurchase = {
    fruitId: number;
    amount: number;
}
function FruitPurchase() {

    const [locations, setLocations] = useState<Location[]>([]);
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<number>(0);
    const [formSubmitDisabled, setFormSubmitDisabled] = useState<boolean>(true);
    const [alertState, setAlertState] = useState<AlertState>({
        show: false,
        header: 'Oh snap! You got an error!',
        message: '',
        type: 'danger'
    });
    const [fruitPurchases, setFruitPurchases] = useState<FruitPurchase [] | []>([{fruitId: 0, amount: 0}]);
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
    }, [selectedLocation, fruitPurchases]);

    const resetAlertState = () => {
        setAlertState({
            show: false,
            header: 'Oh snap! You got an error!',
            message: '',
            type: 'danger'
        });
    }

    const isFormValid = (): boolean => {
        return selectedLocation !== 0 && fruitPurchases.length > 0 && fruitPurchases.every(fruit => fruit.fruitId !== 0 && fruit.amount > 0);
    }

    const handleLocationChange = (event: BaseSyntheticEvent) => {
        setSelectedLocation(event.target.value);
    }

    const handleFruitPurchaseChanges = ( index: number, property : 'fruitId' | 'amount', value: number) => {
        const newRows = [...fruitPurchases];
        newRows[index][property] = Number(value);
        setFruitPurchases(newRows);
    }

    const addFruitPurchaseRow = () => {
        setFruitPurchases([...fruitPurchases, {fruitId: 0, amount: 0}]);
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
                fruits: fruitPurchases,
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
                        <Row>
                        <CustomButton variant={'outline-primary'} onClick={addFruitPurchaseRow} isDisabled={false}
                                      text=' + Add Fruit'/>
                        </Row>
                {fruitPurchases.map((fruit,index) => (
                    <Row key={index}>
                        <Col>
                            <Select
                                label="Fruit"
                                value={fruit.fruitId}
                                onChange={(e) => handleFruitPurchaseChanges(index, 'fruitId', e.target.value)}
                                options={fruits.map(fruit => ({key: fruit.id, value: fruit.id, text: fruit.name}))}
                            />
                        </Col>
                        <Col>
                            <Input
                                type="number"
                                label="Amount"
                                value={fruit.amount}
                                onChange={(e) => handleFruitPurchaseChanges(index, 'amount', e.target.value)}
                            />
                        </Col>
                    </Row>
                ))}
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
