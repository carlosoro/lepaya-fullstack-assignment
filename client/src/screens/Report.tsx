import { Alert, Button, Card, Col, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getReport, getLocations } from "../services/ledgersService";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { FruitReportResponse, Location, AlertState } from "../types";

function Report() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<number>(0);
    const [selectedYear, setSelectedYear] = useState<number>(0);
    const [reportResult, setReportResult] = useState<FruitReportResponse | null>(null);
    const [formSubmitDisabled, setFormSubmitDisabled] = useState<boolean>(true);
    const [alertState, setAlertState] = useState<AlertState>({
        show: false,
        header: 'Oh snap! You got an error!',
        message: '',
        type: 'danger'
    });

    useEffect(() => {
        setFormSubmitDisabled(!isFormValid());
        resetAlertState();
    }, [selectedLocation, selectedYear]);

    useEffect(() => {
        const getLocationOptions = async () => {
            const response = await getLocations();
            setLocations(response);
        }
        getLocationOptions();
    }, [])

    const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];


    const handleLocationChange = (event: BaseSyntheticEvent) => {
        setSelectedLocation(Number(event.target.value));
    }

    const handleYearChange = (event: BaseSyntheticEvent) => {
        setSelectedYear(Number(event.target.value));
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
            const response = await getReport(selectedLocation, selectedYear);
            if (response) {
                setReportResult(response);
            }
        } catch (error) {
            const message = (error as Error)?.message || 'An error occurred while generating the report.';
            setAlertState({ show: true, header: 'Oh snap! You got an error!', message, type: 'danger' });
        }
    }
    const resetAlertState = () => {
        setAlertState({
            show: false,
            header: 'Oh snap! You got an error!',
            message: '',
            type: 'danger'
        });
    }
    const isFormValid = (): boolean => {
        return selectedLocation !== 0 && selectedYear !== 0;
    }

    const getLocationName = (): string => {
        const location = locations.find(item => item.id === Number(selectedLocation));
        return location ? location.name : '';
    }

    return (
        <Container fluid>
            <Row>
                <Row>
                    <Col>
                        Consumption Report
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
                            <Form.Select value={selectedLocation} onChange={handleLocationChange}>
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
                        <Form.Group className="mb-3" >
                            <Form.Label>Year</Form.Label>
                            <Form.Select value={selectedYear} onChange={handleYearChange}>
                                <option value="0">Select a year</option>
                                {years.map(year =>
                                    <option
                                        key={year}
                                        value={year}
                                    >
                                        {year}
                                    </option>
                                )}
                            </Form.Select>
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
            <Row>
                <Col>
                    <Card>
                        <Card.Header>Fruit Consumption Report {reportResult ? ` - Location: ${getLocationName()} | Year: ${selectedYear}` : ''}</Card.Header>
                        <Card.Body>
                            {reportResult ?
                                <>
                                    <Card.Text>Most consumed fruit: {reportResult.mostConsumedFruit.name}</Card.Text>
                                    <Card.Text>Amount consumed: {reportResult.mostConsumedFruit.amount}</Card.Text>
                                </>
                                : `Report will be displayed here.`}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Report;
