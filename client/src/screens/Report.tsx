import { Alert, Button, Card, Col, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getReport } from "../services/ledgersService";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { FruitReportResponse } from "../types";

function Report() {
    const [selectedLocation, setSelectedLocation] = useState<number>(0);
    const [selectedYear, setSelectedYear] = useState<number>(0);
    const [reportResult, setReportResult] = useState<FruitReportResponse | null>(null);
    const [formSubmitDisabled, setFormSubmitDisabled] = useState<boolean>(true);
    const [showFormError, setShowFormError] = useState<boolean>(false);
    const [errorAlertMessage, setErrorAlertMessage] = useState<string>('');

    useEffect(() => {
        setFormSubmitDisabled(!isFormValid());
    }, [selectedLocation, selectedYear]);

    const locations = [
        { id: 1, name: 'Amsterdam', headcount: 200 },
        { id: 2, name: 'Berlin', headcount: 100 },
        { id: 3, name: 'Paris', headcount: 20 },
        { id: 4, name: 'London', headcount: 50 },
    ];

    const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];


    const handleLocationChange = (event: BaseSyntheticEvent) => {
        setSelectedLocation(Number(event.target.value));
        setErrorAlertMessage('');
        setShowFormError(false);
    }

    const handleYearChange = (event: BaseSyntheticEvent) => {
        setSelectedYear(Number(event.target.value));
        setErrorAlertMessage('');
        setShowFormError(false);
    }

    const handleSubmit = async () => {
        try {
            if (!isFormValid()) {
                setShowFormError(true);
            }
            const response = await getReport(selectedLocation, selectedYear);
            if (response) {
                setReportResult(response);
            }
        } catch (error) {
            const message = (error as Error)?.message || 'An error occurred while generating the report.';
            setErrorAlertMessage(message);
            setShowFormError(true);
        }
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
                        {showFormError &&
                            <Alert variant="danger" onClose={() => setShowFormError(false)} dismissible>
                                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                <p>
                                    {(errorAlertMessage) ?
                                        errorAlertMessage :
                                        `Make sure you selected both location and year and try again.`
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
