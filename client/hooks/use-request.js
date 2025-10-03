import axios from 'axios';
import { useState } from 'react';


/**
 * Custom React hook for making HTTP requests and handling errors.
 * Returns a function to perform the request and any errors encountered.
 *
 * Args:
 *   url (string): The endpoint to send the request to.
 *   method (string): The HTTP method to use (e.g., 'get', 'post').
 *   body (object): The request payload.
 *
 * Returns:
 *   Object: Contains the doRequest function and errors state.
 */
export default ({ url, method, body }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            const response = await axios[method](url, body);
            return response.data;
        } catch (err) {
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oops...</h4>
                    <ul className="mb-0">
                        {err.response.data.errors.map((err) => (
                            <li key={err.message}>{err.message}</li>
                        ))}
                    </ul>
                </div>

            );
            return;
        }

    };

    return { doRequest, errors };
};
