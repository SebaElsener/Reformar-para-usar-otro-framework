
## SERVIDOR CON BALANCE DE CARGA
#

* Agregar en la vista info, el número de procesadores presentes en el servidor:

````
Argumentos de entrada: C:\Program Files\nodejs\node.exe,C:\Users\Seba\Desktop\Full stack developer\Trabajos\4 - Backend\Segunda entrega del proyecto final 31-01-23\src\server.js
Plataforma: win32
Versión Node.JS: v16.15.0
Carpeta del proyecto: C:\Users\Seba\Desktop\Full stack developer\Trabajos\4 - Backend\Segunda entrega del proyecto final 31-01-23
Path ejecución: C:\Program Files\nodejs\node.exe
ID process: 6464
Memoria total reservada: 60469248
Cantidad de CPUs: 8

````
#
* Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node:

*nodemon src/server.js -p 8080 -m FORK*

````
Microsoft Windows [Versión 10.0.19045.2604]
(c) Microsoft Corporation. Todos los derechos reservados.

C:\nginx-1.23.3>tasklist /fi "imagename eq node.exe"

Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                      8484 Console                    2    48.888 KB
node.exe                      8236 Console                    2    38.572 KB
node.exe                     13740 Console                    2    89.740 KB    58.228 KB
````

*nodemon src/server.js -p 8080 -m CLUSTER*

````
C:\nginx-1.23.3>tasklist /fi "imagename eq node.exe"

Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                      8484 Console                    2    48.900 KB
node.exe                      7636 Console                    2    38.140 KB
node.exe                     10936 Console                    2    89.612 KB
node.exe                     14224 Console                    2    88.912 KB
node.exe                     12728 Console                    2    88.944 KB
node.exe                      3676 Console                    2    87.312 KB
node.exe                      4872 Console                    2    89.020 KB
node.exe                     13220 Console                    2    89.024 KB
node.exe                      7480 Console                    2    88.840 KB
node.exe                      9596 Console                    2    89.220 KB
node.exe                     10488 Console                    2    89.360 KB
````
#
* Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo:

*forever start src/server.js*

````
Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                      5512 Console                   11    32.948 KB
node.exe                     13868 Console                   11    57.968 KB
node.exe                      9692 Console                   11    58.296 KB
node.exe                     14080 Console                   11    57.576 KB
node.exe                      2104 Console                   11    57.968 KB
node.exe                      8688 Console                   11    58.228 KB
node.exe                      7252 Console                   11    58.244 KB
node.exe                     11988 Console                   11    57.996 KB
node.exe                      9732 Console                   11    58.236 KB
node.exe                      7452 Console                   11    57.744 KB

C:\Users\Seba>
````

````
info:    Forever processes running
data:        uid  command                            script
                              forever pid   id logfile                         uptime
data:    [0] UKkP "C:\Program Files\nodejs\node.exe" C:\Users\Seba\Desktop\Full stack developer\Trabajos\4 - Backend\Segunda entrega del proyecto final 31-01-23\src\server.js 12868   13656    C:\Users\Seba\.forever\UKkP.log 0:0:0:9.744
````
#
*  Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo:

*Modo FORK*

pm2 start src/server.js --watch
````
┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ server    │ default     │ 1.0.0   │ fork    │ 5804     │ 22s    │ 8    │ online    │ 0%       │ 59.1mb   │ Seba     │ enabled  │
└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
````
````
Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                      9100 Console                   11    35.372 KB
node.exe                      5804 Console                   11    86.436 KB
node.exe                      3920 Console                   11    82.812 KB
node.exe                      4172 Console                   11    80.272 KB
node.exe                      6140 Console                   11    76.808 KB
node.exe                     12828 Console                   11    77.032 KB
node.exe                     10336 Console                   11    77.512 KB
node.exe                      2292 Console                   11    77.700 KB
node.exe                     16352 Console                   11    78.080 KB
node.exe                      7432 Console                   11    78.380 KB
````

*Modo CLUSTER*

pm2 start src/server.js --watch -i 0

````
┌─────┬───────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id  │ name      │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├─────┼───────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0   │ server    │ default     │ 1.0.0   │ cluster │ 11636    │ 3s     │ 0    │ online    │ 0%       │ 32.9mb   │ Seba     │ enabled  │
│ 1   │ server    │ default     │ 1.0.0   │ cluster │ 8680     │ 3s     │ 0    │ online    │ 0%       │ 32.5mb   │ Seba     │ enabled  │
│ 2   │ server    │ default     │ 1.0.0   │ cluster │ 9052     │ 2s     │ 0    │ online    │ 0%       │ 32.9mb   │ Seba     │ enabled  │
│ 3   │ server    │ default     │ 1.0.0   │ cluster │ 13700    │ 2s     │ 0    │ online    │ 0%       │ 33.0mb   │ Seba     │ enabled  │
│ 4   │ server    │ default     │ 1.0.0   │ cluster │ 2516     │ 2s     │ 0    │ online    │ 0%       │ 32.7mb   │ Seba     │ enabled  │
│ 5   │ server    │ default     │ 1.0.0   │ cluster │ 16928    │ 1s     │ 0    │ online    │ 0%       │ 32.6mb   │ Seba     │ enabled  │
│ 6   │ server    │ default     │ 1.0.0   │ cluster │ 7512     │ 1s     │ 0    │ online    │ 0%       │ 32.3mb   │ Seba     │ enabled  │
│ 7   │ server    │ default     │ 1.0.0   │ cluster │ 16144    │ 1s     │ 0    │ online    │ 0%       │ 32.5mb   │ Seba     │ enabled  │
└─────┴───────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
````
````
Nombre de imagen               PID Nombre de sesión Núm. de ses Uso de memor
========================= ======== ================ =========== ============
node.exe                      9100 Console                   11    48.700 KB
node.exe                     11636 Console                   11    29.440 KB
node.exe                      8680 Console                   11    29.488 KB
node.exe                      9052 Console                   11    29.612 KB
node.exe                     13700 Console                   11    30.680 KB
node.exe                      2516 Console                   11    29.384 KB
node.exe                     16928 Console                   11    33.732 KB
node.exe                      7512 Console                   11    33.424 KB
node.exe                     16144 Console                   11    33.364 KB
````
#
*  Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080:

**Comandos utilizados:**

node src/server.js -p 8080 -m CLUSTER

node src/server.js -p 8081 -m CLUSTER


**Configuración nginx:**

````
events {
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream general {
        server 127.0.0.1:8080;
    }

    upstream randoms {
        server 127.0.0.1:8081;
    }

    server {
        listen 80;
        server_name _;
        location / {
            proxy_pass http://general;
        }

        location /api/randoms {
            proxy_pass http://randoms;
        }
    }
}
````
#
*  Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente:

**Comandos utilizados:**

node src/server.js -p 8080 -m CLUSTER

node src/server.js -p 8082 -m CLUSTER
node src/server.js -p 8083 -m CLUSTER
node src/server.js -p 8084 -m CLUSTER
node src/server.js -p 8085 -m CLUSTER

Nota:  también puede usarse el comando *pm2 start ecosystem.config.cjs* que ejecuta el archivo de configuración *ecosystem.config.cjs* con varias aplicaciones y opciones.


**Configuración nginx:**

````
events {
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    upstream general {
        server 127.0.0.1:8080;
    }

    upstream randoms {
        server 127.0.0.1:8082;
        server 127.0.0.1:8083;
        server 127.0.0.1:8084;
        server 127.0.0.1:8085;
    }

    server {
        listen 80;
        server_name _;
        location / {
            proxy_pass http://general;
        }

        location /api/randoms {
            proxy_pass http://randoms;
        }
    }
}
````