define({
  name: "spamjs.app",
  extend: "spamjs.view",
  modules: ["jqrouter","jQuery"]
}).as(function(app, jqrouter, jQuery) {

  var stompClient;

  return {
    routerEvents: {
      "/boot/*": "openDevSection",
      "/boot/{mod}/*": "openDevSection"
    },
    events: {
      "click a[jqrouter]:not([target])": "softRedirect"
    },
    globalEvents: {},
    _init_: function() {
      var self = this;
      jqrouter.start();
      this.openDevSection();
      jqrouter.otherwise("/boot/modules")
      jQuery("body").removeClass("loading");
      jQuery("body").append('<div class="tryConnect" hidden><a href=".">Refresh</a></div>');
    },
    openDevSection: function() {
      var self = this;
      module("spamjs.bootconfig", function(myModule) {
        self.add(myModule.instance({
          id: "bootconfig",
          routerBase: "/boot/"
        }));
      });
    },
    softRedirect: function(e, target) {
      jqrouter.go(target.getAttribute("href"));
      return preventPropagation(e);
    },
    _ready_: function() {
      this.instance().addTo(jQuery("body"));
    }
  };

});

//sdsd sdsd dsds
