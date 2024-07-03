import Alert from "react-bootstrap/Alert";

interface Props {
    type: 'success' | 'danger';
    onClose: () => void;
    header: string;
    message: string;
}

const CustomAlert = ({
    type,
    onClose,
    header,
    message
}: Props) => {
    const defaultMessage = 'Make sure you selected filled all options and try again.';
    return (
        <Alert variant={type} onClose={onClose} dismissible>
            <Alert.Heading>{header}</Alert.Heading>
            <p>
                {(message) ?
                    message :
                    defaultMessage
                }
            </p>
        </Alert>
    )
}

export default CustomAlert;