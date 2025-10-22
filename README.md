
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


______________________________________________________________________________________________________________________________________________________________________________________________________________________________

Perfecto, Yahya.
Aquí tienes tu **chuleta completa**, con la parte de **Git** adaptada al mismo formato que la de los **comandos de Linux**: clara, estructurada, y con ejemplos en el mismo estilo.


**git init**
Crea un nuevo repositorio Git en la carpeta actual.
Permite que Git empiece a controlar los archivos de ese directorio.

* `git init` crea el repositorio en la carpeta actual.


**git clone**
Clona un repositorio remoto en tu equipo.
Copia todo el proyecto, incluyendo su historial.

* `git clone URL` clona un repositorio remoto (por ejemplo, desde GitHub).


**git status**
Muestra el estado actual del repositorio.
Indica qué archivos están modificados, cuáles están preparados para commit y en qué rama estás.

* `git status` muestra el estado actual de los archivos y la rama activa.


**git add**
Añade archivos al área de preparación (stage) para incluirlos en el siguiente commit.

* `git add archivo.txt` añade un archivo específico.
* `git add .` añade todos los archivos modificados.


**git commit**
Guarda los cambios añadidos en el historial de Git con un mensaje que describa lo hecho.

* `git commit -m "mensaje"` guarda los cambios con una descripción.


**git push**
Sube los commits locales al repositorio remoto.
Si es la primera vez en una rama nueva, se puede usar la opción -u para establecer el seguimiento con el remoto.

* `git push` sube los commits al remoto.
* `git push -u origin nombre-rama` configura el seguimiento de una nueva rama.


**git pull**
Descarga los últimos cambios del repositorio remoto y los fusiona con la copia local.
Sirve para mantener el repositorio actualizado con el trabajo de los demás.

* `git pull` actualiza tu rama con los cambios del remoto.


**git checkout**
Cambia de rama o restaura archivos.

* `git checkout nombre-rama` cambia a otra rama.
* `git checkout -b nueva-rama` crea una rama nueva y cambia a ella.
* `git checkout archivo.txt` restaura un archivo a la última versión confirmada.


**git branch**
Muestra las ramas existentes o crea una nueva.

* `git branch` muestra todas las ramas locales.
* `git branch nueva-rama` crea una rama nueva.


**git merge**
Combina los cambios de una rama con la actual.
Se usa para integrar el trabajo de distintas ramas.

* `git merge nombre-rama` fusiona esa rama con la actual.


**git fetch**
Descarga los cambios del remoto sin mezclarlos aún con el trabajo local.
Permite revisar qué ha cambiado antes de hacer un pull.

* `git fetch` obtiene las actualizaciones sin aplicarlas.


**git diff**
Muestra las diferencias entre los archivos modificados y la última versión confirmada.

* `git diff` muestra los cambios que aún no se han añadido.
* `git diff --staged` muestra los cambios ya añadidos al área de preparación.


**git log**
Muestra el historial de commits del repositorio.

* `git log` muestra todos los commits con su autor, fecha y mensaje.
* `git log --oneline` muestra el historial en formato corto.


**git restore**
Deshace cambios en archivos sin afectar a los commits anteriores.

* `git restore archivo.txt` revierte un archivo al último commit.
* `git restore --staged archivo.txt` quita el archivo del área de preparación.


**git reset**
Deshace commits recientes.

* `git reset --soft HEAD~1` deshace el último commit, pero mantiene los cambios.
* `git reset --hard HEAD~1` borra el último commit y los cambios (peligroso).


**git remote -v**
Muestra las conexiones configuradas al repositorio remoto.
Sirve para comprobar que el repositorio local está vinculado correctamente.

* `git remote -v` lista las URLs de los repositorios remotos.


**Ciclo básico de trabajo con Git**

1. Asegurarse de estar en la rama correcta.
2. Actualizar los cambios del repositorio remoto (`git pull`).
3. Modificar los archivos necesarios.
4. Añadir los archivos modificados al área de preparación (`git add .`).
5. Confirmar los cambios con un commit y mensaje descriptivo (`git commit -m "mensaje"`).
6. Subir los cambios al repositorio remoto (`git push`).

