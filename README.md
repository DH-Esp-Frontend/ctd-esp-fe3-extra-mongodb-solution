# Mesa de trabajo MongoDB
## Setup inicial 🏁

- Primeramente clonamos el proyecto e instalamos las dependencias
- Luego agregamos las variables de entorno a nuestro archivo ``.env.local``   que van a referenciar a nuestra base de datos. 
```
MONGODB_URI=mongodb+srv://digital:fronteam@cluster0.2eua9bx.mongodb.net/?retryWrites=true&w=majority
DB_NAME=sample_airbnb
```
<br/>
⚙ MONGO_URI será la url que referencie a nuestro cluster y a la cual debemos agregarle nuestras credenciales. En este caso ya las colocamos por vos, <strong>digital</strong> es el usuario y <strong>fronteam</strong> es la password.

⚙ DB_NAME es el nombre específico de la DB a la que estaremos accediendo de nuestro cluster 
<br/>
<br/>
<br/>


## Conexion con MongoDB 🍃
<br/>

- `` pages > index.tsx ``


    -   Primeramente haremos una página con server-side donde nos traeremos todos los posts de los alojamientos disponibles. Para ello en nuestra función getServerSideProps debemos conectarnos a la db y traemos toda la información de una colección. En esta ocasión consumiremos información de la colección “listingsAndReviews”
 ``` js
    const { db } = await connectToDatabase()
    const alojamientos = await db
    .collection("listingsAndReviews")
    .find({})
    .limit(20)
    .toArray();

```
-   Por cada alojamiento deberán renderizar una card que muestre su información.
      
<br/>
<br/>

- `` pages > api > ranked.ts ``


    -   Crearemos una ruta para traernos aquellos alojamientos cuya puntuación será superior a 90. Para ello deberemos conectarnos a la db y traernos la información filtrada de la colección “listingsAndReviews”
    Mongodb ya trae un método filter propio, por lo que la conexion seria la misma y solamente deberán agregar el siguiente filtro:

 ```js  
 ...  
  const top = await db
    .collection("listingsAndReviews")
    .find({})
    .filter({"review_scores.review_scores_rating": {$gte: 90}})
 ... 
```
💡 Tambien podes aplicar directamente el filtro al metodo find

<br/>
<br/>

- `` pages > trend.tsx  ``


    -   Haremos una página estática donde consumiremos nuestra API creada. La conexión tendrá la misma lógica que utilizamos en nuestra página index.tsx
    -  Por cada alojamiento deberán renderizar una card que muestre su información

    -   Deberán agregar un link al Navbar que redirija a la página de trends

<br/>
<br/>


## Consideraciones 

💡 Dentro de la carpeta /utils contas con un archivo mongodb.ts que ya incluye toda la lógica de la conexión a la db. Solamente deben exportar la función connectToDatabase()

💡 Link al repo base: <a href="https://github.com/DH-Esp-Frontend/ctd-esp-fe3-extra-mongodb-base">https://github.com/DH-Esp-Frontend/ctd-esp-fe3-extra-mongodb-base</a>

💡 Extension de MongoDB para vscode
<br/>
<img src="./public/vs-mongo.png" />