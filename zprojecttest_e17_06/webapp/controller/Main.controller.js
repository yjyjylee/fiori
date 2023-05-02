sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller , JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("zprojectteste1706.controller.Main", {
            onInit: function () {
                let datas = {
                    todo: [
                        { content: 'test' }
                    ]
                };

            this.getView().setModel(new JSONModel(datas), 'MainModel');
            },
            onAdd: function () {


                var oDialog = this.byId("addDialog");
                //3)한번 열리고 나면 그 때 부터는 if문 탐. controller에 붙여줘서.
                if (oDialog) {
                    oDialog.open();
                    return;
                }
                //1)처음에는 여기를 탐. controller에 addDiaglog가 없어서 if문 안탐
                this.loadFragment({
                    name: "zprojectteste1706.view.fragment.addDialog" //name에 경로 지정 폴더안에, 폴더안에 , dialog
                    //2)여기서 fragment load하고, this로 controller에 붙여줌.
                }).then(function (oDialog) {
                    oDialog.open();
                }, this); //this를 사용해서 해당 controller를 같이 넘겨줌.


            },onClose: function (oEvent) {
                var oModel1 = this.getView().getModel('MainModel');
                var oData1 = oModel1.getData();


                var oDialog = oEvent.getSource().getParent(); //getsoucc는 객체를 가져옴, 여기서는 = button, 버튼의 parent가 Dialog 
                //이런식으로 매개변수로 접근도 되고, onAdd 함수처럼 변수 따로 줘서 하는것도 가능.

                //방법1 직접가져오기
                var sValue = oDialog.getContent()[0].getItems()[1].getValue(); 
                console.log(sValue);

                //방법2 전역변수 사용하기
                // var sValue = this.getView().getModel("root").getProperty("/value");
                // console.log(sValue);


                oDialog.close();
                //sValue가 빈 문자열이 아닐떄만 넣어주기
                if (sValue) {
                    oData1.todo.unshift({
                        content: sValue
                    });
                }

                oModel1.setData(oData1);
            },

            onDelete: function () {
                var oTable = this.byId("todoTable");
                var oModel = this.getView().getModel("MainModel");
                var aSelectedIndices = oTable.getSelectedIndices();
                var aDatas = oModel.getProperty("/todo");

                if (aSelectedIndices.length >= 1) {
                    MessageBox.confirm("정말삭제하시겠습니까?", {
                        title: "delete",
                        actions: ['YES','NO'],
                        emphasizedAction: MessageBox.Action.YES,
                        onClose: function (oAction) {

                            if (oAction === 'YES') {

                                //splice배열 내장함수 splice (시작넘버=인덱스, 삭제할개수, 삭제하고 그자리에 추가할 데이터)
                                for (var i = aSelectedIndices.length - 1; i >= 0; i--) {
                                    aDatas.splice(aSelectedIndices[i], 1);

                                }

                                oModel.setProperty("/todo", aDatas);

                            }

                        }
                    });
                }
            },
            
            //dialog 열리기 전에 초기값 없애주기.
            onBeforeOpen: function () {
                // var sValue = this.getView().getModel("root").setProperty("/value", " ");
                //강사님 코드 but 빈문자열 들어감!! 방지해주기 -> onClose함수에 if문 추가 + input에 id 줘야함.
                this.byId("addInput").setValue();

            },
            onRowDelete : function (oEvent) {
                var oModel = this.getView().getModel("MainModel");
                var aDatas = oModel.getProperty("/todo");
                aDatas.splice(oEvent.getParameters().row.getIndex(),1);
                oModel.setProperty("/todo", aDatas);
            }
        });
    });
