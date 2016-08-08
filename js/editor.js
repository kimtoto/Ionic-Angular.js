angular.module('App')
.controller('EditorController', function ($scope, $http) {
  $scope.editing = true;

  $scope.view = function(index) {
    $scope.editing = false;
    $scope.content = $scope.notes[index];
  };

  $scope.EditClick = function() {
    $scope.editing = true;
  };

  $scope.CreateClick = function() {
    console.log(this);
    $scope.editing = true;
    $scope.content = {
      title: '',
      content: ''
    };
  };

  $scope.saveClick = function() {
    $scope.content.date = new Date();
    if ($scope.content.id) {
      $http.put('/notes/' + $scope.content.id, $scope.content).
        success(function(data) {
          $scope.editing = false;
        });
    } else {
      $scope.content.id = new Date();
      $http.post('/notes', $scope.content).
        success(function(data) {
          $scope.notes.push = $scope.content;
          $scope.editing = false;
        });
    }
  };

  $scope.deleteClick = function() {
    console.log("deleteClick");
  };

  $http.get('/notes').success(function (data) {
    $scope.notes = data;
  }).error(function (err) {
    $scope.error = 'Could not load notes';
  });

});
