 
  var tablaPersonas = new Vue({
  el: '#tablaPersonas',
  data: {
    url: 'https://jsonplaceholder.typicode.com/users', //Desde donde traieré los datos
    filas: [], //Array donde cargaré resultado de la HTTP Request
    pagina: 1, //Pagina de inicio (para el paginado)
    porPagina: 3, //Cantidad de items por página (para el paginado)
    paginas: [], //Array de paginas   
  },
  methods: {
    /**
     * Trae los datos desde el servidor
     * 
     * 
     */ 
    obtenerDatos() {
        axios.get(this.url).then((response) => {
          this.filas = response.data
      });  
    },
    /**
     * Obtiene la cantidad de paginas
     * 
     * 
     */ 
    setPaginas () {
      let numberOfPages = Math.ceil(this.filas.length / this.porPagina);
      for (let index = 1; index <= numberOfPages; index++) {
        this.paginas.push(index);
      }
    },
    /**
     * 
     * 
     */      
    paginar (filas) {
      let pagina = this.pagina;
      let porPagina = this.porPagina;
      let from = (pagina * porPagina) - porPagina; //Desde la fila
      let to = (pagina * porPagina); //Hasta la fila

      return filas.slice(from, to);
    },

  },
  created(){
    this.obtenerDatos();
  },

  watch: {
    filas () {
      this.setPaginas();
    }
  },

  computed: {
    elementosMostrados () {
      return this.paginar(this.filas);
    }
  },

});

