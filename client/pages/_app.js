// pages/_app.js

// Import Bootstrap CSS (after installing it with npm)
import "bootstrap/dist/css/bootstrap.css";
import buildUser from "../api/build-user";
import App from "next/app";
import Header from "../components/header";

const MyApp = ({ Component, pageProps }) => {
    // Component = the page you’re trying to load (like index or banana)
    // pageProps = any props (data) you want to send to that page

    return (
        <>
            <Header user={pageProps?.user} />
            <Component {...pageProps} />
        </>
    );
};


MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    const userData = await buildUser(appContext.ctx, '/api/users/currentuser');

    return {
        ...appProps,
        pageProps: {
            ...appProps.pageProps,
            ...userData,
        },
    };
};


export default MyApp;
