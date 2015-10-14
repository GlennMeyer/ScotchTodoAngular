var scottchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$scope.getTodos = function(){
		$http.get('/api/todos')
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			})
			.error(function(err){
				console.log('Error:', data)
			})
	}

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function(){
		$http.post('api/todos', $scope.formData)
			.success(function(data){
				$scope.formData = {};
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error:', data);
			});
	};

	$scope.deleteTodo = function(id){
		console.log('trying to delete!')
		$http.delete('/api/todos/' + id)
			.success(function(data){
				$scope.todos = data;
				console.log(data);
			})
			.error(function(err){
				console.log('Error:', err)
			});
	};
}