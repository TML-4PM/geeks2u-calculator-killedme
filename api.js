exports.handler = async function (event, context) {
    const { email, quoteDetails } = JSON.parse(event.body);

    try {
        // Email sending logic here (Mailgun, SendGrid, etc.)
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Quote sent successfully!" })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error sending email." })
        };
    }
};
