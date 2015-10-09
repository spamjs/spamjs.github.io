define({
  name: "spamjs.app",
  extend: "view",
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
      jQuery("body").removeClass("loading");
      jQuery("body").append('<div class="tryConnect" hidden><a href=".">Refresh</a></div>');
    },
    disConnected: function() {
      (new PNotify({
        title: 'Live features may not work properly',
        text: 'Do you want to reload?',
        animation: 'slide',
        type: 'warning',
        hide: false,
        after_open: function(notice) {
          // Position this notice in the center of the screen.
          notice.get().css({
            "left": ($(window).width() / 2) - (notice.get().width() / 2)
          });
        },
        confirm: {
          confirm: true
        }
      })).get().on('pnotify.confirm', function() {
          jqrouter.reload();
        });
      jQuery("body").addClass("unidesk_diconnnected").find(".tryConnect").removeAttr("hidden");
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
    openAdminSection: function(e, target, d) {
      var self = this;
      module("adminwindow", function(targetModule) {
        self.add(targetModule.instance({
          id: "application"
        }));
      });
    },
    openClientChatOrLogin: function(e) {
      var self = this;
      module("chatwindow", function(targetModule) {
        self.add(targetModule.instance({
          id: "application"
        }));
      });
    },
    softRedirect: function(e, target) {
      jqrouter.go(target.getAttribute("href"));
      return preventPropagation(e);
    },
    openLogin: function() {
      this.add(module("loginModule").instance({
        id: "application_login"
      }));
    },
    _ready_: function() {
      this.instance().addTo(jQuery("body"));
    }
  };

});

//sdsd sdsd dsds
