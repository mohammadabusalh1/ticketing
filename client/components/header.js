import Link from 'next/link';
import useRequest from '../hooks/use-request';
import { useRouter } from 'next/router';

const Header = ({ user }) => {

    const router = useRouter();
    const { doRequest: signout } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        onSuccess: () => {
            router.push('/auth/signin');
        }
    });

    const handleSignout = () => {
        signout();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link href="/" className="navbar-brand">Ticketing</Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {user ? (
                            <>
                                <li className="nav-item me-2 d-flex align-items-center">
                                    <span className="nav-link disabled">{user.email}</span>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={handleSignout}
                                    >
                                        Sign Out
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item me-2">
                                    <Link href="/auth/signin" className="nav-link">Sign In</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/auth/signup" className="nav-link">Sign Up</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;


