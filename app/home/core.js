'use strict';
var scotchTodo = angular.module('scotchTodo', []);
 angular
        .module('scotchTodo')
		.controller('mainController', function ($localStorage, $scope, $mdDialog, $location, todoService, $mdToast, configService, autenticationService) {
		
function mainController($scope, $http) {
	$scope.formData = {};

	$http.get('/api/todos')
		.success(function(data) {
			console.log("passou no ler");
			$scope.todos = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});


	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.filterFunction = function(element) {
		return element.name.match(/^Ma/) ? true : false;
	};


	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	$scope.logOut = function(){
		$location.path('/');
	};

	$scope.editTodo = function(){
		var filterTodos = $scope.todos.filterTodos(function(todo){
			if(todo.editTodo){
				return todo;
			};
		});
		dataService.createTodo(filterTodos);
	};
}
});
