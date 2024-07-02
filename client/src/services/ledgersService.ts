import axios from 'axios';

export const getReport = async (locationId: number, year: number) => {
    const url = `http://localhost:3000/ledgers/reports`;

    const response = await axios.get(url, {
        params: {
            locationId,
            year
        }
    });
    return response;
}