export default {
  filteredMails: state =>
    state.mails.filter(
      mail =>
        (state.mail_filter === 'starred'
          ? mail.isStarred
          : state.mail_filter === mail.mailFolder || mail.labels.includes(state.mail_filter)) &&
        (mail.sender_name.toLowerCase().includes(state.mailSearchQuery.toLowerCase()) ||
          mail.sender.toLowerCase().includes(state.mailSearchQuery.toLowerCase()) ||
          mail.subject.toLowerCase().includes(state.mailSearchQuery.toLowerCase()) ||
          mail.message.toLowerCase().includes(state.mailSearchQuery.toLowerCase()))
    ),
  getMail: state => emailId => state.mails.find(email => email.id === emailId)
};
