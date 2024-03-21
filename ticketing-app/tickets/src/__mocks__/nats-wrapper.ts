export const natsWrapper = {
    client: {

        // Mock function (allow us to use expectations)
        publish: jest.fn().mockImplementation(
            (subject: string, data: string, callback: () => void) =>
            {
                callback();
            })
    }
};
