const http = require('http');
const contacts = require('./contacts')
const hostname = '127.0.0.1';
const {Command} = require("commander")
const port = 3000;
const program = new Command
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);
contacts
const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      contacts.listContacts()
      break;

    case 'get':
      contacts.getContactById(id)
      break;

    case 'add':
      contacts.addContact(name, email, phone)
      break;

    case 'remove':
      contacts.removeContact(id)
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);




