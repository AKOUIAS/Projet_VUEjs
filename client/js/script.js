window.onload = init;

function init() {
    new Vue({
        el: '#app',
        data: {
            Restau: [0, 1],
            page: 0,
            size: 10,
            selected:'',
            sherch:"",
            nom:"",
            cuisine:"",
            name:"",
            nbr:"",
            Id:""

        },
        mounted() {
            console.log("--- MOUNTED, appelée avant le rendu de la vue ---");
            this.getDataFromWebService();
            this.countRestaurants();
        },
        methods: {

            getDataFromWebService: function () {

                let url = "http://localhost:8080/api/restaurants?page="+this.page+" &name="+this.sherch+"&pagesize="+this.size;
                fetch(url).then((data) => {
                    console.log("les données sont arrivées !  "+url)
                    return data.json();
                }).then((dataEnJavaScript) => {
                    // ici on a bien un objet JS
                    this.Restau = dataEnJavaScript.data;
                });
                this.countRestaurants();
            },
            addRes: function (event) {
                
                event.preventDefault();

                console.log("ha!!! "+this.nom);
               
                var data = new FormData();
                data.append("nom",this.nom);
                data.append("cuisine",this.cuisine);
               
                let url = "http://localhost:8080/api/restaurants";           
                fetch(url, {
                    method: "POST",
                    body: data         
                }).then( (dataEnJavaScript) => {
                    this.getDataFromWebService();
                });
                
            
            },
           countRestaurants: function()
           {
            
            let url = "http://localhost:8080/api/restaurants/count";

            fetch(url).then((data) => {  
                return data.json();
            }).then((dataEnJavaScript) => {
                // ici on a bien un objet JS
                this.nbr = dataEnJavaScript.data;
            });
           },
            removeRestaurant: function (Res){
              
                console.log("   haha "+Res._id);
                             
                fetch("http://localhost:8080/api/restaurants/"+Res._id, {
                  method: "DELETE",
                }).then( (dataEnJavaScript) =>
                {
                    this.getDataFromWebService();
                });
            },
            editRestaurant: function (Res)
            {
                
                this.nom=Res.name;
                this.cuisine=Res.cuisine;
                this.Id=Res._id;
                document.getElementById('dialog').showModal();

            },
            EditReST: function()
            {
                
                document.getElementById('dialog').close();
                var data = new FormData();
                data.append("nom",this.nom);
                data.append("cuisine",this.cuisine);
               
                let url = "http://localhost:8080/api/restaurants/"+this.Id;           
                fetch(url, {
                    method: "PUT",
                    body: data         
                }).then( (dataEnJavaScript) =>
                {
                    this.getDataFromWebService();
                });
            },
            close: function()//pour fermer le POPuP
            {
                document.getElementById('dialog').close();
            },
            getColor: function (index) {
                return (index % 2) ? 'red' : 'green';
            },
            pageNext: function (){
                console.log("page suivante"+this.page+"  "+this.sherch);
                this.page ++;
                this.getDataFromWebService();
            },
            pageBack: function (){
                console.log("page suivante"+this.page);
                if(this.page !== 0)
                {
                    this.page --;
                } 
                this.getDataFromWebService();
            },
            nbrRestaurant: function (){
                this.size=this.selected;
                this.getDataFromWebService();
            },
            sherchRestaurant: function(){
                console.log("chercher "+this.sherch);
                this.getDataFromWebService();   
            }

        }
    })
}
