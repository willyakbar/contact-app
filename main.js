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
            app.createContact(id, name, phone, email)
            ui.updateUI(app.loadContacts())
            ui.showAlert("New Contact Added", "success")
            ui.clearForm(this)
        }
    } else if (submitType == "change") {
        const newContacts = contacts.filter(contact => contact.id !== id)
        app.updateContacts(newContacts)
        app.createContact(id, name, phone, email)
        ui.updateUI(app.loadContacts())
        ui.showAlert("Contact Changed", "success")
        ui.clearForm(this)
    }

    e.preventDefault()
})

document.addEventListener("click", e => {

    // btn delete contact on table
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

    // button add contact on tools
    if (e.target.classList.contains("add-contact")) {
        ui.setModalForm("addContact")
    }

    // button change on table
    if (e.target.classList.contains("change-contact")) {
        const id = e.target.dataset.contactid
        const contacts = app.loadContacts()
        const contact = contacts.find(contact => contact.id == id)
        ui.setModalForm("changeContact", contact)
    }

    // button show checkbox on tools
    if (e.target.classList.contains("selected-contact")) {
        const button = e.target

        if (document.querySelector("#contact-list tbody").innerHTML == "") {
            return e.preventDefault()
        }

        button.classList.toggle("active")
        button.innerHTML = ""

        const td = document.querySelector("#contact-list tr th:first-child")
        const checkBoxs = document.querySelectorAll(".form-check-input")

        // button selected active
        if (button.classList.contains("active")) {
            td.classList.add("active")

            const icon = ui.createIcons("bi", "bi-x-circle", "me-2")
            button.append(icon)
            button.append(document.createTextNode("Cancel"))
            button.classList.replace("btn-success", "btn-danger")

            checkBoxs.forEach(checkbox => {
                checkbox.classList.add("active")
            })

            const buttonRemoveSelected = document.createElement("button")
            buttonRemoveSelected.classList.add("btn", "btn-danger", "remove-selected")
            buttonRemoveSelected.append(document.createTextNode("Remove"))

            const areaButtonTools = document.querySelector(".button-tools")
            areaButtonTools.append(buttonRemoveSelected)
        } else {
            document.querySelector(".btn.remove-selected").remove()
            const icon = ui.createIcons("bi", "bi-list-check", "me-2")
            button.append(icon)
            button.append(document.createTextNode("Selected"))
            button.classList.replace("btn-danger", "btn-success")

            td.classList.remove("active")
            checkBoxs.forEach(checkbox => {
                checkbox.classList.remove("active")
                checkbox.checked = false
            })
        }
    }

    // button selectd all
    if (e.target.classList.contains("selected-all")) {
        const button = e.target
        button.classList.toggle("active")

        const inputCheckBox = document.querySelectorAll(".form-check-input")
        if (button.classList.contains("active")) {
            inputCheckBox.forEach(input => input.checked = true)
        } else {
            inputCheckBox.forEach(input => input.checked = false)
        }
    }

    // button remove selected
    if (e.target.classList.contains("remove-selected")) {
        const checkbox = document.querySelectorAll(".form-check-input")
        const selectdContacts = []
        checkbox.forEach(item => {
            if (item.checked == true) {
                selectdContacts.push(item)
            }
        })

        if (selectdContacts == "") {
            ui.showAlert("nothing been selected yet .", "danger")
            return false
        }

        if (confirm("Are you sure to remove some contacts ?")) {
            selectdContacts.forEach(selected => {
                const contacts = app.loadContacts()
                const newContacts = contacts.filter(contact => contact.id !== selected.value)
                app.updateContacts(newContacts)
            })
            ui.showAlert("some contacts has been removed .", "danger")
            ui.updateUI(app.loadContacts())
        }
    }
})