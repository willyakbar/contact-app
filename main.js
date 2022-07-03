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

const form = document.getElementById("form")
form.addEventListener("submit", function (e) {
    const submitType = this.dataset.typeForm

    const id = this[0].value
    const name = this[1].value
    const phone = this[2].value
    const email = this[3].value

    const contacts = app.loadContacts()
    const contact = { id, name, phone, email }

    if (submitType == "add") {
        const nameExist = contacts.find(contact => contact.name == name.toLowerCase())
        const emailExist = contacts.find(contact => contact.email == email)

        if (name == "" || phone == "") {
            ui.showAlert("Input fields cannot be empty .", "danger")
        } else if (nameExist) {
            ui.showAlert(`this name " ${name} " has been used .`, "danger")
        } else if (emailExist) {
            ui.showAlert(`this email " ${email} " has been used .`, "danger")
        } else {
            app.createContact(contact)
            ui.updateUI(app.loadContacts())
            ui.showAlert("New Contact Added", "success")
            ui.clearForm(this)
        }
    } else if (submitType == "change") {
        const newContacts = contacts.filter(contact => contact.id !== id)
        app.updateContacts(newContacts)
        app.createContact(contact)
        ui.updateUI(app.loadContacts())
        ui.showAlert("Contact Changed", "success")
        ui.clearForm(this)
    }

    e.preventDefault()
})

document.addEventListener("click", e => {
    if (e.target.classList.contains("delete-contact")) {
        const name = e.target.dataset.contactname
        if (confirm(`Continue remove ${name} contact ?`)) {
            const id = e.target.dataset.contactid
            const contacts = app.loadContacts()
            const newContacts = contacts.filter(contact => contact.id !== id)

            app.updateContacts(newContacts)
            ui.updateUI(app.loadContacts())
            ui.showAlert("Contact Deleted .", "success")
        }
    }

    if (e.target.classList.contains("add-contact")) {
        ui.setModalForm("addContact")
    }

    if (e.target.classList.contains("change-contact")) {
        const id = e.target.dataset.contactid
        const contacts = app.loadContacts()
        const contact = contacts.find(contact => contact.id == id)
        ui.setModalForm("changeContact", contact)
    }

    if (e.target.classList.contains("selected-contact")) {
        const button = e.target
        button.classList.toggle("active")

        const td = document.querySelector("#contact-list tr th:first-child")
        const checkBoxs = document.querySelectorAll(".form-check-input")

        if (button.classList.contains("active")) {
            td.classList.add("active")
            checkBoxs.forEach(checkbox => {
                checkbox.classList.add("active")
            })
        } else {
            td.classList.remove("active")
            checkBoxs.forEach(checkbox => {
                checkbox.classList.remove("active")
                checkbox.checked = false
            })
        }
    }
})