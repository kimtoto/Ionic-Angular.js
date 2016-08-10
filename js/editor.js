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
      $http.delete('/notes/' + $scope.content.id).
        success(function(data) {
          var found = -1;
          angular.forEach($scope.notes, function(note, index) {
            if (note.id === $scope.content.id) {
                console.log("found === index::" + found);
                found = index;
            }
          });

          if (found > 0) {
            $scope.notes.splice(found, 1);
            console.log("found < 0");
          }

          $scope.content = {
            title: '',
            content:  ''
          };
        })
        .error(function (err) {
            $scope.error = "Could not load delete note";
            console.log($scope.error);
        });

  };

  $http.get('/notes').success(function (data) {
    $scope.notes = data;
  })
  .error(function (err) {
      $scope.error = 'Could not load notes';
      console.log($scope.error);
  });

});
