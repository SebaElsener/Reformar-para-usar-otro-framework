
const productsForm = document.getElementById('productsForm')

// Evento nuevo ingreso de producto al servidor
productsForm.addEventListener('submit', (e) => {
    e.preventDefault()
    newProduct = {
        product: productsForm[0].value,
        price: productsForm[1].value,
        stock: productsForm[2].value,
        description: productsForm[3].value,
        code: productsForm[4].value,
        thumbnail: productsForm[5].value
    }
    fetch('/api/productos/',
        {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(res => {
        document.location.reload()}
    )
    // Reset del form luego del ingreso
    productsForm.reset()
})