import { BaseSyntheticEvent } from "react";
import Form  from "react-bootstrap/Form";

interface Config {
    label: string;
    value: string | number;
    onChange: (event: BaseSyntheticEvent) => void;
    options: Option[];
}

interface Option {
    key: number;
    value: string | number;
    text: string;
}

const Select = ({
    label,
    value,
    onChange,
    options,
}: Config) => {
    return (
        <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Form.Select value={value} onChange={onChange}>
            <option value="0">Select an option</option>
            {options.map(option =>
                <option
                    key={option.key}
                    value={option.value}
                >
                    {option.text}
                </option>
            )}
        </Form.Select>
    </Form.Group>
    )
};

export default Select;