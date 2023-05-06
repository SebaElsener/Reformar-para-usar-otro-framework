
const userDataForm = document.getElementById('userDataForm')
const nameLastname = document.getElementById('nameLastname')
const direccion = document.getElementById('direccion')
const age = document.getElementById('age')
const phone = document.getElementById('phone')
const avatar = document.getElementById('avatar')
const _id = document.getElementById('_id')

userDataForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const userInfoToUpdate = {
        userDBid: _id.value,
        name: nameLastname.value,
        address: direccion.value,
        age: age.value,
        phone: phone.value,
        avatar: avatar.value,
    }
    await fetch('/api/userdata/',
    {
        method: 'POST',
        body: JSON.stringify(userInfoToUpdate),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.text())
    .then(text => {
        Toastify({
            text: 'DATOS ACTUALIZADOS CON EXITO',
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
    })
})