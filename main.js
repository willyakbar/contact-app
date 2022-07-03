const app = new Contact()
const ui = new UI()

ui.updateUI(app.loadContacts())

const formAdd = document.getElementById("formAdd")
const formModal = document.getElementById("formModal")

formAdd.addEventListener("submit", function (e) {
    const id = this[0].value
    const name = this[1].value
    const phone = this[2].value
    const email = this[3].value

    if (name == "" || phone == "") {
        ui.showAlert("Input fields cannot be empty .", "danger")
    } else {
        const contacts = app.loadContacts()
        const findName = contacts.find(contact => contact.name == name.toLowerCase())
        const findEmail = contacts.find(contact => contact.email == email)

        if (findName) {
            ui.showAlert(`this name " ${name} " has been used .`, "danger")
        } else if (findEmail) {
            ui.showAlert(`this email " ${email} " has been used .`, "danger")
        } else {
            const contact = { id, name, phone, email }
            app.createContact(contact)
            ui.showAlert("New Contact Added .", "success")
            ui.updateUI(app.loadContacts())
            ui.clearForm(formAdd)
        }
    }

    e.preventDefault()
})

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

formModal.addEventListener("shown.bs.modal", () => {
    formAdd[0].value = app.makeContactId()
    formAdd[1].focus()
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
})