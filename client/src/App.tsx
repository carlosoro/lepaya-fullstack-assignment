import { Button, Card, Col, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getReport } from "./services/ledgersService";
import { BaseSyntheticEvent, useState } from "react";

interface ReportResponse {
  data: ReportResult;
}

interface ReportResult {
  mostConsumedFruit: MostConsumedFruit;
  averageFruitConsumption: number;
}

interface MostConsumedFruit {
  fruitId: string;
  amount: number;
  name: string;
}

function App() {

  const locations = [
    { id: 1, name: 'Amsterdam', headcount: 200 },
    { id: 2, name: 'Berlin', headcount: 100 },
    { id: 3, name: 'Paris', headcount: 20 },
    { id: 4, name: 'London', headcount: 50 },
  ];

  const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];

  const [selectedLocation, setSelectedLocation] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [reportResult, setReportResult] = useState<ReportResult | null>(null);

  const handleLocationChange = (event: BaseSyntheticEvent) => {
    setSelectedLocation(event.target.value);
  }

  const handleYearChange = (event: BaseSyntheticEvent) => {
    setSelectedYear(event.target.value);
  }

  const handleSubmit = async () => {
    const response: ReportResponse = await getReport(selectedLocation, selectedYear);

    if (response?.data) {
      setReportResult(response.data);
    }
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
              <Button variant="primary" onClick={handleSubmit}>Submit</Button>
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

export default App
