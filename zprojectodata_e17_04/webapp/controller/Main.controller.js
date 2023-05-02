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
            onSelectionChange: function (oEvent) {
                var oRouter = this.getOwnerComponent().getRouter();
                var sPath = oEvent.getParameters().listItem.getBindingContextPath(),
                    skey = this.getView().getModel().getProperty(sPath + '/OrderID');
                oRouter.navTo("RouteDetail", { "key": skey });
            },
            onValueHelpRequest: function () {
                // sap.m.MessageToast.show("Input Value Help 실행!");
                var oDialog = this.byId("CustomerDialog");
                if (oDialog) {
                    oDialog.open();
                    return;
                }
                this.loadFragment({
                    name: "zprojectodatae1704.view.fragment.CustomerDialog"
                }).then(function (oDialog) {
                    oDialog.open();
                }, this);
            },
            onClose: function () {
                var oDialog = this.byId("CustomerDialog");

                oDialog.close();
            },
            onRowSelectionChange: function (oEvent) {
                // var oDialog = this.byId("CustomerDialog");
                var oDialog = oEvent.getSource().getParent();
                var sID = oEvent.getParameters().rowContext.getProperty('CustomerID');
                this.byId("input").setValue(sID);
                

                this.onSearch(sID);

                oDialog.close();
                // this.onClose();
            },
            onSearch: function(oEvent) {
                var sID = this.byId("input").getValue();
                let oFilter =  new sap.ui.model.Filter('CustomerID','EQ', sID);
               
                this.byId("idProductsTable").getBinding("items").filter(oFilter);
            }

        });
    });
