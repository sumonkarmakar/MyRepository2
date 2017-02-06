angular.module('MovieCtrl',[]).controller('MoviesController',function($scope,$http){
		$scope.tagline='Book Your Movies from here!!';

		$scope.booking = 'booking';

		var refresh = function(){
			console.log("Entered movie controller");
			/*$http.get('/movie/getMovie').success(function(response){
				console.log('Read Successfully');
				$scope.moviList = response;
				$scope.movi = "";
			});*/
		};

		refresh();

		$scope.addMovie = function(movi){
			$http.get('http://www.omdbapi.com/?t=${movi.moviTitle}&plot=short&r=json')
            .success(function(response) { 
           
            var movieObj = {};
            for (var key in response) {
                if (key == 'Title' || key == 'Language' || key == 'Poster' || key == 'Genre' || key == 'Director' || key == 'Actors') {
                    movieObj[key] = response[key];

                }
            }
           	$http({
                    method: 'POST',
                    url: '/movie/addMovie',
                     headers: {'Content-Type': 'application/json'},    
                    data: movieObj
                })
                .then(function(response) {
                    console.log(response);
                    console.log("CREATE IS SUCCESSFUL");
                    refresh();
   		});

       // console.log($scope.contact);
     	});
    };

     	$scope.removeMovie = function(movie) {
        //console.log(id);
        $http.delete('/movie/deleteMovie/' + movie._id).success(function(response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editMovie = function(movie) {
        $http.get('/movie/getMovie/' + movie._id).success(function(response) {
            $scope.movi = response[0];
        });
    };

    $scope.updateMovie = function() {
        console.log("REACHED UPDATE");
        console.log($scope.movi._id);
        $http.put('/movie/updateMovie/' + $scope.movi._id, $scope.movi).success(function(response) {
            console.log(response);
            refresh();
        })
    }

  });