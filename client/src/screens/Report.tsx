import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Card, Col, Row, Container } from 'react-bootstrap';
import { getReport, getLocations } from '../services/ledgersService';
import { FruitReportResponse, Location, AlertState } from '../types';
import CustomAlert from '../components/Alert';
import Select from '../components/Select';
import CustomButton from '../components/Button';

function Report() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<number>(0);
    const [selectedYear, setSelectedYear] = useState<number>(0);
    const [reportResult, setReportResult] = useState<FruitReportResponse | null>(
        null
    );
    const [formSubmitDisabled, setFormSubmitDisabled] = useState<boolean>(true);
    const [alertState, setAlertState] = useState<AlertState>({
        show: false,
        header: 'Oh snap! You got an error!',
        message: '',
        type: 'danger',
    });

    useEffect(() => {
        setFormSubmitDisabled(!isFormValid());
        resetAlertState();
    }, [selectedLocation, selectedYear]);

    useEffect(() => {
        const getLocationOptions = async () => {
            const response = await getLocations();
            setLocations(response);
        };
        getLocationOptions();
    }, []);

    useEffect(() => {
        setReportResult(null);
    }, [selectedLocation, selectedYear]);

    const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

    const handleLocationChange = (event: BaseSyntheticEvent) => {
        setSelectedLocation(Number(event.target.value));
    };

    const handleYearChange = (event: BaseSyntheticEvent) => {
        setSelectedYear(Number(event.target.value));
    };

    const handleSubmit = async () => {
        try {
            if (!isFormValid()) {
                setAlertState({
                    show: true,
                    header: 'Oh snap! You got an error!',
                    message: 'Make sure you selected filled all options and try again.',
                    type: 'danger',
                });
            }
            const response = await getReport(selectedLocation, selectedYear);
            if (response) {
                setReportResult(response);
            }
        } catch (error) {
            const message =
                (error as Error)?.message ||
                'An error occurred while generating the report.';
            setAlertState({
                show: true,
                header: 'Oh snap! You got an error!',
                message,
                type: 'danger',
            });
        }
    };
    const resetAlertState = () => {
        setAlertState({
            show: false,
            header: 'Oh snap! You got an error!',
            message: '',
            type: 'danger',
        });
    };
    const isFormValid = (): boolean => {
        return selectedLocation !== 0 && selectedYear !== 0;
    };

    const getLocationName = (): string => {
        const location = locations.find(
            (item) => item.id === Number(selectedLocation)
        );
        return location ? location.name : '';
    };

    return (
        <Container fluid>
            <Row>
                <Row>
                    <Col>
                        {alertState.show && (
                            <CustomAlert
                                type={alertState.type}
                                onClose={resetAlertState}
                                header={alertState.header}
                                message={alertState.message}
                            />
                        )}
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
                            label='Location'
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            options={locations.map((location) => ({
                                key: location.id,
                                value: location.id,
                                text: location.name,
                            }))}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Select
                            label='Year'
                            value={selectedYear}
                            onChange={handleYearChange}
                            options={years.map((year) => ({
                                key: year,
                                value: year,
                                text: year.toString(),
                            }))}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CustomButton
                            variant='primary'
                            isDisabled={formSubmitDisabled}
                            onClick={handleSubmit}
                            text='Get report'
                        />
                    </Col>
                </Row>
            </Row>
            {reportResult ? (
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                Fruit Consumption Report - Location:{' '}
                                <span className='fw-bold'>{getLocationName()}</span> | Year:{' '}
                                <span className='fw-bold'>{selectedYear}</span>
                            </Card.Header>

                            <Card.Body>
                                <Card.Text>
                                    Most consumed fruit: <span className='fw-bold'>{reportResult.mostConsumedFruit.name}</span>
                                </Card.Text>
                                <Card.Text>
                                    Average fruit consumed per person: <span className='fw-bold'>{reportResult.averageFruitConsumption}</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            ) : (
                <></>
            )}
        </Container>
    );
}

export default Report;