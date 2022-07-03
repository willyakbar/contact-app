const app = new Contact()
const ui = new UI()

ui.updateUI(app.loadContacts())

const searchContactByName = document.querySelector("input[type='search']")
searchContactByName.addEventListener("keyup", function () {
    const name = this.value
    const contact = app.getContactByName(name)

    ui.removeAlert()
    if (contact == "") {
        ui.showAlert(`this name " ${name} " is not found !`, "danger")
        ui.updateUI(app.loadContacts())
    } else {
        ui.updateUI(contact)
    }
})

document.addEventListener("click", e => {
    if (e.target.classList.contains("delete-contact")) {
        const name = e.target.dataset.contactname
        if (confirm(`Continue remove ${name} contact ?`)) {
            const id = e.target.dataset.contactid
            const contacts = app.loadContacts()
            const newContacts = contacts.filter(contact => contact.id !== id)

            app.updateContacts(newContacts)
            ui.showAlert("Contact Deleted .", "success")
            ui.updateUI(app.loadContacts())
        }
    }

    if (e.target.classList.contains("add-contact")) {
        ui.setModalForm("addContact")
    }
})