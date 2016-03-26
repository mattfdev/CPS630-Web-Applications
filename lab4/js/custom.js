


var app = angular.module('myApp', []); 
app.controller('todoCtrl', function($scope) {
    var jsonData;
    //unnecessary for final
    //$scope.todoList = [{task:'Clean House', complete:false, description:'lost of cleaning'},{task:'Eat Lunch', complete:false, description:'fill stomach with nutrients'}];
    //$scope.todoComplete = [{task:'Study for exam', complete:true, description: 'redo labs for practise'}];
    //needs to prevent duplicates
    $scope.todoComplete = [];
    $scope.todoList = [];
    $scope.todoAdd = function() {
        $scope.todoList.push({task:$scope.todoInput, complete:false, description:$scope.todoDesc});
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
 
    function finishEntry(x){
        $scope.todoComplete.push({task:x.task, complete:true,description:x.description});
        deleteEntry(x);
    };
    $scope.finished = finishEntry;
    function jsonEntry(item){
        $scope.todoList.push({task:item.task, complete:item.complete, description:item.description});
    }
    $scope.handleFiles = function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            // The file's text will be printed here
            jsonData = JSON.parse(event.target.result);
            var todoItems = jsonData.todo;
            angular.forEach(todoItems,function(item){
                if(item.complete){
                    finishEntry(item);
                }
                else{
                    jsonEntry(item);
                }
                
            });
            $scope.$apply();
        };
        reader.readAsText(file);
    }
    
    $scope.redo = function (x) {
        $scope.todoList.push({task:x.task, complete:false, description:x.description});
        var oldList = $scope.todoComplete;
        $scope.todoComplete = [];
        var i = oldList.indexOf(x);
        oldList.splice(i,1);
        angular.forEach(oldList, function(a) {
            $scope.todoComplete.push(a);
        }); 
    };
});

