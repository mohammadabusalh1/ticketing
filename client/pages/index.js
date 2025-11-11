import { useState, useEffect } from 'react';
import useRequest from '../hooks/use-request';
import { useRouter } from 'next/router';

const Home = (user) => {
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();

    const { doRequest: signout } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        onSuccess: () => {
            setCurrentUser(null);
            router.push('/auth/signin');
        }
    });

    const handleSignout = () => {
        signout();
    };

    useEffect(() => {
        console.log(user);
        setCurrentUser(user?.user);
    }, [user]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mt-5">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h1 className="card-title mb-0">Welcome to Ticketing</h1>
                                {currentUser ? (
                                    <div className="d-flex align-items-center">
                                        <span className="me-3">Hello, {currentUser.email}</span>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={handleSignout}
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <a href="/auth/signin" className="btn btn-primary me-2">Sign In</a>
                                        <a href="/auth/signup" className="btn btn-outline-primary">Sign Up</a>
                                    </div>
                                )}
                            </div>

                            {currentUser ? (
                                <div className="alert alert-success">
                                    <h4>You are signed in!</h4>
                                    <p>Welcome to the ticketing system. You can now create and manage tickets.</p>
                                </div>
                            ) : (
                                <div className="alert alert-info">
                                    <h4>Please sign in to continue</h4>
                                    <p>You need to be signed in to access the ticketing features.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;