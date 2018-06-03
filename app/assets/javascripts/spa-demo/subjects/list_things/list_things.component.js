(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .component("sdListThings", {
      templateUrl: thingsTemplateUrl,
      controller: ListThingsController,
    });

  thingsTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function thingsTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.list_things_html;
  }    

  ListThingsController.$inject = ["$scope",
                                     "spa-demo.subjects.listImagesThings"];
  function ListThingsController($scope,ListImagesThings) {
    var vm=this;
    // vm.thingClicked = thingClicked;
    // vm.isCurrentThing = currentSubjects.isCurrentThingIndex;

    vm.$onInit = function() {
      console.log("ListThingsController",$scope);
    }
    vm.$postLink = function() {
      $scope.$watch(
        function() { return ListImagesThings.getThings(); }, 
        function(things) { vm.things = things; }
      );
    }    
    return;
    //////////////
    function thingClicked(index) {
      currentSubjects.setCurrentThing(index);
    }    
  }


})();
