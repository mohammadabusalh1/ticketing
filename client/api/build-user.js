import axios from 'axios';

export default async ({ req }, path) => {
    if (typeof window === 'undefined') {
        // Convert rawHeaders to a proper headers object
        const headers = {};
        for (let i = 0; i < req.rawHeaders.length; i += 2) {
            headers[req.rawHeaders[i]] = req.rawHeaders[i + 1];
        }

        try {
            const { data } = await axios.get(`http://ingress-nginx-controller.ingress-nginx.svc.cluster.local${path}`,
                {
                    headers: headers
                }
            );
            return { user: data.currentUser };
        } catch (err) {
            // If 401 (Unauthorized), user is not authenticated
            if (err.response && err.response.status === 401) {
                console.log('User is not authenticated');
                return { user: null };
            }
            // Re-throw other errors
            throw err;
        }
    } else {
        try {
            const { data } = await axios.get(`${path}`);
            return { user: data.currentUser };
        } catch (err) {
            // If 401 (Unauthorized), user is not authenticated
            if (err.response && err.response.status === 401) {
                console.log('User is not authenticated');
                return { user: null };
            }
            // Re-throw other errors
            throw err;
        }
    }

}
