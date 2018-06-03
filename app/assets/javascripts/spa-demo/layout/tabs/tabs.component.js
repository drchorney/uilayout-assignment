(function() {
  "use strict";

  angular
    .module("spa-demo.layout")
    .component("sdTabs", {
      templateUrl: tabsTemplateUrl,
      controller: TabsController,
      transclude: true,
    })
    .component("sdTab", {
      templateUrl: tabTemplateUrl,
      controller: TabController,
      transclude: true,
      bindings: {
        label: "@"
      },
      require: {
        tabsController: "^^sdTabs"
      }
    })
    ;

  tabsTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function tabsTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.tabs_html;
  }    
  tabTemplateUrl.$inject = ["spa-demo.config.APP_CONFIG"];
  function tabTemplateUrl(APP_CONFIG) {
    return APP_CONFIG.tab_html;
  }    

  TabsController.$inject = ["$state","$scope","spa-demo.subjects.listImagesThings"];
  function TabsController($state,$scope,ListImagesThings) {
    var vm=this;
    vm.tabs=[];
    vm.selectTab = selectTab;

    vm.$onInit = function() {
      //console.log("TabsController",$scope);
    }
    vm.$postLink = function() {
      $scope.$watch(
        function() { return ListImagesThings.getThings(); }, 
        function(things) { 
          console.log($state.current.name);
          if ($state.current.name == "image_things_view") {
            vm.tabs = []; 
          }
        });
    } 

    return;
    //////////////
    function selectTab(tab) {
      angular.forEach(vm.tabs, function(tab){
        tab.selected=false;
      });
      tab.selected=true;
    }
  }

  TabsController.prototype.addTab = function(tab) {
    if (this.tabs.length===0) {
      tab.selected = true;
    }
    this.tabs.push(tab);
  }


  TabController.$inject = ["$scope"];
  function TabController($scope) {
    var vm=this;

    vm.$onInit = function() {
      //console.log("TabController",$scope);
      vm.tabsController.addTab(vm);
    }
    return;
    //////////////
  }
})();
