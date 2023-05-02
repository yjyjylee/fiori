sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";
        //클로저 변수
        // var test = 'hihi';

        return Controller.extend("zprojectteste1701.controller.Main", {
            iNumber2 : 20,
            onInit: function () {

                this.test2 = 'hihi2';
                this.iNumber = 20;

                // this.byId("idinput1").setValue('10');
                // this.byId("idinput2").setValue('20');
                // this.byId("idselect").setSelectedKey('multiple');
            },
            onButtonPress : function (oEvent) {
                //debugger;
                //alert('버튼 이벤트 함수 실행!');

                // //접근 방법
                // test // 클로저 변수 this 안써줘두된다.
                // this.test2 // controller 에 붙은 변수2
                // this.iNumber // controller 에 붙은 변수2

                let sValue = this.byId("idinput1").getValue(); //this는 controller를 가리킴. view에 있는 id를 가지고 데이터를 가져옴.
                alert(sValue);


                // this._getSum(10,20,30);

            },
            _getSum : function(a,b,c,){
                return a+b+c;
            },
            onClick : function () {
                var oInput = this.byId("idCustomer"); //Input 객체
                var oLabel = oInput.getLabels()[0]; //Label 객체

                // oLabel.getText(); //'Customer'
                console.log(oLabel.getText());
            }
        });
    });
