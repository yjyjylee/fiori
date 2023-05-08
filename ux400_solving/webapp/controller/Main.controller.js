sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("sap.btp.ux400solving.controller.Main", {
            // formatter: {
            //     transformDiscontinued : function(oDis) {
            //         // debugger;
            //         // console.log(oDis);
            //         if(oDis){
            //             return 'Yes';
            //         } else {
            //             return 'No';
            //         }

            //     }
            // },
            transformDiscontinued: function (oDis) {
                // debugger;
                // console.log(oDis);
                if (oDis) {
                    return 'Yes';
                } else {
                    return 'No';
                }

            },
            onInit: function () {
                let datas = {
                    rows: [

                    ]
                };
                this.getView().setModel(new JSONModel(datas), "list");
                //강사님 코드
                // this.getView().setModel(new JSONModel({ datas : []}), "list")
            },
            onRandomPress: function () {
                //강사님 코드
                // let oControl = this.byId("idInput"); 
                // oControl.setValue(Math.floor(Math.random() * 100) + 1);
                // let oModel = this.getView().getModel('list')
                // let arr = oModel.getProperty("/datas"); // []
                // arr.push({text : oControl.getValue()});
                // oModel.setProperty("/datas", arr);
                //Main.view.xml -> table의 rows="{list>/datas}"로 바꿔줘야댐.

                var oModel = this.getView().getModel('list'),
                    oData = oModel.getData();
                var oInput = Math.floor(Math.random() * 100) + 1;
                this.byId("idInput").setValue(oInput);
                this.byId("idInput").setValueState("None");
                //여기서 { key : value } -> { text : oInput }으로 key의 이름이 정해짐.
                oData.rows.push({
                            text: oInput
                        });
                // oModel.setData(oData);


                let oControl = this.byId("idInput");
                let iNum = Number(oControl.getValue());
                // let isOk = iNum >= 1 && iNum <= 100;
                // debugger;
                // if (iNum != 0) {
                //     oData.rows.push({
                //         text: iNum
                //     });
                // } else {
                //     var oInput = Math.floor(Math.random() * 100) + 1;
                //     oControl.setValue(oInput);
                //     oData.rows.push({
                //         text: oInput
                //     });
                // }

                oModel.setProperty("/rows", oData.rows);
            },
            onOpenproduct: function () {
                var oDialog = this.byId("ProductsDialog");
                if (oDialog) {
                    oDialog.open();
                    return;
                }
                this.loadFragment({
                    name: "sap.btp.ux400solving.view.fragment.Products"
                }).then(function (oDialog) {
                    oDialog.open();
                }, this);
            },
            onClose: function () {
                var oDialog = this.byId("ProductsDialog");

                oDialog.close();
            },
            onValueChange: function () {
                var oModel = this.getView().getModel('list'),
                    oData = oModel.getData();
                // var oInputNumber = Number(this.byId("idInput").getValue());
                // // debugger;
                // if(oInputNumber >= 1 && oInputNumber <= 100){
                //     oData.rows.push({ 
                //         text : oInputNumber
                //     });
                //     oModel.setData(oData);
                //     this.byId("idInput").setValueState("None");
                // }else {
                //     this.byId("idInput").setValueState("Error");
                //     this.byId("idInput").setValueStateText("1이상 100이하의 숫자를 입력하세요");
                //     // valueState="Error" valueStateText="1이상 100이하의 숫자를 입력하세요"
                // }
                //강사님 코드 (input에 100이상의 값이 들어가면 자동으로 random 버튼이 안눌리게 함.)
                let oControl = this.byId("idInput");
                let iNum = Number(oControl.getValue());
                let isOk = iNum >= 1 && iNum <= 100; //true or false

                if (isOk) {
                    oData.rows.push({
                        text: iNum
                    });
                }

                oControl.setValueState(isOk ? 'None' : 'Error');
                oControl.setValueStateText(isOk ? ' ' : '1이상 100이하의 숫자를 입력하세요');
                this.byId("idButton").setEnabled(isOk ? true : false);



            },

        });
    });
