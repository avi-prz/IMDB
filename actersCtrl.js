function Acter(firstName,lastName,birthDate,image,site) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.birthDate = birthDate;
  this.site = site;
  this.image = image;
  this.name = (this.firstName + " " + this.lastName).toLowerCase();
  
}

app.controller("actersCtrl", function($scope, $http) {
  var request = {
    method: "get",
    url:"acters.json",// "empty.json",
    dataType: "json",
    contentType: "application/json"
  };

  $scope.acters = new Array();
  
  $http(request).then(
    function(jsonData) {
        var ary = angular.fromJson(jsonData).data;
        for (var i in ary) {
          $scope.acters.push(new Acter(ary[i].firstName, ary[i].lastName,ary[i].birthDate,ary[i].image,ary[i].site));
        }
    },
    function() {
      alert("error");
    }
  );

  $scope.findById = function (id) {
    for (idx in $scope.acters) {
      if ($scope.acters[idx].id == id) {
        return $scope.acters[idx];
        break;
        } 
    }
    return null;
  };

  $scope.goImdb = function(site) {
    window.open(site, "_blank");
  };
    
  $scope.sortProp = "firstName";

  $scope.isExist = function () {
    return $scope.acters.length > 0;
  };

  $scope.sort = function (field) {
    this.sortProp = field;
  };

  $scope.isSelected = false;

  $scope.setSelected = function(acter) {
    for (var i in $scope.acters) {
      if ($scope.acters[i].name != acter.name) {
        $scope.acters[i].isSelected = false;
      } else {
        $scope.acters[i].isSelected=!$scope.acters[i].isSelected;
      }
    }
  };
});
