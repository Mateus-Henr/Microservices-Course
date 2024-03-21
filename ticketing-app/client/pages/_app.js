import 'bootstrap/dist/css/bootstrap.css';
import buildClient from "./api/build-client";
import Header from "../components/header";

// All components are going to pass through this component. That's why global CSS is imported here.
const AppComponent = ({Component, pageProps, currentUser}) => {
    return (
        <div>
            <Header currentUser={currentUser}/>
            <Component {...pageProps} />
        </div>
    );
};

// Note that the arguments in the 'context' object is different when handling a Custom app component in comparison to a
// page.
AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    const {data} = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (appContext.Component.getInitialProps) // For the pages that don't have the function implemented.
    {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }


    return {
        pageProps,
        ...data
    };
}; // When adding this function to the app component, this same function doesn't work automatically on pages anymore.

export default AppComponent;
