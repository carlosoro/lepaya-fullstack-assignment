import { BaseSyntheticEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
    type: 'number';
    label: string;
    value: string | number;
    onChange: (event: BaseSyntheticEvent) => void;
}

const Input = ({
    type,
    label,
    value,
    onChange,
}: Props) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control type={type} value={value} onChange={onChange} />
        </Form.Group>
    );
}

export default Input;