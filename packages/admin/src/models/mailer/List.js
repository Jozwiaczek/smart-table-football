const MailerList = ({ history, location }) => {
  const { pathname } = location;
  const isMailer = Boolean(pathname.match(/^\/mailer$/));

  if (isMailer) {
    history.replace(`${pathname}/create`);
  }
  return null;
};

export default MailerList;
