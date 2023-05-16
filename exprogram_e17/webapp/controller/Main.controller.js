sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Filter) {
        "use strict";

        return Controller.extend("exprograme17.controller.Main", {
            onInit: function () {
                this.getView().setModel(new JSONModel(),"DetailModel");
                let datas = {
                    list: [
                        {type : 'USD'},
                        {type : 'EUR'},
                        {type : 'KRW'}
                    ]
                };
                this.getView().setModel(new JSONModel(datas), 'CCList');
            },
            OnSearch : function(){
            var oComboBox = this.byId("idComboBox");
            var oGetkey = oComboBox.getSelectedKey();
            var oInput = this.byId("idCarrierName").getValue();

            let oFilter = new Filter({
                filters : [ 
                    new Filter({path :'Currcode',operator:'EQ',value1: oGetkey}),
                    new Filter({path :'Carrname',operator:'Contains',value1: oInput})
                ],
                and: true //air만 치면 안나옴 둘다/콤보는 나옴....
            });

            if(oGetkey == ""){
                if(oInput== ""){
                    let aFilter = new Filter({
                        filters : [ 
                            new Filter({path :'Currcode',operator:'ALL'}),
                            new Filter({path :'Carrname',operator:'ALL'})
                        ],
                        and: true 
                    });

                    this.byId("idcarrierSet").getBinding("items").filter([aFilter]);
                }
                else{
                    let oFilter2 = new Filter({path :'Carrname',operator:'Contains',value1: oInput});
                    this.byId("idcarrierSet").getBinding("items").filter([oFilter2]);
                }
            }
            else{
                this.byId("idcarrierSet").getBinding("items").filter([oFilter]);
            }
            },
            //예약현황버튼클릭
            onItem : function(oEvent){
                var oDetailModel = this.getView().getModel('DetailModel');
                var sPath = oEvent.getSource().getBindingContext().sPath;
                var oView = this.getView();
                var oModel = oView.getModel();
                oModel.read(sPath, {
                    urlParameters: { '$expand': 'to_Item' },
                    success: function (oReturn) {
                        oDetailModel.setProperty("/Carrname", oReturn.Carrname);
                        oDetailModel.setProperty("/data", oReturn.to_Item.results)
                        //강사님코드
                        // oDetailModel.setData(oReturn);
                    }.bind(this),
                });
                //강사님코드
                // var oSelectedData = oEvent.getSource().getBindingContext().getObject({ expand : 'to_Item'});
                // var aDetail = oSelectedData.to_Item;
                //oDetailModel.setData(aDetail);

                var oDialog = this.byId("idItemDialog");
                if (oDialog) {
                    oDialog.open();
                    return;
                }
                this.loadFragment({
                    name: "exprograme17.view.fragment.Item"
                }).then(function (oDialog) {
                    oDialog.open();
                }, this);
            },

            onClose: function () {
                var oDialog = this.byId("idItemDialog");

                oDialog.close();
            }
        });
    });
