const getRequestData = (req) => {
    // Write logic here to read the request body data
    return new Promise((resolve, reject) => {
        try {
            let body = '';

            // Listen for incoming data chunks
            req.on('data', (chunk) => {
                body += chunk.toString();
            });

            // Resolve when the entire body has been received
            req.on('end', () => {
                resolve(body);
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = getRequestData