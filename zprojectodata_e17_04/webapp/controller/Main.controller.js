sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("zprojectodatae1704.controller.Main", {
            onInit: function () {

            },
            onSelectionChange : function(oEvent) {
                var oRouter = this.getOwnerComponent().getRouter();
                var sPath = oEvent.getParameters().listItem.getBindingContextPath(),
                skey = this.getView().getModel().getProperty(sPath+'/OrderID');
                oRouter.navTo("RouteDetail" , {"key": skey});
            }
        }); 
    });
