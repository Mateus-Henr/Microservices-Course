import buildClient from "./api/build-client";
import {get} from 'axios';

// COMPONENT
const LandingPage = ({currentUser}) =>
{
    console.log(currentUser);
    // Making a request from the component.
    // axios.get('/api/users/currentuser');
    return <h1 style={{color: 'red'}}>Landing Page</h1>;
};

// Automatically called when the server renders the component. Used to fetch data.
// When using server side rendering the component only loads once.
// We cannot fetch data from inside a component. Hooks can only be used inside components.
// This function is executed on the server, however when the user is navigating from one page to another while in the
// app, it is executed on the client.
LandingPage.getInitialProps = async (context) =>
{
    const client = buildClient(context);
    const {data} = await client.get('/api/users/currentuser');

    return data;
};

export default LandingPage;
