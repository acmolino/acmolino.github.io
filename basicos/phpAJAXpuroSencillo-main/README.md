# Ejemplos básicos de AJAX

Dos ejemplos, uno con POST y otro con GET.
En el primero, simplemente traemos un mensaje desde el servidor; "HOLA MUNDO"
En el segundo, mandamos dos números al servidor, y el servidor nos devuelve la suma.

## Analizando AJAX
### Objeto XMLHttpRequest
Se utiliza para intercambiar datos con un servidor en segundo plano. En otras palabras, no debemos refrescar la pagina para obtener información.
```JavaScript
var xmlhttp = new XMLHttpRequest();
```
### Enviar Request
```JavaScript
xmlhttp.open("Método", "URL", async); 
```
**Método:** el tipo de solicitud: GET o POST
**URL:** la ubicación del servidor (archivo)
**async:** verdadero (asincrónico) o falso (sincrónico)

```JavaScript
xmlhttp.send();
```

### Agregar datos a la petición
###### GET

Agregamos los datos en la url.
Utilizamos **?** para indicarle que comienzan los datos.

**Ejemplo:**
```JavaScript
datos.php?conf=cargar
```

Si queremos cargar más de un dato, utilizamos **&** como separador


##### POST
Los enviamos en el método SEND
**Ejemplo:**
```JavaScript
xhttp.send("num1=10&num2=8");
```





