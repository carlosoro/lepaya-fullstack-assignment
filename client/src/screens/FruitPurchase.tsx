import { Alert, Button, Col, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { createPurchase, getLocations, getFruits } from "../services/ledgersService";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { Location, Fruit, AlertState } from "../types";

function FruitPurchase() {

    const [locations, setLocations] = useState<Location[]>([]);
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [selectedPurchaseLocation, setSelectedPurchaseLocation] = useState<number>(0);
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
    }, [selectedPurchaseLocation, selectedFruit, fruitAmount]);

    const resetAlertState = () => {
        setAlertState({
            show: false,
            header: 'Oh snap! You got an error!',
            message: '',
            type: 'danger'
        });
    }

    const isFormValid = (): boolean => {
        return selectedPurchaseLocation !== 0
            && selectedFruit !== 0
            && fruitAmount > 0;
    }

    const handlePurchaseLocationChange = (event: BaseSyntheticEvent) => {
        setSelectedPurchaseLocation(event.target.value);
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
                locationId: selectedPurchaseLocation,
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
                        Create Purchase
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {alertState.show &&
                            <Alert variant={alertState.type} onClose={() => resetAlertState()} dismissible>
                                <Alert.Heading>{alertState.header}</Alert.Heading>
                                <p>
                                    {(alertState.message) ?
                                        alertState.message :
                                        `Make sure you selected filled all options and try again.`
                                    }
                                </p>
                            </Alert>
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Select value={selectedPurchaseLocation} onChange={handlePurchaseLocationChange}>
                                <option value="0">Select a location</option>
                                {locations.map(location =>
                                    <option
                                        key={location.id}
                                        value={location.id}
                                    >
                                        {location.name}
                                    </option>
                                )}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Fruit</Form.Label>
                            <Form.Select value={selectedFruit} onChange={handleFruitChange}>
                                <option value="0">Select a fruit</option>
                                {fruits.map(fruit =>
                                    <option
                                        key={fruit.id}
                                        value={fruit.id}
                                    >
                                        {fruit.name}
                                    </option>
                                )}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" value={fruitAmount} onChange={handleFruitAmountChange} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" >
                            <Button variant="primary" disabled={formSubmitDisabled ? true : false} onClick={handleSubmit}>Submit</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Row>
        </Container>
    )
}

export default FruitPurchase;
