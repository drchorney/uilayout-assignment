(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .component("sdListImages", {
      templateUrl: imagesTemplateUrl,
      controller: ListImagesController,
    });

  imagesTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function imagesTemplateUrl(APP_CONFIG) {  
    return APP_CONFIG.list_images_html;
  }    

  ListImagesController.$inject = ["$scope",
                                  "spa-demo.subjects.listImagesThings"];
  function ListImagesController($scope,ListImagesThings) {
    var vm=this;
    vm.imageClicked = imageClicked;
    vm.isCurrentImage = ListImagesThings.isCurrentImageIndex;

    vm.$onInit = function() {
      console.log("CurrentImagesController",$scope);
      vm.images = ListImagesThings.getImages();
    }
    return;
    //////////////
    function imageClicked(index) {
      ListImagesThings.setCurrentImage(index);
    }
  }

})();
