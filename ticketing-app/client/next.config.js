module.exports = {
    webpackDevMiddleware: config => {
        config.watchOptions.poll = 300; // Fix for file detection on containers.
        return config;
    }
};
