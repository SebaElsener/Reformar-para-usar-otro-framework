
## DIVIDIR EN CAPAS NUESTRO PROYECTO
#

* Se añadieron las carpetas controller, business y persistence, agregando las funciones necesarias para separar las responsabilidades entre capas

* A TERMINAR DE IMPLEMENTAR:  Se agregó un usuario administrador general "admin@admin.com" con password "admin1234", quien tiene exclusivamente permiso para administrar a los demás usuarios (eliminarlos o hacerlos administradores pero solamente para poder ingresar, modificar o eliminar productos).  Esto se hace a través de la modificación del campo "admin" de cada usuario, que al momento de darse de alta es "false" por defecto, y solamente puede ser cambiado por el usuario administrador general.
  
  A la vista de administración de usuarios se accede a través del menú desplegable al pasar el mouse sobre el avatar (solamente se habilita la vista para este usuario)