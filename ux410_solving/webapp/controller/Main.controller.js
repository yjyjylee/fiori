sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel,Filter) {
        "use strict";

        return Controller.extend("sap.btp.ux400solving.controller.Main", {
            onInit: function () {
                let datas = {
                    list: [
                        {type : 'bar'},
                        {type : 'line'},
                        {type : 'column'},
                        {type : 'donut'}
                    ]
                };
                this.getView().setModel(new JSONModel(datas), 'typeList');
            },

            onSearch : function() {
            var oComboBox = this.byId("idComboBox");
            var oComboBox2 = this.byId("idComboBox2");
            var oGetkey = oComboBox.getSelectedKey();
            // console.log(oGetkey);
            // debugger;
            
            let oFilter = new Filter({path :'OrderID',operator:'EQ',value1: oGetkey});
            
            if(oComboBox2.getSelectedKey() == ''){
                oComboBox2.setValueState("Error");
            } else {
                //type의 값은 있음
                oComboBox2.setValueState("None");
                this.byId("idViewChart").setVizType(oComboBox2.getSelectedKey());
                if(oComboBox.getSelectedKey() == ""){
                    //전체 데이터
                    let oFilter2 = new Filter('OrderID','ALL');
                    this.byId("idOrderDataset").getBinding("data").filter(oFilter2);
                } else {
                    //필터 처리
                    this.byId("idOrderDataset").getBinding("data").filter([oFilter]);
                }

            }
            },
            onSelectdata : function(oEvent){
                var oRouter = this.getOwnerComponent().getRouter();
                //getOwnerComponent() : component객체 (controller위)
                var sOrderID = oEvent.getParameters().data[0]['data'].OrderID;
                var sproductID = oEvent.getParameters().data[0].data.ProductID;
                // oRouter.navTo("RouteDetail", {
                //     aa: sOrderID,
                //     bb: sproductID
                // });
                //강사님코드
                var oData = oEvent.getParameter("data")[0].data;
            
                this.byId("idViewChart").vizSelection(oData, { clearSelection : true}); //차트 선택된거 초기화
                oRouter.navTo("RouteDetail", {
                    aa: oData.OrderID,
                    bb: oData.ProductID
                });
            }

            
        });
    });
