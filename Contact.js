class Contact {
    loadContacts() {
        let contacts
        if (localStorage.getItem("contactApp") == null) {
            contacts = []
        } else {
            contacts = JSON.parse(localStorage.getItem("contactApp"))
        }
        return contacts
    }

    makeContactId() {
        let id = ""
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

        for (let i = 0; i < 5; i++) {
            id += characters.charAt(Math.floor(Math.random() * characters.length))
        }

        return id
    }

    createContact(contact) {
        const contacts = this.loadContacts()
        contacts.push(contact)
        localStorage.setItem("contactApp", JSON.stringify(contacts))
    }

    updateContacts(contacts) {
        localStorage.setItem("contactApp", JSON.stringify(contacts))
    }

    getContactByName(name) {
        const contacts = this.loadContacts()
        const contactByName = contacts.find(contact => contact.name == name.toLowerCase())
        return Array(contactByName)
    }
}