
const usersAdminMakeUserAdmin = document.getElementsByClassName('usersAdminMakeUserAdmin')
const usersAdminDeleteUser = document.getElementsByClassName('usersAdminDeleteUser')
const usersForm = document.getElementById('usersForm')
const usersAdminTd = document.getElementsByClassName('usersAdminTd')

let adminArray = []

// Deshabilitar los checkbox eliminar y administrador del usuario admin
for (let i=0; i<usersAdminTd.length; i++) {
    if (usersAdminTd[i].innerText === 'admin@admin.com') {
        usersAdminTd[i].parentElement.children[1].children[0].disabled = 'true'
        usersAdminTd[i].parentElement.children[2].children[0].disabled = 'true'
    }
}

for (let i=0; i<usersAdminMakeUserAdmin.length; i++) {
    usersAdminMakeUserAdmin[i].addEventListener('change', (e) => {
        const userToMakeAdmin = {
            user: e.target.id,
            admin: e.target.checked
        }
        const userIndex = adminArray.findIndex(user => user.user === userToMakeAdmin.user)
        if (userIndex === -1) { adminArray.push(userToMakeAdmin) }
        else {
            adminArray[userIndex].admin = userToMakeAdmin.admin
        }
    })
}

usersForm.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('/api/userdata/usersadm',
    {
        method: 'PUT',
        body: JSON.stringify(adminArray),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(json => {
        Toastify({
            text: json,
            offset: {
                x: 150,
                y: 150
            },
            duration: 5000,
            newWindow: false,
            close: false,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
          }).showToast()
        
        // Reset del form luego del ingreso
        //usersForm.reset()
        setTimeout(() => {
            document.location.reload()
        }, 5000);
    })
})