import { Button, Form } from "react-bootstrap";

interface Props {
    variant: string;
    isDisabled: boolean;
    onClick: () => void;
    text: string;
}

const CustomButton = ({
    variant,
    isDisabled,
    onClick,
    text
}: Props) => {
    return (
        <Form.Group className="mb-3" >
            <Button
                variant={variant}
                disabled={isDisabled}
                onClick={onClick}
            >
                {text}
            </Button>
        </Form.Group>
    );
};

export default CustomButton;