sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/f/library",
  "sap/m/MessageBox",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, library, MessageBox, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("zezoui5c06test.controller.Main", {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter();
        this.getView().setModel(new JSONModel(), "Input");
        this.getView().setModel(new JSONModel(), "Bptxt");
      },
      onAdd: function () {

        var oDialog = this.byId("InputDialog");
        if(!this.oFDialog){
          this.oFDialog = Fragment.load({
              id: this.getView().getId(),
              name : "zezoui5c06test.view.fragment.Input",
              type: "XML",
              controller: this});}

         this.oFDialog.then(function(oDialog){
             this.getView().addDependent(oDialog);
             oDialog.open();
         }.bind(this));

        // if (oDialog) {
        //   oDialog.open();
        //   return;
        // }
        // this.loadFragment({
        //   name: "zezoui5c06test.view.fragment.Input"
        // }).then(function (oDialog) {
        //   oDialog.open();
          
        // }, this);
      },
      onClose: function (oEvent) {
        
        var oDialog = oEvent.getSource().getParent();
        oDialog.close();
      },
      onAfter: function() {
        this.getView().getModel("Input").setProperty('/', {});
        this.getView().getModel("Bptxt").setProperty('/',{});
      },

      //create
      onSave: function (oEvent) {
        // debugger;
        var oModel = this.getOwnerComponent().getModel(); //메인모델
        // var oBpcode = this.getView().getModel().getProperty("/");
        // console.log(oBpcode);
        var oData = this.getView().getModel("Input").getData();

        // oEvent.getSource().getParent();
        // debugger;
        oData.Category = this.byId("idCateSelect").getSelectedKey();
        oData.Currency = this.byId("idCurrSelect").getSelectedKey();
        var oData2 = this.getView().getModel("Bptxt").getData();
        // var oInput = this.byId("addCode").getValue();//새로입력된값
        // var oBpcode = String(oInput);
        console.log(oData);
        var oFilter2 = new sap.ui.model.Filter('Bpcode', 'EQ', oData.Bpcode);

        //bpcode 10000보다 작으면 저장 안되게끔,중복저장방지...
        if (oData.Bpcode < 10000) {
          sap.m.MessageToast.show("양식에 맞게 입력해주세요");
        } else if(oData.Bpcode > 19999)  { 
          sap.m.MessageToast.show("고객의 거래처코드는 1으로 시작합니다");
        } else{
          // debugger;

          // if(oModel.getProperty("/zezo_bpSet(oBpcode)")==undefined){
          //   oModel.create("/zezo_bpSet", oData, {
          //     success: function () {
          //       sap.m.MessageToast.show("새로운 거래처가 등록되었습니다");
          //     },
          //     error: function () {
          //       sap.m.MessageToast.show("Error!");
          //     }
          //   });
          // }else {
          //   sap.m.MessageToast.show("거래처 번호 중복입니다");
          // }
          oModel.read("/zezo_bpSet", {
            filters: [oFilter2],

            success: function (oReturn) {
              // debugger;
              if(oReturn.results[0]==undefined){
                oModel.create("/zezo_bpSet", oData);
                // sap.m.MessageToast.show("새로운 거래처가 등록되었습니다");
                MessageBox.success("새로운 거래처가 등록되었습니다");
              }else{
                sap.m.MessageToast.show("거래처번호 중복입니다");
              }
              
            }.bind(this)
          });
          oData2.Bpcode = oData.Bpcode
          oModel.create("/zezo_bptxtSet", oData2);
        };
       
      },

      onListItemPress: function (oEvent) {
        // debugger;
        var skey = oEvent.getSource().mAggregations.cells[1].mProperties.text;
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
