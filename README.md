![Pokemon](https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg =100x) \

# PokeData

Proyecto realizado con React, Material-U y Google Chart consumiendo datos desde [PokéAPI](https://pokeapi.co/) y desplegado en [Pokedata](https://pokedata-react.herokuapp.com/)


## Cómo usar

Las credenciales de acceso del usuario dummy son: 

- user: ash_ketchum
- password: pikachu123

## Características

1. Responsive.
2. Vistas protegidas.
3. Vista de inicio de sesión sin llamado a la API:
      - Valida usuario y contraseña.
      - Si el usuario está autenticado, al ingresar a la app, es redirigido a la vista principal en lugar del login.
4. Petición optimizada mediante GraphQL.
5. Barra de navegación inferior para dispositivos medianos (tablets y teléfonos) y superior para desktop.
      - Dos vistas implementadas, una principal y otra de favoritos.
      - Listado de pokémon scrolleable.
      - Paginación por cliente, se obtienen los datos mínimos para una primera impresión y se paginan automáticamente.
      - Botón de favorito en cada elemento que persiste cuando la aplicación es recargada. 
      - Listado de pokemon favoritos que persiste cuando la aplicación es recargada. 
  
6. Vista de detalles
      - El usuario puede navegar por la vista de detalles al clickear sobre un pokémon en específico.
      - Gráfico con las estadísticas principales del Pokémon seleccionado.
  
7. Barra de búsqueda que permite encontrar a los pokémon por nombre
8. Opción de filtrar los pokémon por tipo.
9. Animaciones de transición entre vista principal y vista de detalles. 


## Prospectos

- Agregar más información a la vista detalles.
- Convertirla en PWA.