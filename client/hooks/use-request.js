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
 *   onSuccess (function): A callback function to be called when the request is successful.
 *   we use onSuccess to avoid if the signup failed, so we can redirect to the home page
 *   only if the signup is successful, we can redirect to the home page
 *
 * Returns:
 *   Object: Contains the doRequest function and errors state.
 */
export default ({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);

    const doRequest = async () => {
        try {
            const response = await axios[method](url, body);
            setErrors(null);
            if (onSuccess) {
                onSuccess(response.data);
            }
            return response.data;
        } catch (err) {
            const responseErrors = err?.response?.data?.errors;
            setErrors(
                <div className="alert alert-danger">
                    <h4>Oops...</h4>
                    <ul className="mb-0">
                        {(Array.isArray(responseErrors) ? responseErrors : [{ message: err?.message || 'Something went wrong' }]).map((e, idx) => (
                            <li key={e.message || idx}>{e.message || 'Unexpected error'}</li>
                        ))}
                    </ul>
                </div>

            );
            return;
        }

    };

    return { doRequest, errors };
};
