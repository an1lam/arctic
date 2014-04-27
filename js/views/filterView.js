var app = app || {};

app.FilterView = Parse.View.extend({
    template: _.template( $("#filter-template").html() ),
    events: {
       'change #filter_box' : 'filterCategories'
    },

    initialize: function(options) {
        this.setElement(options.el);
        this.categories = options.categories;
        _.extend(this, _.pick(options));
        var root = this;
        root.render();
    },

    render: function() {
        this.$el.html(this.template({categories: this.categories}));
        return this;
    },

    filterCategories: function(e) {
        var boxes = $("[type=checkbox]:checked");
        var i;
        var boxValues = [];
        for (i = 0; i < boxes.length; i++) {
            boxValues[i] = $(boxes[i]).attr("value");
        }
        app.pubSub.trigger("filter", boxValues);
    }
});
