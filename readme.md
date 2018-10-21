#Floppy
##Configuración
###Windows
Cambiar en `package.json` todo lo que diga `export` por `set`    
- `export` es para poner variables de entorno en Linux    
- `set` es para poner variables de entorno en Windows

#####Scripts en `package.json`
Todos los comandos para correr el proyecto ponen las variables de entorno    
- `start`: Lo hace con `node`
- `nodemon`: Lo hace con `nodemon`