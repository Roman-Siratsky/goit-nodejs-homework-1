const fs = require("fs")
const path = require("path")
require('colors')


class Contacts {
    constructor() { }
    
    #contactsPath = path.join(__dirname, './db/contacts.json')

    listContacts = () => {
        fs.readFile(this.#contactsPath, 'utf-8', (err, data) => {
            if (err) {
                console.log("Ошибка при чтении файла".red);
                return
            }
            try {
                const result = JSON.parse(data)
                console.table(result);
            } catch (e) {
                console.log(e);
            }
        })
    }

    getContactById = (id) => {
        if (!id.toString()) {
            console.log("Не указан id для нахождения контакта".red);
            return
        }
        fs.readFile(this.#contactsPath, 'utf-8', (err, data) => {
            if (err) {
                console.log("Ошибка при чтении файла".red);
                return
            }
            try {
                const items = JSON.parse(data);
                console.table(items.find(el => el.id == id));
            } catch (e) {
                console.log("Ошибка при парсинге json".red);
            }
        })
    }

    removeContact = (id) => {
        if (!id.toString()) {
            console.log("Не указан id для удаления контакта".red);
            return
        }
        fs.readFile(this.#contactsPath, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                return
            }
            try {
                const result = JSON.parse(data)
                const deletedContact = result.find(el => el.id == id)
                console.log("The contact you want to be removed".yellow);
                console.log(deletedContact);

                const newResult = result.filter(el => el.id != id)
                fs.writeFile(this.#contactsPath, JSON.stringify(newResult), err => {
                    if (err) {
                        console.log("Ошибка при удалении контакта".red);
                        return
                    }
                    console.log("Contact has been removed succesfully".green);
                    console.log("The new Contacts list looks like this".yellow);
                })
                this.listContacts()
            } catch (e) {
                console.log(e);
            }
        })
    }

    addContact = (name, email, phone) => {
        if (!(name && email && phone)) {
            console.log("Не все данные указаны для создания нового контакта".red);
            return
        }
        fs.readFile(this.#contactsPath, 'utf-8', (err, data) => {
            if (err) {
                console.log("Ошибка при чтении файла".red);
            }
            try {
                const result = JSON.parse(data)
                result.push({
                    id: result[result.length - 1].id + 1,
                    name,
                    email,
                    phone
                })
                fs.writeFile(this.#contactsPath, JSON.stringify(result), err => {
                    if (err) {
                        console.log("Ошибка при создании контакта".red);
                    }
                    console.log("Контакт успешно добавлен".green)
                    console.log("Теперь список контактов выглядит так:".yellow);
                    this.listContacts()
                })
            } catch (e) {
                console.log("Ошибка при попытка запарсить json".red);
            }
        })
    }
}



module.exports = new Contacts();