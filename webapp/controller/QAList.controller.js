sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("qalogs.controller.QAList", {

		onInit: function() {
			// create model

		},

		onSearch: function(oEvent) {

			var oFilterDeveloper = this.getView().byId("CBDeveloper").getValue();
			var oFilterDateFrom = this.getView().byId("DPFrom").getDateValue();
			var oFilterDateTo = this.getView().byId("DPTo").getDateValue();

			var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({
				pattern: "yyyyMMdd"
			});

			var oNewFilterQADateForm,
				oNewFilterQADateTo,
				aFilters = [];

			oNewFilterQADateForm = oDateFormat.format(new Date(oFilterDateFrom));
			oNewFilterQADateTo = oDateFormat.format(new Date(oFilterDateTo));

			if (oFilterDeveloper !== null && oFilterDeveloper !== "") {
				aFilters.push(
					new Filter({
						path: 'developer',
						operator: FilterOperator.EQ,
						value1: oFilterDeveloper
					})
				);
			}
			
			if (oNewFilterQADateForm !== null ) {
				aFilters.push(
					new Filter({
						path: 'qa_date',
						operator: FilterOperator.GE,
						value1: oNewFilterQADateForm
					})
				);
			}
			
			if (oNewFilterQADateTo !== null ) {
				aFilters.push(
					new Filter({
						path: 'qa_date',
						operator: FilterOperator.LE,
						value1: oNewFilterQADateTo
					})
				);
			}


			if (aFilters.length > 0) {
				var bindings = this.byId("TQAList").getBinding("items"),

					filters = new Filter({
						filters: aFilters,
						and: true
					});
				bindings.filter(filters);
			}
		}

	});

});