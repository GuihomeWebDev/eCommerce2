//declaration module garette + rootScope pour panier 
var app = angular.module('garette', ['ngRoute'])
        .run(['$rootScope', function ($rootScope) {
                $rootScope.cart = [];
            }]);
//declaration routes (demande service route
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                //quand le template accueil s'ouvre
                .when('/', {
                    templateUrl: 'assets/view/accueil.html'
                })
                //quand on demande accessoire le template accessoire s'ouvre ainsi que le controller correspondant
                .when('/accessoire', {
                    templateUrl: 'assets/view/maeva.html',
                    controller: 'accessoire'
                })
                //idem
                .when('/ecigarette', {
                    templateUrl: 'assets/view/guihome.html',
                    controller: 'ecigarette'
                })
                //idem
                .when('/liquide', {
                    templateUrl: 'assets/view/vero.html',
                    controller: 'liquide'
                            //idem
                })
                .when('/autre', {
                    templateUrl: 'assets/view/quentin.html',
                    controller: 'autre'
                })
                //autre cas=else on se redirige sur accueil
                .otherwise({redirectTo: '/'});
    }]);
//declaration controleur qui recupère index du dernier élément
app.controller('accueil', ['$http', '$scope', function ($http, $scope) {
        //enlève element du panier
        $scope.remove = function (index) {
            $scope.cart.splice(index, 1);
        };
        //declaration du total avec quantite dans le panier
        $scope.total = function () {
            var total = 0;
            //boucle qui reprend la longueur du tableau panier + 1
            for (var i = 0; i < $scope.cart.length; i++) {
                //total = total + index prix du panier * index quantite du panier
                total += $scope.cart[i].price * $scope.cart[i].quantity;
            }
            ;
            //retourne résultat opération
            return total;
        };
        $http.get('assets/js/orbit.json').then(function (data) {
            $scope.orbit = data.data;
        });
        $scope.showRandom = function (){
            return Math.floor(Math.random()* $scope.orbit.length);  
        };
    }]);
//declaration controleur accessoire
app.controller('accessoire', ['$http','$scope', function ($http,$scope) {
        //objet json
        $http.get('assets/js/accessoires.json').then(function (data) {
            $scope.accessories = data.data;
        });
        //bouton qui ajoute nom prix description photo quantite
        $scope.add = function (index) {
            $scope.cart.push({name: this.accessories[index].name, price: this.accessories[index].price, img: this.accessories[index].image, description: this.accessories[index].description, quantity: 1});
        };
    }]);
//declaration controleur ecigarette
app.controller('ecigarette', ['$scope', '$http', function ($scope, $http) {
        //qui recupere les donnees ecig du  fichier json pour les afficher
        $http.get('assets/js/ecigs.json').then(function (data) {
            $scope.ecigs = data.data;
        });
        $scope.add = function (index) {
            $scope.cart.push({name: this.ecigs[index].name, price: this.ecigs[index].prix, img: this.ecigs[index].img, description: this.ecigs[index].descriptif, quantity: 1});
        };
    }]);

app.controller('liquide', ['$http', '$scope', function ($http, $scope) {
        $http.get('assets/js/gout.json').then(function (data) {
            $scope.gouts = data.data;
        });
        $scope.add = function (index) {
            $scope.cart.push({name: this.gouts[index].name, price: this.gouts[index].prix, img: this.gouts[index].img, description: this.gouts[index].description, quantity: 1});
        };
    }]);
app.controller('autre', ['$http', '$scope', function ($http, $scope) {
        $http.get('assets/js/autre.json')
                .then(function (rep) {
                    $scope.autres = rep.data;
                });
        $scope.add = function (index) {
            $scope.cart.push({name: this.autres[index].name, price: this.autres[index].prix, img: this.autres[index].img, description: this.autres[index].description, quantity: 1});
        };
    }]);