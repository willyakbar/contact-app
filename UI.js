class UI {
    updateUI(contacts) {
        const rows = document.querySelector("#contact-list tbody")
        rows.innerHTML = ""

        contacts.forEach(contact => {
            const row = document.createElement("tr")
            Object.entries(contact).forEach(item => {
                const td = document.createElement("td")
                td.append(document.createTextNode(item[1]))
                row.append(td)
            })

            const td = document.createElement("td")

            for (let i = 0; i < 2; i++) {
                const button = document.createElement("button")
                button.dataset.contactid = contact.id
                button.dataset.contactname = contact.name
                button.classList.add("btn", "btn-sm", "mx-1")

                const icon = document.createElement("i")

                if (i == 0) {
                    button.classList.add("delete-contact", "btn-danger")
                    button.setAttribute("title", "delete this contact")
                    icon.classList.add("bi", "bi-trash")
                } else {
                    button.classList.add("change-contact", "btn-warning")
                    button.setAttribute("title", "change this contact")
                    button.dataset.bsToggle = "modal"
                    button.dataset.bsTarget = "#formModal"
                    icon.classList.add("bi", "bi-pencil-square")
                }

                button.append(icon)
                td.append(button)
            }
            row.append(td)

            rows.append(row)
        })
    }

    clearForm(form) {
        for (const item of form) {
            if (item.tagName == "INPUT") {
                item.value = ""
            }
        }
    }

    showAlert(msg, type) {
        const divAlert = document.createElement("div")
        divAlert.classList.add("alert", `alert-${type}`, "alert-dismissible", "fade", "show")
        divAlert.setAttribute("role", "alert")

        const strong = document.createElement("strong")
        strong.append(document.createTextNode(msg))

        const button = document.createElement("button")
        button.setAttribute("type", "button")
        button.classList.add("btn-close")
        button.dataset.bsDismiss = "alert"
        button.setAttribute("aria-label", "close")

        divAlert.append(strong)
        divAlert.append(button)

        const container = document.querySelector(".container")
        const tools = document.getElementById("tools")

        container.insertBefore(divAlert, tools)
    }

    removeAlert() {
        const alert = document.querySelector("div.alert")
        if (alert) {
            alert.remove()
        }
    }

    changeModalForm() {

    }
}