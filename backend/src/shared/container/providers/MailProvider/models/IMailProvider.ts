export default interface IMailProvider {
  sendMail(To: string, body: string): Promise<void>;
}
