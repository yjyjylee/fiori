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
            onListItemPress: function (oEvent) {
          
                this.oView
                  .getParent()
                  .getParent()
                  .setLayout(library.LayoutType.TwoColumnsMidExpanded);
                //library에서 TwoColumnsMidExpanded설정.
                this.oRouter.navTo("Detail", {
                  layout: library.LayoutType.TwoColumnsMidExpanded,
                  key: 1
                });
              }
        });
    });
