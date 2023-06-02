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
        this.byId("addNameENG").setValueState('None');
        this.byId("addName").setValueState('None');
        this.byId("addCode").setValueState('None');
      },
      //디테일페이지로 넘어가기
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
      },
      //create
      onSave: function (oEvent) {
        // debugger;
        var oModel = this.getOwnerComponent().getModel(); //메인모델
        // var oBpcode = this.getView().getModel().getProperty("/");
        // console.log(oBpcode);
        var oData = this.getView().getModel("Input").getData();
        debugger;
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
        // if (oData.Bpcode < 10000) {
        //   MessageBox.error("양식에 맞게 입력해주세요");
        // } else if(oData.Bpcode > 19999)  { 
        //   MessageBox.error("고객의 거래처코드는 1으로 시작합니다");
        // } else{
          // //저장
          // oModel.read("/zezo_bpSet", {
          //   filters: [oFilter2],

          //   success: function (oReturn) {
          //     // debugger;
          //     if(oReturn.results[0]==undefined){
          //       oModel.create("/zezo_bpSet", oData);
          //       // sap.m.MessageToast.show("새로운 거래처가 등록되었습니다");
          //       MessageBox.success("새로운 거래처가 등록되었습니다");
          //     }else{
          //       MessageBox.error("거래처번호 중복입니다");
          //     }
              
          //   }.bind(this)
          // });
          // oData2.Bpcode = oData.Bpcode
          // oModel.create("/zezo_bptxtSet", oData2);
        // };
       
        if(oData.Bpcode &&
          oData.Bpname &&
          oData.Brnum &&
          oData.Ceoname &&
          oData.Category &&
          oData.Currency &&
          oData.Contname &&
          oData.Conttel&&
          oData.Contmail
          ){
            //저장
          oModel.read("/zezo_bpSet", {
            filters: [oFilter2],

            success: function (oReturn) {
              // debugger;
              if(oReturn.results[0]==undefined){
                oModel.create("/zezo_bpSet", oData);
                // sap.m.MessageToast.show("새로운 거래처가 등록되었습니다");
                MessageBox.success("새로운 거래처가 등록되었습니다");
              }else{
                MessageBox.error("거래처번호 중복입니다");
              }
              
            }.bind(this)
          });
          oData2.Bpcode = oData.Bpcode
          oModel.create("/zezo_bptxtSet", oData2);
          }
          else {
            MessageBox.error("모든 필드의 값을 입력해주세요");
          }



      },
      
      //한글입력방지
      OnNameChange : function(oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        // Validate if the input contains only English letters, numbers, special characters, and spaces  OnENameChange  
        var regex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]*$/;
        var bValid = regex.test(sValue);

        oInput.setValueState(
          bValid ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error
        );
        oInput.setValueStateText(
          bValid ? "" : "양식에 맞게 입력해주세요."
        );

        // 버튼 비활성화
        var oDialog = this.byId("InputDialog");
        var oSaveButton = oDialog.getBeginButton();
        oSaveButton.setEnabled(bValid);
      }, 
      //영어입력유효성
      OnENameChange : function(oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        // Validate if the input contains only English letters, numbers, special characters, and spaces  OnENameChange  /^[a-zA-Z0-9]*$/
        var regex =/^[A-Za-z]+$/;
        var bValid = regex.test(sValue);

        oInput.setValueState(
          bValid ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error
        );
        oInput.setValueStateText(
          bValid ? "" : "양식에 맞게 입력해주세요."
        );

        // 버튼 비활성화
        var oDialog = this.byId("InputDialog");
        var oSaveButton = oDialog.getBeginButton();
        oSaveButton.setEnabled(bValid);
      },
      
      OnCodeChange : function(oEvent) {
        var oInput = oEvent.getSource();
        var sValue = oInput.getValue();

        // Validate if the input contains only English letters, numbers, special characters, and spaces  OnENameChange  /^[a-zA-Z0-9]*$/
        var regex =/^\d{5}$/;
        var bValid = regex.test(sValue);

        if (bValid) {
          // Validate if the value is within the range of 0 to 100
          bValid = sValue > 9999  && sValue < 20000;
        }


        oInput.setValueState(
          bValid ? sap.ui.core.ValueState.None : sap.ui.core.ValueState.Error
        );
        oInput.setValueStateText(
          bValid ? "" : "양식에 맞게 입력해주세요."
        );

        // 버튼 비활성화
        var oDialog = this.byId("InputDialog");
        var oSaveButton = oDialog.getBeginButton();
        oSaveButton.setEnabled(bValid);
      } ,
      //서치헬프
      onValueHelpRequest: function () {
        // sap.m.MessageToast.show("Input Value Help 실행!");
        var oDialogBP = this.byId("BpDialog");
        if(!this.oFDialogBP){
          this.oFDialogBP = Fragment.load({
              id: this.getView().getId(),
              name : "zezoui5c06test.view.fragment.Bp",
              type: "XML",
              controller: this});}

         this.oFDialogBP.then(function(oDialogBP){
             this.getView().addDependent(oDialogBP);
             oDialogBP.open();
         }.bind(this));

    },
    onRowSelectionChange: function (oEvent) {
      var oDialogBP = this.byId("BpDialog");
      // var oDialog = oEvent.getSource().getParent();
      var sID = oEvent.getParameters().rowContext.getProperty('Bpcode');
      this.byId("input").setValue(sID);
      

      // this.onSearch(sID);

      oDialogBP.close();
      // this.onClose();
    },
    onSearch: function(oEvent) {
      var sID = this.byId("input").getValue();
     
      if(!sID){
        var oFilter = new sap.ui.model.Filter('Bpcode','LT', 20000);
      } else {
        var oFilter =  new sap.ui.model.Filter('Bpcode','EQ', sID);
      }
      this.byId("bpTable").getBinding("items").filter(oFilter);
    }, onRefresh : function(){
      var sID = this.byId("input").setValue('');

      let oFilter =  new sap.ui.model.Filter('Bpcode','LT', 20000);
      // let oFilter =  new sap.ui.model.Filter('Bpcode','ALL');
     
      this.byId("bpTable").getBinding("items").filter(oFilter);
    }
    });
  });
