const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  const msg = {
    to: email,
    from: "nagariya23nakul@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app ${name}, Let me know how you get along with the app.`,
  };
  sgMail.send(msg);
};

const sendCancellationEmail = (email, name) => {
  const msg = {
    to: email,
    from: "nagariya23nakul@gmail.com",
    subject: "Hope we see you again!",
    text: `Sorry to see you go ${name}, Let me know what else we could have done to keep you.`,
  };
  sgMail.send(msg);
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
