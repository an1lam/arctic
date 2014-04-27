Parse.initialize("eipwUxxOCdl2C5VaTwC079iWpncdb0cjrgFDMEat", "k9YFVQUFHfXIHizc7pmnet7akcBom56wEAxouSOk");
var app = app || {};
var ReportView = Parse.View.extend({
	initialize: function() {
        //this.model.bind("change", this.render, this);
        //this.render();
    },
    render: function() {
        // Just render my template
        //console.log("rendering subview...");
        this.$el.empty();
        var name = this.model.get('name');
        var desc = this.model.get('description');
        var url = this.model.get('url');
        var author = this.model.get('author');
        var posttime = this.model.get('posttime');
        var objectId = "#report/" + this.model.id;
        var template = _.template( $("#report_template").html(), {
        	"name": name, 
        	"description": desc,
        	"author":author,
        	"posttime":posttime,
        	"url":url,
        	"objectId":objectId
        });
        this.$el.html(template);
        return this;
    }
});

var ReportListView = Parse.View.extend({
    el: $('#reports'),
    //collection : (new WebsiteCollection()),
	initialize: function() {
        //this.model.bind("change", this.render, this);
        var self = this;
        $("#content").empty();
        $("#content").append($("#fliternsearch").html());
        $("#content").append("<div id='reports'></div>");
        this.$el = $('#reports');
        this.collection = new Reports();
        this.subviews = [];
        this.collection.on('change', this.render);
        this.collection.fetch({
          success: function(collection){
          	//console.log("getting new item...");
          	for(var i = 0; i < collection.length; i++){
          		var view = new ReportView();
          		view.model = collection.at(i);
          		self.subviews.push(view);
          	}
            self.render();
          }
        });
    },
    render: function() {
        $("#spin_navi").hide();
        // Just render my template
        //console.log("rendering...");
        this.$el.empty();
        for(var i = 0; i < this.subviews.length; i++){
        	this.$el.append(this.subviews[i].render().$el);
        }
    }
});

var ReportDetailView = Parse.View.extend({
	el: $('#detail'),
	initialize: function(id){
		this.rid = id;
	    // this.render();
	    this.collection = new Reports();
	    this.render();
	},
	render: function(){
		var self = this;
		$("#content").empty();
		console.log("clear content");
        //$("#content").append($("#fliternsearch").html());
        $("#content").append("<div id='detail'></div>");
	  	// var template = _.template( $('#detail_view').html());
	 	this.$el = $("#detail");
	  	this.collection.fetch({
	      success: function(collection){
	      	for(var i = 0; i < collection.length; i++){
	      		if(collection.at(i).id === self.rid){
	      			var model = collection.at(i);
	      			self.$el.empty();
			        var name = model.get('name');
			        var posttime = model.get('posttime');
			        var URL = model.get('url');
			        var publishedBy = model.get('publishedBy');
			        var issue = model.get('issue');
			        var introduction = model.get('introduction');
			        var template = _.template( $("#detail_view").html(), {
			        	"name": name, 
			        	"URL": URL,
			        	"publishedBy":publishedBy,
			        	"posttime":posttime,
			        	"issue":issue,
			        	"introduction":introduction
			        });
			        self.$el.html(template);
	      			break;
	      		}
	      	}
	      }
	    });
	}
});
