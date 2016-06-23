define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/on",
	"dojo/dom",
	"dojo/dom-style",
	"dojo/dom-attr",
	"dojo/topic",
	"dijit/form/TextBox",
	"greeting/_ViewBase",
	"greeting/GreetingStore",
	"dojo/text!./templates/GreetingWidget.html"
], function (declare, lang, on, dom, domStyle, domAttr, topic, TextBox, _ViewBase, GreetingStore, template) {

	return declare('guestbook.GreetingWidget', [_ViewBase], {
		templateString: template,
		createdTime: '',
		updatedTime: 'N/A',
		createdUser: '',
		updatedUser: '',
		content: '',
		id_greeting: '',

		guestBookName: '',
		addGuestBookName: '',
		addGreetingContent: '',
		isEdit: false,

		constructor: function (obj, guestBookName) {

			this.inherited(arguments);
			if (obj) {
				this.content = obj.content || '';
				this.createdTime = obj.date || '';
				this.updatedTime = obj.updated_date || '';
				this.createdUser = obj.author || '';
				//this.updatedUser = obj.updated_by || '';
				this.id_greeting = obj.id_greeting || '';

				if (dom.byId('isUserAdmin').value == 'True' || dom.byId('isUseLogin').value == obj.author) {
				this.isEdit = true;
			}
			}

			if (guestBookName) {
				this.guestBookName = guestBookName;
			}



		},

		postCreate: function () {
			if (this.isEdit) {
				domStyle.set(this.btnEdit, "display", "inline-block");
				domStyle.set(this.btnDelete, "display", "inline-block");
			}

			on(this.btnEdit, "click", lang.hitch(this, 'editGreeting'));
			on(this.btnCancel, "click", lang.hitch(this, 'cancelGreeting'));
			on(this.btnDelete, "click", lang.hitch(this, 'deleteGreeting'));
			on(this.btnSave, "click", lang.hitch(this, 'updateGreeting'));

		},

		editGreeting: function () {
			this.displayEditForm(true);
		},

		cancelGreeting: function () {
			this.contentEditNode.set('value', this.content);
			this.displayEditForm(false);
		},

		displayEditForm: function (display) {
			////this.contentEditNode.set('readonly', !display);
			domStyle.set(this.contentEditNode, "display", display ? "inline-block" : "none");
			domStyle.set(this.btnEdit, "display", display ? "none" : "inline-block");
			domStyle.set(this.btnSave, "display", display ? "inline-block" : "none");
			domStyle.set(this.btnCancel, "display", display ? "inline-block" : "none");

		},

		processCreate: function (obj, callback) {
			if (obj.guestBookName.length == 0 || obj.textGreeting.length == 0) {
				alert("Please Input data");
				return false;
			}
			if (obj.guestBookName.length > 10 || obj.textGreeting.length > 10) {
				alert("Character maximun is 10");
				return false;
			}

			var _greetingStore = new GreetingStore();
			var _this = this;

			_greetingStore._addGreeting({
				guestBookName: obj.guestBookName,
				textGreeting: obj.textGreeting
			}, function (error, data) {
				callback(error, data);
			});
		},

		deleteGreeting: function () {
			var _greetingStore = new GreetingStore();

		},

		updateGreeting: function () {
			
		}
	});
});