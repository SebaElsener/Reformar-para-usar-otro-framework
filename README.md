
## LOGGERS, GZIP Y ANALISIS DE PERFORMANCE
#

* Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro:

**Con compresión**
````
GET	http://localhost:8080/api/info
Estado  200 OK
Versión HTTP/1.1
Transferido 836 B (tamaño 1,58 kB)
````
**Sin compresión**
````
GET http://localhost:8080/api/info
Estado  200 OK
Versión HTTP/1.1
Transferido 1,82 kB (tamaño 1,58 kB)
````
#

* Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:
Ruta y método de todas las peticiones recibidas por el servidor (info)
Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
Errores lanzados por las apis de mensajes y productos, únicamente (error)

Ver archivo **/log/logs.log**

#
* Perfilamiento del servidor (*con console.log ruta /api/info*):

Ver archivos:

**/profiling/processConsole-v8.txt**

**/profiling/ArtilleryConsole.txt**

Modo inspect con Chrome:

Ver archivo **/profiling/NodeInspectConsole.png**

#
* Perfilamiento del servidor (*sin console.log ruta /api/info*):

Ver archivos:

**/profiling/processSinConsole-v8.txt**

**/profiling/ArtillerySinConsole.txt**

Modo inspect con Chrome:

Ver archivo **/profiling/NodeInspectSinConsole.png**

#
* Operaciones con *Autocannon*
Ver archivos:

**/profiling/Autocannon.png**

**/profiling/flamegraph.html**

#
**Conslusión:**  Al agregar la salida por console.log de la información que muestra la ruta /info, y ser un proceso bloqueante, demora más los procesos de carga.