import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import { useRouter } from 'next/router';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const { doRequest, errors } = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: { email, password },
        onSuccess: () => router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        await doRequest();
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5">
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4">Sign In</h1>
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {errors}

                                <button type="submit" className="btn btn-primary w-100">
                                    Sign In
                                </button>
                            </form>
                            <div className="mt-3 text-center">
                                <p>
                                    Don't have an account?{' '}
                                    <a href="/auth/signup">Sign Up</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
