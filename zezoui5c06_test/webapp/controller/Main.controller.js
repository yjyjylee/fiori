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
                this.getView().setModel(new JSONModel(),"Input");
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
            onSave: function() {
            var oModel = this.getOwnerComponent().getModel();
            var oData = this.getView().getModel("Input").getData();
              //create
            oModel.create("/zezo_bpSet", oData, {s
                success : function() {
                    sap.m.MessageToast.show("새로운 거래처가 등록되었습니다");
                },
                error : function() {
                    sap.m.MessageToast.show("Error!");
                }
            }); 

            },

            onListItemPress: function (oEvent) {
              // debugger;
                var skey = oEvent.getSource().mAggregations.cells[1].mProperties.title;
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
