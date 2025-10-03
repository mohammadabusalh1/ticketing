// pages/_app.js

// Import Bootstrap CSS (after installing it with npm)
import "bootstrap/dist/css/bootstrap.css";

export default function MyApp({ Component, pageProps }) {
    // Component = the page you’re trying to load (like index or banana)
    // pageProps = any props (data) you want to send to that page

    return <Component {...pageProps} />;
}
