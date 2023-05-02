sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageBox) {
        "use strict";

        return Controller.extend("zprojectteste1704.controller.Main", {
            onInit: function () {
                let datas = {
                    title: {
                        subtitle: 'Json Title'
                    },
                    list: [
                        { num1: 33, oper: '+', num2: 10, result: 43 }
                    ],
                    todo: [
                        { content: 'test' }
                    ]
                };
                this.getView().setModel(new JSONModel(datas), 'MainModel');
                // var oModel = new JSONModel();
                // oModel.loadData( sap.ui.require.toUrl("zprojectteste1704/model/data.json")) ;
                // this.getView().setModel(oModel,'MainModel'); //setModel(모델, 이름)   
            },
            onChange: function () {
                var oModel = this.getView().getModel('MainModel'); //모델 이름 없으면 안써줘도된다. 원래 " " ->이건데 생략되어있는것
                var oData = oModel.getProperty("/title/subtitle");
                console.log('변경 전 : ', oData);
                oModel.setProperty("/title/subtitle", "change Title");

                // var oData = oModel.getData(); //전체데이터를 다 가져옴

                // oModel.getProperty("/title/subtitle"); //경로 찾는데 시간이 걸려서, 전체 data를 가져오는 getdata와 큰 차이 없음.
                // oModel.setProperty("/title/subtitle", "hihi"); //.setProperty(경로, 변경할 값)
                // console.log('변경 전 : ',oData.title.subtitle);

                // oData.title.subtitle = 'Change title';

                // oModel.setData(oData);

                // //실습 list의 특정 값 바꾸기
                // var oModel1 = this.getView().getModel('MainModel');
                // var oData1 = oModel1.getData();
                // oData1.list[4].age=100;
                // oModel1.setData(oData1);


                // var sTitle = oData.list[1].name; //'moon'
                // this.byId("idtext").setText(sTitle);
                // this.byId("idtext").setText(oData.list[0]['name']);

                // console.log(oData.list[0]['name']);
                // console.log(oData.list[0].name); //list의 key값에 접근하는거 .으로 줘도 된다

                // oModel.getProperty("/title/subtitle"); //특정경로에 해당하는 데이터를 가져옴. 
            },
            onDisplay: function () {
                var oModel = this.getView().getModel('MainModel');
                var oData = oModel.getProperty("/title/subtitle");
                console.log("변경 후 :", oData);

                // var oData = oModel.getData(); 
                // console.log('변경 후 : ', oData.title.subtitle);
            },
            onEnter: function () {
                // var oInput = this.byId("idInput").getValue();
                // this.byId("idText").setText(oInput);

                this.byId("idText").setText(this.byId("idInput").getValue()); //이렇게 써줘도된다.
            },

            onButtonPress: function () {
                var oModel1 = this.getView().getModel('MainModel'),
                    alist = oModel1.getData().list;
                var oData1 = oModel1.getData();

                let oSelect = this.byId("idSelect").getSelectedItem(),
                    iNum1 = Number(this.byId("idInput1").getValue()),
                    iNum2 = Number(this.byId("idInput2").getValue()),
                    result = 0;

                //계산기로직작성 oSelect.getKey()
                let sMsg = '';

                debugger;
                switch (oSelect.getKey()) {
                    case "plus":
                        result = iNum1 + iNum2;
                        break;
                    case "minus":
                        result = iNum1 - iNum2;
                        break;
                    case "multiple":
                        result = iNum1 * iNum2;
                        break;
                    case "divide":
                        result = iNum1 / iNum2;
                        break;
                    default:
                        break;

                }

                sMsg = `${iNum1} ${oSelect.getText()} ${iNum2} = ${result}`;



                // oData1.list.push({
                //     num1: iNum1, oper: oSelect.getText(), num2:iNum2, result : result 
                // });

                // oModel1.setData(oData1);


                //MessageToast.show(sMsg); //잠깐 떳다가 사라짐.
                MessageBox.show(sMsg, {
                    icon: MessageBox.Icon.INFORMATION,
                    title: "My message box title",
                    actions: [MessageBox.Action.YES],
                    emphasizedAction: MessageBox.Action.YES,
                    onClose: function (oAction) {
                        if (oAction === 'YES') {

                            alist.push({
                                num1: iNum1, oper: oSelect.getText(), num2: iNum2, result: result
                            });

                            oModel1.setProperty('/list', alist);

                        }
                    }

                }); //사용자에게 보여줄 메세지, 객체


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
                    name: "zprojectteste1704.view.fragment.addDialog" //name에 경로 지정 폴더안에, 폴더안에 , dialog
                    //2)여기서 fragment load하고, this로 controller에 붙여줌.
                }).then(function (oDialog) {
                    oDialog.open();
                }, this); //this를 사용해서 해당 controller를 같이 넘겨줌.
            },



            //oEvent는 이벤트가 일어낫을때 존재하는 매개변수가 있음, 이름이 oEvent로 지정된것은 아님
            onClose: function (oEvent) {
                var oModel1 = this.getView().getModel('MainModel');
                var oData1 = oModel1.getData();


                var oDialog = oEvent.getSource().getParent(); //getsoucc는 객체를 가져옴, 여기서는 = button, 버튼의 parent가 Dialog 
                //이런식으로 매개변수로 접근도 되고, onAdd 함수처럼 변수 따로 줘서 하는것도 가능.

                //방법1 직접가져오기
                // var sValue = oDialog.getContent()[0].getItems()[1].getValue(); 
                // console.log(sValue);

                //방법2 전역변수 사용하기
                var sValue = this.getView().getModel("root").getProperty("/value");
                console.log(sValue);


                oDialog.close();
                //sValue가 빈 문자열이 아닐떄만 넣어주기
                if (sValue) {
                    oData1.todo.unshift({
                        content: sValue
                    });
                }

                oModel1.setData(oData1);
            },
            //dialog 열리기 전에 초기값 없애주기.
            onBeforeOpen: function () {
                // var sValue = this.getView().getModel("root").setProperty("/value", " ");
                //강사님 코드 but 빈문자열 들어감!! 방지해주기 -> onClose함수에 if문 추가 + input에 id 줘야함.
                this.byId("addInput").setValue();

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
            onRowDelete : function (oEvent) {
                var oModel = this.getView().getModel("MainModel");
                var aDatas = oModel.getProperty("/todo");
                aDatas.splice(oEvent.getParameters().row.getIndex(),1);
                oModel.setProperty("/todo", aDatas);
            }
        });
    });
