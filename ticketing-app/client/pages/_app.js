import 'bootstrap/dist/css/bootstrap.css';

// All components are going to pass through this component. That's why global CSS is imported here.
export default ({Component, pageProps}) =>
{
    return <Component {...pageProps} />
};
