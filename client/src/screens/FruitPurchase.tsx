import { Button, Col, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { createPurchase } from "../services/ledgersService";
import { BaseSyntheticEvent, useState } from "react";

function FruitPurchase() {

  const locations = [
    { id: 1, name: 'Amsterdam', headcount: 200 },
    { id: 2, name: 'Berlin', headcount: 100 },
    { id: 3, name: 'Paris', headcount: 20 },
    { id: 4, name: 'London', headcount: 50 },
  ];

  const fruits = [
    { id: 1, name: 'Lime' },
    { id: 2, name: 'Tangerine' },
    { id: 3, name: 'Apple' },
    { id: 4, name: 'Mango' },
    { id: 5, name: 'Plum' },
    { id: 6, name: 'Pineapple' },
    { id: 7, name: 'Kiwi' },
    { id: 8, name: 'Pear' },
  ];

  const [selectedPurchaseLocation, setSelectedPurchaseLocation] = useState<number>(0);
  const [selectedFruit, setSelectedFruit] = useState<number>(0);
  const [fruitAmount, setFruitAmount] = useState<number>(0);

  const handlePurchaseLocationChange = (event: BaseSyntheticEvent) => {
    setSelectedPurchaseLocation(event.target.value);
  }

  const handleFruitChange = (event: BaseSyntheticEvent) => {
    setSelectedFruit(Number(event.target.value));
  }

  const handleFruitAmountChange = (event: BaseSyntheticEvent) => {
    setFruitAmount(Number(event.target.value));
  }

  const handlePurchaseSubmit = async () => {
    const response = await createPurchase({
      locationId: selectedPurchaseLocation,
      fruitId: selectedFruit,
      amount: fruitAmount
    });

    if (response) {
      console.log('Purchase created successfully', response);
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
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Select value={selectedPurchaseLocation} onChange={handlePurchaseLocationChange}>
                <option value="0">Select a location</option>
                {locations.map(location =>
                  <option
                    key={location.id + 21}
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
                    key={fruit.id + 100}
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
              <Button variant="primary" onClick={handlePurchaseSubmit}>Submit</Button>
            </Form.Group>
          </Col>
        </Row>
      </Row>
    </Container>
  )
}

export default FruitPurchase;
