
## MEJORAR LA ARQUITECTURA DE NUESTRA API
#
* Factory:  según el parámetro pasado por línea de comando al iniciar el servidor se devuelve la persistencia
* DAO:  provee los métodos de acceso a la fuente de datos devuelta por Factory, a través del contenedor de persistencia que a su vez contiene los métodos de operaciones CRUD
* DTO:  se implementó para la obtención de datos de usuarios, descartando la información que no es solicitada por el frontend
* Singleton:  se implementó en las DAOs para asegurar instanciarlas sólo una vez.  A modo de comprobación se incluyó una variable "this.random = Math.random(100)" en el constructor del contenedor de métodos de persistencia y se verificó que al instanciar dos veces el valor de la variable es idéntico
* Repository:  se implementó en mensajes (que tienen persistencia en mongo) y productos (persistencia en mongo o firebase, según se requiera al poner en marcha el server)


#
*  TODO: Cambio de password en menú "Mis datos" - Control stock - Filtros de búsqueda de usuarios en control de usuarios y filtros en listado de productos pág principal