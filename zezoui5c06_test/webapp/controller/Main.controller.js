sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/f/library", 
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,library, JSONModel) {
        "use strict";

        return Controller.extend("zezoui5c06test.controller.Main", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
            },
            onAdd : function(){
              var oDialog = this.byId("InputDialog");
                if (oDialog) {
                    oDialog.open();
                    return;
                }
                this.loadFragment({
                    name: "zezoui5c06test.view.fragment.Input"
                }).then(function (oDialog) {
                    oDialog.open();
                }, this);
            },
            onClose: function () {
              var oDialog = this.byId("InputDialog");

              oDialog.close();
            },

            onListItemPress: function (oEvent) {
              // debugger;
              var skey = oEvent.getSource().mAggregations.cells[0].mProperties.title;
                this.oView
                  .getParent()
                  .getParent()
                  .setLayout(library.LayoutType.TwoColumnsMidExpanded);
                //library에서 TwoColumnsMidExpanded설정.
                this.oRouter.navTo("Detail", {
                  layout: library.LayoutType.TwoColumnsMidExpanded,
                  key: skey
                });
              }
        });
    });
