sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device", 
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, JSONModel) {
	"use strict";

	return UIComponent.extend("qalogs.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * The init method will run when the app starts, and we can define global variables here, which can be used in the whole application.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			//set the device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");
			
			// create the views based on the url/hash
			this.getRouter().initialize();
			
			//i18 model 
			var i18nModel = new sap.ui.model.resource.ResourceModel({
				bundleName: "qalogs.i18n.i18n"
			});
			this.setModel(i18nModel, "i18n");
		}
	});

});