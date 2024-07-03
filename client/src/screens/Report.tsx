import { Card, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getReport, getLocations } from "../services/ledgersService";
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { FruitReportResponse, Location, AlertState } from "../types";
import CustomAlert from "../components/Alert";
import Select from "../components/Select";
import CustomButton from "../components/Button";

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
                        <h2>Consumption Report</h2>
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
                            label="Year"
                            value={selectedYear}
                            onChange={handleYearChange}
                            options={years.map(year => ({ key: year, value: year, text: year.toString() }))}
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
