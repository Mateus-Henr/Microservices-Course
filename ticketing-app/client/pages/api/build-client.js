import axios from 'axios';

export default ({req}) =>
{
    // By making the request from the server, the http request will be issued inside the container, that's why when
    // using SSR, we get an error when doing the below:
    //  axios.get('/api/users/currentuser');

    // Deciding whether we are on the server or the browser
    if (typeof window === 'undefined')
    {
        // we are on the server, base url is as below:
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers // Sending headers forward.
        });
    }

    // We are on the browser, base url is empty string.
    return axios.create({
        baseURL: '/'
    });
};
