var app = angular.module('myApp', []); 
app.controller('todoCtrl', function($scope) {
    $scope.todoList = [{todoText:'Clean House', description:'lost o cleaning'},{todoText:'Eat Lunch',description:'fill stomach with nutrients'}];
    //needs to prevent duplicates
    $scope.todoAdd = function() {
        $scope.todoList.push({todoText:$scope.todoInput, description:$scope.todoDesc});
        $scope.todoInput = "";
        $scope.todoDesc = "";
    };

    $scope.remove = function(x) {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        var i = oldList.indexOf(x);
        var removed = oldList.splice(i,1);
        angular.forEach(oldList, function(a) {
            $scope.todoList.push(a);
        }); 
    };
    
    $scope.finished = function(x){
        alert('archived'+x.description);
    };
    
    $scope.redo = function (x) {
        
    };
});
