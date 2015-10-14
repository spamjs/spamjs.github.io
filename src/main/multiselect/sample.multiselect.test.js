define({
  name : "sample.multiselect.test",
  extend : "spamjs.view",
  using : ["jqtag","jsutils.file"]
}).as(function(test,jqtag,fileUtil){

  jqtag.adapter.bind({
    name: "multiselectbox",
    events: {
      "jq.query div jq-select2": "searchAll",
      "change div jq-select2": "searchAllSelect",
      "change div jq-select": "searchNearBy"
    },
    searchAll : function(e,target,data){
     // console.error("_inbox_",e,target,data)
      fileUtil.getJSON(test.path("india.json")).done(function(resp){
        console.error(e.detail)
        e.detail.callback(resp.filter(function(option){
          return option.text.toLowerCase().indexOf(e.detail.term.toLowerCase())!=-1
        }));
      });
    },
    searchAllSelect : function(e,target,data){
      //console.log(e,target,data);
      var $selct2 = jQuery(e.target);
      var $selct1 = $selct2.closest("[jq-adapter=multiselectbox]").find("jq-select");
      $selct1[0].setOptions([{
        id : e.detail.value,
        text : e.detail.text
      }]);
      $selct1.val(e.detail.value);
      fileUtil.getJSON(test.path(e.detail.value+".json")).done(function(resp){
        console.error("resp",e,resp);
        $selct1[0].setOptions(resp);
        $selct1.val(e.detail.value);
        $selct2.attr("hidden","hidden");
        $selct1.removeAttr("hidden");
      });
    },
    searchNearBy : function(e,target,data){
      var $selct1 = jQuery(target);
      var sel = module("jqtags.select").toList($selct1.val());
      if(sel.length<1){
        var $selct2 = jQuery(e.target).closest("[jq-adapter=multiselectbox]").find("jq-select2");
        $selct2.removeAttr("hidden");
        $selct1.attr("hidden","hidden");
      }
    }
  });

  return {
     _init_ : function(){
       _importStyle_("jqtags/jq-select/test");
       _importStyle_("jqtags/jq-select2/test");

       this.$$.loadTemplate(
         this.path("multiselect.html")
       );

     }
  };

});