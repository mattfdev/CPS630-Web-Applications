var app = angular.module('myApp', []); 
app.controller('todoCtrl', function($scope) {
    $scope.todoList = [{todoText:'Clean House', description:'lost o cleaning'},{todoText:'Eat Lunch',description:'fill stomach with nutrients'}];
    $scope.todoComplete = [{todoText:'Studty for exam',description: 'redo labs for practise'}];
    //needs to prevent duplicates
    $scope.todoAdd = function() {
        $scope.todoList.push({todoText:$scope.todoInput, description:$scope.todoDesc});
        $scope.todoInput = "";
        $scope.todoDesc = "";
    };

    function deleteEntry(x) {
        var oldList = $scope.todoList;
        $scope.todoList = [];
        var i = oldList.indexOf(x);
        oldList.splice(i,1);
        angular.forEach(oldList, function(a) {
            $scope.todoList.push(a);
        }); 
    };
    $scope.remove = deleteEntry;
    $scope.finished = function(x){
        $scope.todoComplete.push({todoText:x.todoText,description:x.description});
        deleteEntry(x);
    };
    
    $scope.redo = function (x) {
        $scope.todoList.push({todoText:x.todoText,description:x.description});
        var oldList = $scope.todoComplete;
        $scope.todoComplete = [];
        var i = oldList.indexOf(x);
        oldList.splice(i,1);
        angular.forEach(oldList, function(a) {
            $scope.todoComplete.push(a);
        }); 
    };
});
