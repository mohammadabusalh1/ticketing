export default {
    /**
     * Modifies the webpack configuration to set watchOptions.poll to 300ms.
     * This allows Next.js to detect file changes and rebuild the application
     * every 300ms, which is useful for development.
     * @param {Object} config - The webpack configuration object.
     * @returns {Object} - The modified webpack configuration object.
     */
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 300, // check for changes every 300ms
            ...config.watchOptions,
        };
        return config;
    },
};
