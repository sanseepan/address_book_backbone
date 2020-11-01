_.extend(Backbone.Validation.validators, {
    myValidator: function(value, attr, customValue, model) {
        if(value !== customValue){
            return 'error';
        }
    },
});

//model
var Contact = Backbone.Model.extend({
    validation: {
        name: {
            required: true,
        },
        address: {
            required: true,
        },
        telephone: {
            pattern: /(\b(0041|0)|\B\+41)(\s?\(0\))?(\s)?[1-9]{2}(\s)?[0-9]{3}(\s)?[0-9]{2}(\s)?[0-9]{2}\b/,
            msg: 'Please enter a valid telephone number'
        },
    }
});

//collection
var Contacts = Backbone.Collection.extend({});

// instantiate a Collection
var contacts = new Contacts();

//view for one contact
var ContactView = Backbone.View.extend({
    model: new Contact(),
    tagName: 'tr',
    initialize: function() {
        this.template = _.template($('.contacts-list-template').html());
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});


// view list of contacts
var ContactsView = Backbone.View.extend({
    model: contacts,
    el: $('.contacts-list'),
    initialize: function() {
        var self = this;
        this.model.on('add', this.render, this);

    },

    render: function() {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(contact) {
            if (contacts.length > 10) {
                alert('you have reached maximum limits')
            } else {
                self.$el.append((new ContactView({model: contact})).render().$el);
            }

        });
        return this;
    }
});

var contactsView = new ContactsView();

$(document).ready(function() {
    $('.add-contact').on('click', function() {
        var contact = new Contact({
            name: $('.name-input').val(),
            address: $('.address-input').val(),
            telephone: $('.telephone-input').val()
        });
        $('.name-input').val('');
        $('.address-input').val('');
        $('.telephone-input').val('');
        contacts.add(contact);
    })
});