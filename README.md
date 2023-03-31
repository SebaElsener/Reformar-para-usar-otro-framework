
## TERCERA ENTREGA DEL PROYECTO FINAL
#

* Ante la incorporación de un usuario, el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global:

Ver archivo:

**/nodemailer/Nuevo registro.png**
#

* Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global:

Ver archivos:

**/nodemailer/Orden de compra.png**
**/twilio/whatsapp al administrador.jpg**
#

* El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso:

Ver archivo:

**/twilio/SMS al cliente.jpg**
#

* Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el endpoint del listado de productos (con el usuario una vez logueado). Verificar los resultados:

Ver archivos:

**/result_cluster.txt**
**/result_fork.txt**
#