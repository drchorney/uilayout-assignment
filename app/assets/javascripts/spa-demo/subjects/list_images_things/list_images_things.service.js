(function() {
  "use strict";

  angular
    .module("spa-demo.subjects")
    .service("spa-demo.subjects.listImagesThings", ListImagesThings);

  ListImagesThings.$inject = ["$q","$rootScope","spa-demo.subjects.Image","spa-demo.subjects.ThingImage","spa-demo.subjects.ImageThing","spa-demo.subjects.Thing"];
  function ListImagesThings($q,$rootScope, Image,ThingImage,ImageThing,Thing) {
    var service = this;
    service.imageIdx = null;
    service.things = [];
    service.thingIdx = null;
    service.isCurrentImageIndex = isCurrentImageIndex;
    service.isCurrentThingIndex = isCurrentThingIndex;

    //refresh();
    init();
    $rootScope.$watch(function(){ return service.getCurrentImage(); }, setThings);
    return;
    ////////////////

    function init() {
      service.images = Image.query();
    }
    
    function isCurrentImageIndex(index) {
      //console.log("isCurrentImageIndex", index, service.imageIdx === index);
      return service.imageIdx === index;
    }
    function isCurrentThingIndex(index) {
      //console.log("isCurrentThingIndex", index, service.thingIdx === index);
      return service.thingIdx === index;
    }

    function setThings() {
      console.log(service.imageIdx);

      service.things = [];

      if (service.imageIdx!= null) {
       var image_things = ImageThing.query({image_id:service.imageIdx});
       image_things.$promise.then(function() {
          image_things.forEach(function (item) {
            var thing_id = item.thing_id;
            var thing_name = item.thing_name;
            
            var thing = Thing.get({id: thing_id});
            var images = ThingImage.query({thing_id:thing_id});
            $q.all([thing.$promise,images.$promise]).then(function() {

              images.sort(function(a, b){
                return a.priority - b.priority;
              });

              var image_content_url = images[0].image_content_url;
              var description = thing.description;
              var new_thing = {"thing_id": thing_id, "image_content_url": image_content_url,"thing_name": thing_name, "description": description};
              service.things.push(new_thing);
            })
          })
       })
      }
    }

  }

  ListImagesThings.prototype.getImages = function() {
    return this.images;
  }
  ListImagesThings.prototype.getThings = function() {
    return this.things;
  }
  ListImagesThings.prototype.getCurrentImageIndex = function() {
     return this.imageIdx;
  }
  ListImagesThings.prototype.getCurrentImage = function() {
    return this.images.length > 0 ? this.images[this.imageIdx] : null;
  }

  ListImagesThings.prototype.setCurrentImage = function(index) {
    if (index >= 0 && this.images.length > 0) {
      this.imageIdx = (index < this.images.length) ? index : 0;
    } else if (index < 0 && this.images.length > 0) {
      this.imageIdx = this.images.length - 1;
    } else {
      this.imageIdx = null;
    }

    console.log("setCurrentImage", this.imageIdx, this.getCurrentImage());
    return this.getCurrentImage();
  }

  })();
