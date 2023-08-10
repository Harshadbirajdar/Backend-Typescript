import nodemailer from "nodemailer";
import config from "../config";
import logger from "../logger";
import ejs from "ejs";
import path from "path";

const transport = nodemailer.createTransport(config.email);

transport
  .verify()
  .then(() => logger.info("Connected to email server"))
  .catch(() => {
    logger.error("Unable to connect to email server.");
  });

const sendEmail = async (to: string, subject: string, html: string) => {
  const msg = { from: config.email.from, to, subject, html };
  await transport.sendMail(msg);
};

const sendVerificationMail = async (
  to: string,
  name: string,
  token: string
) => {
  const subject = "Email Verification";

  const template = path.join(__dirname, "../template/verification.ejs");
  const url = config.verifyUrl + encodeURIComponent(token);

  const data = await ejs.renderFile(template, { name, url });

  return sendEmail(to, subject, data);
};

export default {
  sendVerificationMail,
};
