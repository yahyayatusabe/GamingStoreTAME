
**ls**
Sirve para listar los archivos y carpetas dentro del directorio actual.

* `ls` muestra los archivos y carpetas normales.
* `ls -l` muestra los detalles (permisos, propietario, tamaño, fecha…).
* `ls -a` incluye los archivos ocultos (los que empiezan con un punto).
* `ls -lh` muestra los tamaños en formato legible (KB, MB, etc.).

**mkdir**
Crea nuevas carpetas.

* `mkdir nombrecarpeta` crea una carpeta simple.
* `mkdir -p ruta1/ruta2` crea subcarpetas incluso si las carpetas intermedias no existen.

**rmdir**
Elimina carpetas vacías.

* `rmdir carpeta` borra la carpeta solo si no tiene nada dentro.
  Si tiene archivos, usa `rm -r carpeta` (aunque este último hay que usarlo con cuidado).

**rm**
Sirve para borrar archivos o carpetas.

* `rm archivo.txt` borra un archivo.
* `rm -r carpeta` borra una carpeta y todo su contenido.
* `rm -rf carpeta` borra sin pedir confirmación (peligroso, úsalo solo si sabes lo que haces).


**cp**
Copia archivos o carpetas.

* `cp archivo.txt /ruta/` copia un archivo a otra ubicación.
* `cp -r carpeta1 carpeta2` copia carpetas completas de forma recursiva.

**mv**
Mueve o renombra archivos y carpetas.

* `mv archivo.txt /ruta/` mueve el archivo a otro sitio.
* `mv viejo.txt nuevo.txt` renombra el archivo.
  Funciona igual con carpetas.

**cat**
Muestra el contenido de un archivo directamente en la terminal.

* `cat archivo.txt` muestra todo el contenido.
  También se puede usar para crear archivos:
* `cat > nuevo.txt` escribe lo que pongas y se guarda con Ctrl + D al finalizar.

  
**find**
Sirve para buscar archivos y carpetas dentro de una ruta.

* `find /ruta -name "archivo.txt"` busca un archivo concreto.
* `find . -name "*.txt"` busca todos los archivos `.txt` dentro del directorio actual y sus subcarpetas.

**sudo**
Ejecuta un comando con permisos de administrador (root).

* `sudo comando` hace que el comando tenga privilegios elevados.
  Ejemplo: `sudo apt install nombre` instala un programa.
  Sin “sudo”, algunos comandos te dirán “permiso denegado”.


**vi**
Editor de texto dentro de la terminal (básico pero potente).

* `vi archivo.txt` abre o crea el archivo.
  Dentro de vi:

  * Pulsa **i** para escribir (modo inserción).
  * Pulsa **Esc** para salir del modo inserción.
  * Escribe **:w** para guardar.
  * Escribe **:q** para salir.
  * Escribe **:wq** para guardar y salir.
  * Escribe **:q!** para salir sin guardar.

**chmod**
Cambia los permisos de archivos o carpetas.

* `chmod +x archivo.sh` da permiso de ejecución.
* `chmod 755 archivo.sh` da permisos típicos de script ejecutable (el dueño puede todo, los demás pueden leer y ejecutar).
* `chmod 644 archivo.txt` da permisos de lectura y escritura solo al dueño.


**clear**
Limpia la pantalla de la terminal, dejando solo el prompt limpio.

* `clear` lo borra todo visualmente.
  Atajo rápido: **Ctrl + L** hace lo mismo.


**echo**
Muestra texto o variables en pantalla.

* `echo "Hola Mundo"` muestra ese texto.
* `echo $USER` muestra el nombre del usuario actual.
  También se usa para escribir en archivos:
* `echo "Texto nuevo" > archivo.txt` sobrescribe el archivo.
* `echo "Texto añadido" >> archivo.txt` agrega texto al final sin borrar lo anterior.
