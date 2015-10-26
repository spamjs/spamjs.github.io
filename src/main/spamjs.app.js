define({
  name: "spamjs.app",
  extend: "spamjs.view",
  modules: ["jqrouter","jQuery"]
}).as(function(app, jqrouter, jQuery) {

  var stompClient;

  return {
    routerEvents: {
      //"/boot/*": "openDevSection",
      //"/boot/{mod}/*": "openDevSection"
    },
    events: {
      "click a[jqrouter]:not([target])": "softRedirect",
//      "click a[jqr-click]": "routerNavigation",
//      "change [jqr-change-param]": "routerQueryParamChange",
//      "click a[jqr-click-param]": "routerQueryParamChange",
//      "click a[jqr-push-params]": "routerQueryParamUpdate"
    },
    globalEvents: {},
    _init_: function() {
      var self = this;
      jqrouter.start();

      this.router = jqrouter.bind(this);

      this.$$.loadTemplate(this.path("spamjs.app.html")).done(function(){
        self.openDevSection();
        self.router.otherwise("/boot/modules");
        jQuery("body").removeClass("loading");
        jQuery("body").append('<div class="tryConnect" hidden><a href=".">Refresh</a></div>');
      })
    },
    openDevSection: function(e,target,data) {
      console.error("openDevSection",e,target,data)
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
    },
    routerNavigation: function (e, target) {
      var link = target.getAttribute("href");
      if (link) {
        jqrouter.go(link);
      }
      return preventPropagation(e);
    },
    routerQueryParamChange: function (e, target) {
      var param = target.getAttribute("jqrouter-param");
      if (param) {
        jqrouter.setQueryParam(param, target.value || target.getAttribute("value"));
      }
      return preventPropagation(e);
    },
    routerQueryParamUpdate: function (e, target) {
      var param = target.getAttribute("jqrouter-params");
      if (param) {
        var selectedVal = target.value || target.getAttribute("value");
        var selected = this.router.getQueryParam(param) || [];
        var pos = selected.indexOf(selectedVal);
      }
      if (pos == -1) {
        selected.push(selectedVal);
      } else {
        selected.splice(pos, 1);
      }
      this.router.setQueryParam(param, selected);
      return preventPropagation(e);
    }
  };

});

//sdsd sdsd dsds
