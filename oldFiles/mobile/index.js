var icon_cache = {};
var cForm;
var payBtn;

function spkCloseOnTap() {
    document.onclick = function (e) {

        if (!e) e = window.event;

        target = (e.target) ? e.target : e.srcElement;
        if (e.target.id === 'spkCheckoutForm') {
            console.log("Bye", e.target.id);
            document.getElementById('spkCheckoutForm').outerHTML = "";
        }
    }
}
spkCloseOnTap();

function spkPayBtnTapped(el_id) {
    spkCheckout.showForm(el_id);
    var temp = document.getElementById("spkCheckoutDiv");
    // console.log(window.cForm, "____________---------");
}


function spkGetCharges(payBtn) {
    // var payBtn = document.spkCheckoutForm.spkPayBtn
    var spkAmt = payBtn.dataset.spkamount;
    var xmlHttp = new XMLHttpRequest();

    // console.log(spkAmt)
    var spkKey = payBtn.dataset.spkkey;
    var url = "https://payments.spektra.co/core/core/check-amount/?key=" + spkKey + "&amount=" + spkAmt

    // spkPhonePrefix.slice(0, 7)
    spkAjax.get(url).success(function (data, xhr) {
            var ua = window.navigator.userAgent;
            var isIE = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1

            if (isIE) {
                var response = JSON.parse(data);
                console.log("Response: ", response)
                var local = response.local
                var charge = local.currency === "KES" ? Math.ceil(local.charge) : local.charge
                var total = local.currency === "KES" ? Math.ceil(local.total) : local.total
                document.getElementById("spk_charges").innerText = "(" + local.currency + " " + local.amount + " + " + charge + " FEE)"
                document.getElementById("spkPayBtn").innerText = "Pay " + local.currency + " " + total

            } else {
                console.log("Yey, Success!")
                var local = data.local
                var charge = local.currency === "KES" ? Math.ceil(local.charge) : local.charge
                var total = local.currency === "KES" ? Math.ceil(local.total) : local.total
                document.getElementById("spkCharges").innerText = "(" + local.currency + " " + local.amount + " + " + charge + " FEE)"
                document.getElementById("spkPayBtn").innerText = "Pay " + local.currency + " " + total
                console.log("Response: ", data)
            }
        })
        .error(function (data, xhr) {
            console.log("mmhh.. something's wrong", data, xhr)
            if (xhr.status === 400) {
                console.log("Bad request")
            } else if (xhr.status === 403) {
                console.log("Unauthorised")
            }
        });

}

//validation for name
function validateName(el, submit) { //Second argument determines whether to show certain errors- use if form was submitted

    var re_valid = /^[A-Za-z]+$/.test(el.value)

    if (el.value.length === 1 && re_valid) {
        el.setAttribute("valid", "false");
        if (arguments.length == 2) {
            spDisplayError(el.id + "_er", "Please Use Your Legal Name")
        } else {
            spClearError(el.id + "_er");
        }
        return false
    }

    if (el.value === "") {
        el.setAttribute("valid", "true");
        return false;
    }

    re_valid = /^[A-Za-z\s]+$/.test(el.value)

    if (!re_valid) {
        // console.log("Sorry only letters")
        el.setAttribute("valid", "false");

        // if (/^[0-9]+$/.test(el.value)){
        //     spDisplayError(el.id + "_er", "Please Use Letters Only")
        // }

        spDisplayError(el.id + "_er", "Please Use Letters Only")
        return false
    }
    if (re_valid && el.value.length >= 2) {
        spClearError(el.id + "_er");
        el.setAttribute("valid", "true");
        return true
    }

}


//detect delete to prevent formating number during delete or backspace
function spkPhoneKeyUp(event) {
    // var key = event.keyCode || event.charCode;

    var spkPhoneField = document.spkCheckoutForm.spkPhoneNumber;
    spValidator();


    //return to defaul sim icon when user deletes operator prefix
    // spClearError("splastname_er");
    if (spkPhoneField.value.length === 1) {
        spClearError("spkPhoneNumber_er");
    }

    if (spkPhoneField.value.length < 4) { //if the phone number begins with 0 then check if digits are less than 4
        spkPhoneField.style.backgroundImage = "url(https://s3.amazonaws.com/spektra-checkout/images/sim.png)"
    } else if (spkPhoneField.value[0] != "0" && spkPhoneField.value.length < 7) { //if the phone number doesnt begin with 0 then check if digits are less than 7(including spaces)
        spkPhoneField.style.backgroundImage = "url(https://s3.amazonaws.com/spektra-checkout/images/sim.png)"
    }

    spFormatNo();
}


//function to format phone number input to xxxx xxx xxx
function spFormatNo() {

    spkPhoneField = document.spkCheckoutForm.spkPhoneNumber;

    // spkPhoneField.value = spkPhoneField.value.replace(/^00\d*/, "");
    var temp_phone = spkPhoneField.value.slice();

    var start = spkPhoneField.selectionStart,
        end = spkPhoneField.selectionEnd;
    var curBeg;

    if (temp_phone.match(/^00\d*/)) {
        spkPhoneField.value = temp_phone.slice(2, temp_phone.length)
        curBeg = true;
    }
    if (spkPhoneField.selectionStart === temp_phone.length) {
        curBeg = true
    }

    var numbers = spkPhoneField.value.replace(/\D/g, '')

    if (temp_phone[0] === '0') {

        document.spkCheckoutForm.spkPhoneNumber.setAttribute('maxlength', 12); //including space a local phone number must be upto 12 characters

        // spkPhoneField.value = temp_phone.replace(/\W/gi, '').replace(/(\d{4})(\d{3})?(\d{3})?/, '$1 $2 $3');
        char = {
            4: ' ',
            7: ' '
        };
        spkPhoneField.value = '';
        for (var i = 0; i < numbers.length; i++) {
            spkPhoneField.value += (char[i] || '') + numbers[i];
        }
    } else {
        document.spkCheckoutForm.spkPhoneNumber.setAttribute('maxlength', 15);
        // spkPhoneField.value = temp_phone.replace(/\W/gi, '').replace(/(\d{3})(\d{3})?(\d{3})?(\d{3})?/, '$1 $2 $3 $4'); //including spaces and country code, the phone number must be up to 15 characters
        char = {
            3: ' ',
            6: ' ',
            9: ' '
        };
        spkPhoneField.value = '';
        for (var i = 0; i < numbers.length; i++) {
            spkPhoneField.value += (char[i] || '') + numbers[i];
        }
    }

    var no_diff = temp_phone.replace(/\D/g, '').length - spkPhoneField.value.replace(/\D/g, '').length;

    var space_diff = (spkPhoneField.value.split(" ").length - 1) - (temp_phone.split(" ").length - 1);
    // console.log(space_diff, "..")

    if (start === end && end === spkPhoneField.value.length) {
        spkPhoneField.setSelectionRange(spkPhoneField.value.length + space_diff, spkPhoneField.value.length + space_diff);
        // console.log("start === end && end === spkPhoneField.value.length", start, end, space_diff)
    } else if (no_diff === 0 && space_diff > 0) {
        // console.log("no_diff === 0 && space_diff > 0", no_diff, space_diff, start === spkPhoneField.value.length)

        if (!curBeg) {
            spkPhoneField.setSelectionRange(start + no_diff, end + no_diff);
        } else {
            spkPhoneField.setSelectionRange(start + space_diff, end + space_diff);
        }


    } else if (no_diff > 0 && space_diff > 0) {
        spkPhoneField.setSelectionRange(start + space_diff, end + space_diff);
        // console.log("else", space_diff)
    } else {
        spkPhoneField.setSelectionRange(start, end);
    }

    // console.log(start, end, spkPhoneField.selectionStart, spkPhoneField.selectionEnd)



    spValidatePhone();

}

// vslidate number if in xxxxx xxx xxx format
function spValidatePhone() {
    spkPhoneField = document.spkCheckoutForm.spkPhoneNumber;
    let spkPhoneNumber = document.spkCheckoutForm.spkPhoneNumber.value.replace(/\s/g, '');
    var icon_cache = window.icon_cache

    //validate for both local phone numbers (begins with 0) and internation (includes country code)
    if (spkPhoneNumber.length >= 4 && spkPhoneField.value[0] === "0") {

        //detect operator and update logo
        sp_op_pref = spkPhoneNumber.slice(0, 4)
        if (sp_op_pref in icon_cache) {
            document.spkCheckoutForm.spkPhoneNumber.style.backgroundImage = "url(" + icon_cache[sp_op_pref] + ")"
        } else {
            spkDetectOperator(spkPhoneNumber.slice(0, 4), spkPhoneField)
        }

    } else if (spkPhoneNumber.length >= 6 && spkPhoneField.value[0] != "0") {
        //detect operator and update logo
        sp_op_pref = spkPhoneNumber.slice(0, 6)
        if (sp_op_pref in icon_cache) {
            document.spkCheckoutForm.spkPhoneNumber.style.backgroundImage = "url(" + icon_cache[sp_op_pref] + ")"
        } else {
            spkDetectOperator(spkPhoneNumber.slice(0, 6), spkPhoneField)
        }
    }

    if ((spkPhoneField.value.match(/^[0-9]{4}[\s]{1}[0-9]{3}[\s]{1}[0-9]{3}$/) || spkPhoneField.value.match(/^[0-9]{3}[\s]{1}[0-9]{3}[\s]{1}[0-9]{3}[\s]{1}[0-9]{3}$/))) {
        spClearError("spkPhoneNumber_er");
        // spValidInput(document.spkCheckoutForm.spkPhoneNumber)

        document.spkCheckoutForm.spkPhoneNumber.className = "spdefault";
    }

}

//validate the form for errors
function spValidator() {

    let spkFirstNameField = document.spkCheckoutForm.spkFirstName;
    let spkLastNameField = document.spkCheckoutForm.spkLastName;
    let spkPhoneField = document.spkCheckoutForm.spkPhoneNumber

    var isvalid = true;

    if (!spkFirstNameField.value) {
        spkFirstNameField.setAttribute("valid", "false");
        spDisplayError("spkFirstName_er", "Please Enter Your First Name");
        isvalid = false
    } else {
        spkFirstNameField.setAttribute("valid", "true");
        spClearError("spkFirstName_er");
        isvalid = validateName(spkFirstNameField, true)
    }
    if (!spkLastNameField.value) {
        // console.log("validationg lastname field")
        spkLastNameField.setAttribute("valid", "false");
        spDisplayError("spkLastName_er", "Please Enter Your Last Name");
        isvalid = false
    } else {
        spkLastNameField.setAttribute("valid", "true");
        spClearError("spkLastName_er");
        isvalid = validateName(spkLastNameField, true)
    }
    // console.log("Length is " + spkPhoneField.value.length, spkPhoneField.value[0] === "0")

    if ((spkPhoneField.value.length < 12 && spkPhoneField.value[0] === "0") || (spkPhoneField.value.length < 15 && spkPhoneField.value[0] != "0")) {
        spkPhoneField.setAttribute("valid", "false");

        if (arguments.length > 0) {
            if (spkPhoneField.value.length === 0) {
                spDisplayError("spkPhoneNumber_er", "Please Enter Your Phone Number");
            } else {
                spDisplayError("spkPhoneNumber_er", "The Phone Number Is Too Short");
            }
        } else {
            // spClearError("spkPhoneNumber_er");
        }

        isvalid = false
    } else {
        spkPhoneField.setAttribute("valid", "true");
    }

    return isvalid;
}


//override default  HTML5 form validation behaviour
document.addEventListener('invalid', (function () {
    return function (e) {
        e.preventDefault();
        document.getElementById("name").focus();
    };
})(), true);

//Generic error displayer
function spDisplayError(sp_id, sp_msg) {
    document.getElementById(sp_id).innerHTML = sp_msg

}

//clear display error for specific input
function spClearError(sp_id) {
    document.getElementById(sp_id).innerHTML = "";
}

function spkDetectOperator(spkPhonePrefix, spkPhoneField) {

    var url = "https://payments.spektra.co/core/core/validate-prefix/"
    var data = JSON.stringify({
        "prefix": spkPhonePrefix
    });

    // console.log("Detecting")
    spkAjax.post(url, data, "application/json; charset=utf-8")
        .success(function (data, xhr) {
            var icon;
            var ua = window.navigator.userAgent;
            var isIE = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1

            if (isIE) {
                icon = JSON.parse(xhr.response).icon;
                console.log("Icon ", icon, xhr.response)

            } else {
                icon = xhr.response.icon;
                console.log("Icon ", icon, xhr)
            }

            window.icon_cache[spkPhonePrefix] = icon; //add icon to cache with the prefix as key
            document.spkCheckoutForm.spkPhoneNumber.style.backgroundImage = "url(" + icon + ")"

        }).error(function (data, xhr) {
            console.log("mmhh.. something's wrong", data, xhr)
            if (xhr.status === 404) {
                spkPhoneField.setAttribute('valid', 'false')
                if (document.spkCheckoutForm.spkPhoneNumber.value[0] === "0") {
                    spDisplayError("spkPhoneNumber_er", "Please Include Your Country Code");
                } else {

                    spDisplayError("spkPhoneNumber_er", "Unknown Service Provider");
                }
                document.spkCheckoutForm.spkPhoneNumber.style.backgroundImage = "url(https://s3.amazonaws.com/spektra-checkout/images/sim.png)"
            } else {
                // spDisplayError("spkPhoneNumber_er", xmlHttp.response.error);
                document.spkCheckoutForm.spkPhoneNumber.style.backgroundImage = "url(https://s3.amazonaws.com/spektra-checkout/images/sim.png)"
            }
        });
}



//Pay Button for submitting payment clicked
function spkPaySubmit(state, payBtn) {
    window.payBtn = payBtn
    if (spValidator(true)) {
        window.cForm = Object.assign({}, document.getElementById("spkCheckoutForm"));
        console.log("Cform", window.cForm)
        spkMakePayment(payBtn, document.getElementById("spkCheckoutForm"));
        spkCheckout.showLoading();
        document.getElementById("spkCheckoutFormDiv").style.display = "none"
        document.getElementById("spkLoadingCon").style.display = "block";

    }
}

//remove spaces in phone number
function numberfy(str) {
    return str.replace(/\D/g, '')
}






!function(a,b){"function"==typeof define&&define.amd?define([],b):"undefined"!=typeof module&&module.exports?module.exports=b():a.ReconnectingWebSocket=b()}(this,function(){function a(b,c,d){function l(a,b){var c=document.createEvent("CustomEvent");return c.initCustomEvent(a,!1,!1,b),c}var e={debug:!1,automaticOpen:!0,reconnectInterval:1e3,maxReconnectInterval:3e4,reconnectDecay:1.5,timeoutInterval:2e3};d||(d={});for(var f in e)this[f]="undefined"!=typeof d[f]?d[f]:e[f];this.url=b,this.reconnectAttempts=0,this.readyState=WebSocket.CONNECTING,this.protocol=null;var h,g=this,i=!1,j=!1,k=document.createElement("div");k.addEventListener("open",function(a){g.onopen(a)}),k.addEventListener("close",function(a){g.onclose(a)}),k.addEventListener("connecting",function(a){g.onconnecting(a)}),k.addEventListener("message",function(a){g.onmessage(a)}),k.addEventListener("error",function(a){g.onerror(a)}),this.addEventListener=k.addEventListener.bind(k),this.removeEventListener=k.removeEventListener.bind(k),this.dispatchEvent=k.dispatchEvent.bind(k),this.open=function(b){h=new WebSocket(g.url,c||[]),b||k.dispatchEvent(l("connecting")),(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","attempt-connect",g.url);var d=h,e=setTimeout(function(){(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","connection-timeout",g.url),j=!0,d.close(),j=!1},g.timeoutInterval);h.onopen=function(){clearTimeout(e),(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","onopen",g.url),g.protocol=h.protocol,g.readyState=WebSocket.OPEN,g.reconnectAttempts=0;var d=l("open");d.isReconnect=b,b=!1,k.dispatchEvent(d)},h.onclose=function(c){if(clearTimeout(e),h=null,i)g.readyState=WebSocket.CLOSED,k.dispatchEvent(l("close"));else{g.readyState=WebSocket.CONNECTING;var d=l("connecting");d.code=c.code,d.reason=c.reason,d.wasClean=c.wasClean,k.dispatchEvent(d),b||j||((g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","onclose",g.url),k.dispatchEvent(l("close")));var e=g.reconnectInterval*Math.pow(g.reconnectDecay,g.reconnectAttempts);setTimeout(function(){g.reconnectAttempts++,g.open(!0)},e>g.maxReconnectInterval?g.maxReconnectInterval:e)}},h.onmessage=function(b){(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","onmessage",g.url,b.data);var c=l("message");c.data=b.data,k.dispatchEvent(c)},h.onerror=function(b){(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","onerror",g.url,b),k.dispatchEvent(l("error"))}},1==this.automaticOpen&&this.open(!1),this.send=function(b){if(h)return(g.debug||a.debugAll)&&console.debug("ReconnectingWebSocket","send",g.url,b),h.send(b);throw"INVALID_STATE_ERR : Pausing to reconnect websocket"},this.close=function(a,b){"undefined"==typeof a&&(a=1e3),i=!0,h&&h.close(a,b)},this.refresh=function(){h&&h.close()}}return a.prototype.onopen=function(){},a.prototype.onclose=function(){},a.prototype.onconnecting=function(){},a.prototype.onmessage=function(){},a.prototype.onerror=function(){},a.debugAll=!1,a.CONNECTING=WebSocket.CONNECTING,a.OPEN=WebSocket.OPEN,a.CLOSING=WebSocket.CLOSING,a.CLOSED=WebSocket.CLOSED,a});

    var paySockOpen = false;
    const merchantKey = 'pnoWKXcs0dJDesqK2IZj';
    var paySocket = new ReconnectingWebSocket('wss://payments.spektra.co/ws/core/pay/?key=' + merchantKey);

    paySocket.onopen = function(e) {
        paySockOpen = true;
        console.log("Connected")
    };
//
function spkMakePayment(payBtn, cForm) {
    var paySocket = window.paySocket;

    var payBtn = document.spkCheckoutForm.spkPayBtn;

    var spkAmt = payBtn.dataset.spkamount;
    // // var cForm = window.cForm;
    const merchantKey  = payBtn.dataset.spkkey;
    // console.log(payBtn, cForm)
    var checkoutData = {
        first_name: cForm.spkFirstName.value,
        last_name: cForm.spkLastName.value,
        phone: numberfy(cForm.spkPhoneNumber.value),
        amount: spkAmt,
        reference: payBtn.dataset.reference,
    }
    makePayment = function (data) {
        if (paySockOpen) {
            console.log(data)
            var checkoutData = JSON.stringify({
                phone: "+254717255032", //data.phone,
                reference: data.reference,
                amount: data.amount,
                first_name: data.first_name,
                last_name: data.last_name
            });
            
            paySocket.send(checkoutData)
        } else {
            console.log("Not allowed");
        }
    };
    makePayment(checkoutData)
    
    paySocket.onmessage = function (e,checkoutData) {
        var data = JSON.parse(e.data);
        if (data.type === "PAYMENT_REQUESTED"){
            console.log("Payment Requested");
            document.getElementById("spkLoadingCon").outerHTML = "";
            spkCheckout.showSent();
            document.getElementById("spkSent").style.display = "block";
        } else if (data.type === "PAYMENT_TIMEDOUT") {
            console.log("Payment timed out");
            document.getElementById("spkSent").outerHTML = "";
            spkCheckout.showTimeOut();
            document.getElementById("spkTimeout").style.display = "block";
        }  else if (data.type === "TRANSACTION_SUCCESSFUL")  {
            console.log("Payment successful");
            document.getElementById("spkSent").outerHTML = "";
            spkCheckout.showSuccess();
            document.getElementById("spkAmount").innerText = checkoutData.amount
            document.getElementById("spkSuccess").style.display = "block";

        } else if (data.type === "PAYMENT_FAILED" || data.type === "TRANSACTION_CANCELLED"  )  {
            console.log("Payment Failed");
            document.getElementById("spkSent").outerHTML = "";
            spkCheckout.showError();
            document.getElementById("spkFailed").style.display = "block";
        } 
        console.log("Received ", data)
    };
    paySocket.onclose = function (e) {
        console.error('Chat socket closed unexpectedly');
        paySockOpen = false;
    };
    paySocket.onerror = function (e) {
        console.log("Error Connecting");
        paySockOpen = false;
    };

}




function spkChangeNumber(){
    document.getElementById("spkFailed").outerHTML = "";
    document.getElementById("spkCheckoutFormDiv").style.display = "block";
}

function spkTryAgain(curDiv){
    document.getElementById(curDiv).outerHTML = "";
    spkPaySubmit(true, window.payBtn);

    
}

//spkHTML pages injector module
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        root.spkCheckout = factory(root);
    }
})(this, function (root) {

    'use strict';

    var exports = {};

    var config = {
        targetElement: "spkCheckoutDiv"

    };

    var pages = {

    }

    var isMobile = function () {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
            return true;
        } else {
            return false
        }
    }

    if (isMobile()) {
        pages.stylescss = "" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-Black;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Black.otf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-BlackItalic;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-BlackItalic.otf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-BlackItalicSc;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-BlackItalicSC.otf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-BlackSC;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-BlackSC.otf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: whitneyhtf-bolditalic-webfont;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/whitneyhtf-bolditalic-webfont.ttf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-Bold;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Bold.ttf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-Book;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Book.ttf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-Light;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Light.ttf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-Medium;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Medium.ttf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-SemiBold.ttf);\n" +
            "}\n" +
            "\n" +
            ".spk-checkout {\n" +
            "    background-color: rgba(0, 0, 0, 0.47);\n" +
            "    height: 100%;\n" +
            "    width: 100%;\n" +
            "    /* display: none; */\n" +
            "    top: 0px;\n" +
            "    left: 0px;\n" +
            "    position: fixed;\n" +
            "}\n" +
            "\n" +
            ".spk-card {\n" +
            "    position: absolute;\n" +
            "    bottom: 0px;\n" +
            "    margin-left: 0px;\n" +
            "    margin-right: 0px;\n" +
            "    background-color: white;\n" +
            "    width: 100%;\n" +
            "    max-width:450px;\n" +
            "    height: 410px;\n" +
            "    overflow: visible;\n" +
            "    /* font-size: 20px; */\n" +
            "    /*! top: 50%; */\n" +
            "}\n" +
            "\n" +
            ".spk-title {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 23px;\n" +
            "    letter-spacing: 0;\n" +
            "    margin: auto;\n" +
            "    padding: 28px;\n" +
            "    background: #FFFFFF;\n" +
            "    box-shadow: 0 4px 4px 0 rgba(0,0,0,0.15);\n" +
            "}\n" +
            "\n" +
            ".spk-card-body {\n" +
            "    padding:0 20px;\n" +
            "    \n" +
            "}\n" +
            "\n" +
            ".spk-brand-name{\n" +
            "    background: url(https://s3.amazonaws.com/spektra-checkout/images/mobile-logo.svg) no-repeat;\n" +
            "    background-size: 75px 23px;\n" +
            "    background-position: 17px 17px;\n" +
            "}\n" +
            "\n" +
            ".spk-card label {\n" +
            "    font-family: WhitneyHTF-Bold;\n" +
            "    font-size: 10px;\n" +
            "    color: #818B92;\n" +
            "    letter-spacing: 0.5px;\n" +
            "    text-align: left;\n" +
            "    display: block;\n" +
            "    background-color: #fff;\n" +
            "    margin-top: 25px;\n" +
            "}\n" +
            "\n" +
            "spk-card input::-ms-clear {\n" +
            "    display: none;\n" +
            "}\n" +
            "\n" +
            ".spk-card ::-webkit-input-placeholder {\n" +
            "    color: rgba(40, 48, 54, 0.24) !important;\n" +
            "}\n" +
            "\n" +
            "/* Firefox 4-18 */\n" +
            ".spk-card :-moz-placeholder {\n" +
            "    color: rgba(40, 48, 54, 0.24) !important;\n" +
            "}\n" +
            "\n" +
            "/* Firefox 19-50 */\n" +
            ".spk-card ::-moz-placeholder {\n" +
            "    color: rgba(40, 48, 54, 0.24) !important;\n" +
            "}\n" +
            "\n" +
            "/* - Internet Explorer 10–11\n" +
            "   - Internet Explorer Mobile 10-11 */\n" +
            ".spk-card :-ms-input-placeholder {\n" +
            "    color: rgba(40, 48, 54, 0.24) !important;\n" +
            "}\n" +
            "\n" +
            "/* Edge (also supports ::-webkit-input-placeholder) */\n" +
            ".spk-card ::-ms-input-placeholder {\n" +
            "    color: rgba(40, 48, 54, 0.24) !important;\n" +
            "}\n" +
            "\n" +
            "/* CSS Pseudo-Elements Level 4 Editor's Draft */\n" +
            ".spk-card ::placeholder {\n" +
            "    color: rgba(40, 48, 54, 0.24) !important;\n" +
            "}\n" +
            "\n" +
            ".spk-card input {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 16px;\n" +
            "    color: #283036;\n" +
            "    letter-spacing: 0 ;\n" +
            "    text-align: left;\n" +
            "    height: 40px;\n" +
            "    width: 100%;\n" +
            "    padding: 0;\n" +
            "    border: solid #DEE2E5;\n" +
            "    border-width: 0px 0px 1.49px 0px;\n" +
            "    margin-bottom: 25px;\n" +
            "    text-transform: capitalize;\n" +
            "    display: block;\n" +
            "    background-color: #fff;\n" +
            "    caret-color: black;\n" +
            "}\n" +
            "\n" +
            ".spk-card input:focus {\n" +
            "    border:solid #0ABF53;\n" +
            "    border-width: 0px 0px 2.4px 0px;\n" +
            "    outline: none;\n" +
            "}\n" +
            "\n" +
            ".spk-card input[valid=true] {\n" +
            "    border-width: 0px 0px 1.9px 0px;\n" +
            "    border-color: #0ABF53;\n" +
            "}\n" +
            "\n" +
            ".spk-card input[valid=true]:last-of-type {\n" +
            "    border-width: 0px 0px 1.9px 0px;\n" +
            "    border-color: #0ABF53;\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 14px;\n" +
            "    color: #0ABF53;\n" +
            "    letter-spacing: 0;\n" +
            "    text-align: left;\n" +
            "    caret-color: black;\n" +
            "}\n" +
            "\n" +
            ".spk-card input[valid=false] {\n" +
            "    border-width: 0px 0px 1.9px 0px;\n" +
            "    border-color: #FF3B30;\n" +
            "}\n" +
            "\n" +
            ".spk-card input[valid=false]:last-of-type {\n" +
            "    border-width: 0px 0px 1.9px 0px;\n" +
            "    border-color: #FF3B30;\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 14px;\n" +
            "    color: #FF3B30;\n" +
            "    letter-spacing: 0;\n" +
            "    text-align: left;\n" +
            "    caret-color: black\n" +
            "}\n" +
            "\n" +
            ".spk-card input[valid=true]:placeholder-shown {\n" +
            "    border-width: 0px 0px 1.9px 0px;\n" +
            "    border-color: rgba(40,48,54,0.24);\n" +
            "}\n" +
            "\n" +
            ".spk-card input:required:placeholder-shown {\n" +
            "    border-width: rgba(40,48,54,0.24);\n" +
            "    border-color: #DEE2E5;\n" +
            "}\n" +
            "\n" +
            ".spk-card input:required:placeholder-shown:focus {\n" +
            "    border-width: 0px 0px 1.9px 0px;\n" +
            "    border-color: #0ABF53;\n" +
            "}\n" +
            "\n" +
            "\n" +
            ".spk-error {\n" +
            "    display: inline-table;\n" +
            "    margin-top: -22px;\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 12px;\n" +
            "    color: #FF3B30;\n" +
            "    letter-spacing: 0;\n" +
            "    text-align: left;\n" +
            "    float: left;\n" +
            "    width: 100%\n" +
            "}\n" +
            "\n" +
            "\n" +
            ".spk-pay-btn {\n" +
            "    background-image: linear-gradient(-180deg, #AA216E 0%, #5D1F5E 92%);\n" +
            "    border: 3px solid #F2F2F2;\n" +
            "    border-radius: 6px;\n" +
            "    font-family: WhitneyHTF-Bold;\n" +
            "    font-size: 18px;\n" +
            "    color: #FFFFFF;\n" +
            "    letter-spacing: 0.56px;\n" +
            "    text-align: center;\n" +
            "    height: 59px;\n" +
            "    width: 220px;;\n" +
            "    outline: none;\n" +
            "    position: relative;\n" +
            "    left: 50%;\n" +
            "    transform: translateX(-50%);\n" +
            "    cursor: pointer;\n" +
            "\n" +
            "}\n" +
            "\n" +

            "\n" +
            ".spk-checkout-msg {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 12px;\n" +
            "    color: #4A90E2;\n" +
            "    letter-spacing: 0.38px;\n" +
            "    text-align: center;\n" +
            "    padding: 10px;\n" +
            "}\n" +
            "\n" +
            ".spdefault {\n" +
            "    background: url(\"https://s3.amazonaws.com/spektra-checkout/images/sim.png\") no-repeat;\n" +
            "    background-size: 45px;\n" +
            "    background-position: 100% 0px;\n" +
            "}\n" +
            "\n" +
            "@-webkit-keyframes fade {\n" +
            "    0% {\n" +
            "        opacity: 1;\n" +
            "    }\n" +
            "\n" +
            "    100% {\n" +
            "        opacity: .1;\n" +
            "    }\n" +
            "}\n" +
            "\n" +
            "@keyframes fade {\n" +
            "    0% {\n" +
            "        opacity: 1;\n" +
            "    }\n" +
            "\n" +
            "    100% {\n" +
            "        opacity: .1;\n" +
            "    }\n" +
            "}\n" +
            "\n" +
            ".c-spinner {\n" +
            "    /* Bind the animation */\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-1 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -1s;\n" +
            "    animation-delay: -1s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-2 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.9166666667s;\n" +
            "    animation-delay: -0.9166666667s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-3 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.8333333333s;\n" +
            "    animation-delay: -0.8333333333s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-4 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.75s;\n" +
            "    animation-delay: -0.75s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-5 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.6666666667s;\n" +
            "    animation-delay: -0.6666666667s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-6 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.5833333333s;\n" +
            "    animation-delay: -0.5833333333s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-7 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.5s;\n" +
            "    animation-delay: -0.5s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-8 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.4166666667s;\n" +
            "    animation-delay: -0.4166666667s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-9 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.3333333333s;\n" +
            "    animation-delay: -0.3333333333s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-10 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.25s;\n" +
            "    animation-delay: -0.25s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-11 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.1666666667s;\n" +
            "    animation-delay: -0.1666666667s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-12 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.0833333333s;\n" +
            "    animation-delay: -0.0833333333s;\n" +
            "}\n" +
            "\n" +
            ".spk-card-icon {\n" +
            "    position: relative;\n" +
            "    /* top: 0%;\n" +
            "    transform: translateY(180%); */\n" +
            "    transform: perspective(1px) translateY(-50%);\n" +
            "    -ms-transform: perspective(1px) translateY(-50%);\n" +
            "    -webkit-transform: perspective(1px) translateY(-50%);\n" +
            "    /* -webkit-transform: perspective(1px)  translateY(40%); */\n" +
            "    -moz-transform: perspective(1px) translateY(-50%);\n" +
            "    top: 30%;\n" +
            "    height: 80px;\n" +
            "    width: 80px;\n" +
            "    margin-left: auto;\n" +
            "    margin-right: auto;\n" +
            "}\n" +
            "\n" +
            ".spk-card-icon-failed {\n" +
            "    background-image: url(\"https://s3.amazonaws.com/spektra-checkout/images/failed.svg\");\n" +
            "    background-repeat: no-repeat;\n" +
            "    background-position: center;\n" +
            "    background-size: 60px 60px;\n" +
            "    margin-left: auto;\n" +
            "    margin-right: auto;\n" +
            "    padding-top: 130px;\n" +
            "    text-align: center;\n" +
            "}\n" +
            "\n" +
            ".spk-card-icon-done {\n" +
            "    background-image: url(\"https://s3.amazonaws.com/spektra-checkout/images/Success.svg\");\n" +
            "    background-repeat: no-repeat;\n" +
            "    background-position: center;\n" +
            "    background-size: 60px 60px;\n" +
            "    margin-left: auto;\n" +
            "    margin-right: auto;\n" +
            "    padding-top: 150px;\n" +
            "    text-align: center;\n" +
            "}\n" +
            "\n" +
            ".spk-highlite {\n" +
            "    color:#000000; font-family: WhitneyHTF-Bold; font-size: 19;\n" +
            "}\n" +
            "\n" +
            ".spk-card-icon-sent {\n" +
            "    background-image: url(\"https://s3.amazonaws.com/spektra-checkout/images/Pending.svg\");\n" +
            "    background-repeat: no-repeat;\n" +
            "    background-position: center;\n" +
            "    background-size: 70px 70px;\n" +
            "    /* height: 90px;\n" +
            "    width: 90px; */\n" +
            "    margin-left: auto;\n" +
            "    margin-right: auto;\n" +
            "    padding-top: 180px;\n" +
            "    /* padding-bottom: 20px; */\n" +
            "    text-align: center;\n" +
            "}\n" +
            "\n" +
            ".spk-request-sent::after {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 22px;\n" +
            "    content: \"Request Sent\";\n" +
            "    color: #F5A623;\n" +
            "}\n" +
            "\n" +
            ".spk-success-text::after {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 20px;\n" +
            "    color: #0ABF53;\n" +
            "    letter-spacing: 0;\n" +
            "    text-align: center;\n" +
            "    content: \"Payment Successful\";\n" +
            "}\n" +
            "\n" +
            ".spk-failed-text::after {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 22px;\n" +
            "    color: #FF3B30;\n" +
            "    letter-spacing: 0;\n" +
            "    text-align: center;\n" +
            "    content: \"Request Failed\";\n" +
            "}\n" +
            "\n" +
            ".spk-timeout-text::after {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 22px;\n" +
            "    color: #FF3B30;\n" +
            "    letter-spacing: 0;\n" +
            "    text-align: center;\n" +
            "    content: \"Request Timed Out\";\n" +
            "}\n" +
            "\n" +
            "\n" +
            ".spk-card-content-text {\n" +
            "    font-style: normal;\n" +
            "    font-stretch: normal;\n" +
            "    line-height: normal;\n" +
            "    letter-spacing: normal;\n" +
            "    color: #73767f;\n" +
            "    position: absolute;\n" +
            "    width: 100%;\n" +
            "    text-align: center;\n" +
            "    font-size: 18px;\n" +
            "    /*padding-right: -25px ;*/\n" +
            "    height: 320px;\n" +
            "}\n" +
            "\n" +
            ".spk-card-loading-text {\n" +
            "    top: 60%;\n" +
            "}\n" +
            "\n" +
            "\n" +
            ".spk-card-button {\n" +
            "    background-image: linear-gradient(-180deg, #333333 0%, #000000 100%);\n" +
            "    border: 4px solid #ECECEC;\n" +
            "    border-radius: 6px;\n" +
            "    position: absolute;\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 18px;\n" +
            "    color: #FFFFFF;\n" +
            "    letter-spacing: 0.56px;\n" +
            "    text-align: center;\n" +
            "    width: 50%;\n" +
            "    padding: 15px;\n" +
            "    top: 80%;\n" +
            "    left: 25%;\n" +
            "    outline: none;\n" +
            "    cursor: pointer;\n" +
            "}\n" +
            ".spk-error {\n" +
            "    display: inline-table;\n" +
            "    margin-top: -22px;\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 12px;\n" +
            "    color: #FF3B30;\n" +
            "    letter-spacing: 0;\n" +
            "    text-align: left;\n" +
            "    float: left;\n" +
            "    width: 100%\n" +
            "}"

        

        pages.checkoutForm = "" +
            "<div id=\"spkCheckoutFormDiv\" class=\"spk-checkout spk-form\">\n" +
            "\n" +
            "        <div class=\"spk-card\">\n" +
            "            \n" +
            "            <div class=\"spk-title spk-brand-name\">\n" +
            "\n" +
            "            </div>\n" +
            "            <div class=\"spk-card-body\">\n" +
            "                <form id=\"spkCheckoutForm\" name=\"spkCheckoutForm\" class=\"spkCheckout\">\n" +
            "                    <label for=\"spkFirstName\">\n" +
            "                        FIRST NAME\n" +
            "                    </label>\n" +
            "                    <input id=\"spkFirstName\" onkeyup=\"validateName(this)\" name=\"spkFirstName\" type=\"text\" autocomplete=\"off\"\n" +
            "                        placeholder=\"Enter Your First Name \">\n" +
            "                    <span id=\"spkFirstName_er\" class=\"spk-error\"></span>\n" +
            "\n" +
            "                    <label for=\"spkFirstName\">\n" +
            "                        LAST NAME\n" +
            "                    </label>\n" +
            "                    <input id=\"spkLastName\" onkeyup=\"validateName(this)\" name=\"spkLastName\" type=\"text\" autocomplete=\"off\"\n" +
            "                        placeholder=\"Enter Your Last Name \">\n" +
            "                    <span id=\"spkLastName_er\" class=\"spk-error\"></span>\n" +
            "\n" +
            "                    <label for=\"spkPhoneNumber\">\n" +
            "                        MOBILE NUMBER\n" +
            "                    </label>\n" +
            "\n" +
            "                    <input id=\"spkPhoneNumber\" name=\"spkPhoneNumber\" type=\"text\" autocomplete=\"off\" placeholder=\"Enter Your Mobile Number \"\n" +
            "                        class=\"sp-provider-icon spdefault \" maxlength=\"15\" minlength=\"12\" onkeyup=\"spkPhoneKeyUp(event)\">\n" +
            "                    <span id=\"spkPhoneNumber_er\" class=\"spk-error\"></span>\n" +
            "\n" +
            "\n" +
            "                    <button is=\"spk-button\" type=\"button\" onclick=\"spkPaySubmit(true, this)\" id=\"spkPayBtn\" class=\"spk-pay-btn\"\n" +
            "                        data-spkAmount=\"1\" data-reference=\"Buy shoes\" data-spkKey=\"pnoWKXcs0dJDesqK2IZj\">Pay </button>\n" +
            "\n" +
            "                    <div id=\"spkCharges\" class=\"spk-checkout-msg\"></div>\n" +
            "                </form>\n" +
            "\n" +
            "            </div>\n" +
            "        </div>\n" +
            "\n" +
            "    </div>";

        pages.requestSent = "" +
            "<div id=\"spkSent\" class=\"spk-checkout\" style=\"display:block\">\n" +
            "\n" +
            "            <div class=\"spk-card\">\n" +
            "                    <div class=\"spk-title\">\n" +
            "                            <span class=\"spk-brand-name\"></span>\n" +
            "            \n" +
            "                        </div>\n" +
            "    \n" +
            "                <div class=\"spk-card-content\">\n" +
            "                    <div class=\"spk-card-icon-sent spk-request-sent\"></div>\n" +
            "    \n" +
            "                    <span class=\"spk-card-content-text\">\n" +
            "                        <p>A Payment Request of <span class=\"spk-highlite\">KES 3, 500</span> <br /> Has Been Sent To <span class=\"spk-highlite\">+254 768 128 458</span>. <br />Enter\n" +
            "                            Your M-PESA PIN To Confirm.</p>\n" +
            "    \n" +
            "                    </span>\n" +
            "    \n" +
            "                    <br>\n" +
            "                </div>\n" +
            "    \n" +
            "            </div>\n" +
            "            <script src=\"./js/index.js\"></script>\n" +
            "    \n" +
            "        </div>"

        pages.loading = "" +
            "<div id=\"spkLoadingCon\" class=\"spk-checkout spk-form\">\n" +
            "\n" +
            "            <div class=\"spk-card\">\n" +
            "            \n" +
            "                    <div class=\"spk-title\">\n" +
            "                        <span class=\"spk-brand-name\"><img src=\"https://s3.amazonaws.com/spektra-checkout/images/mobile-logo.png\" alt=\"Spektra.\" width=\"45\" height=\"14\"></span>\n" +
            "        \n" +
            "                    </div>\n" +
            "                    \n" +
            "                    <div class=\"spk-card-icon\">\n" +
            "                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\" viewBox=\"0 0 30 30\" class=\"c-spinner js-spinner\">\n" +
            "                                    <title></title>\n" +
            "                                    <g fill=\"none\" fill-rule=\"evenodd\">\n" +
            "                                        <path class=\"c-spinner__bar-1\" d=\"M7.132 3.373c-.275-.477-.114-1.085.368-1.363.478-.277 1.093-.108 1.365.363l3.003 5.2c.275.478.114 1.087-.368 1.365-.478.276-1.093.107-1.365-.364l-3.003-5.2z\" fill=\"#858585\"/>\n" +
            "                                        <path class=\"c-spinner__bar-2\" d=\"M2.373 8.865c-.477-.276-.64-.883-.363-1.365.276-.478.892-.64 1.363-.368l5.2 3.003c.478.276.643.883.365 1.365-.276.478-.893.64-1.364.368l-5.2-3.003z\" fill=\"#858585\"/>\n" +
            "                                        <path class=\"c-spinner__bar-3\" d=\"M.997 16C.447 16 0 15.556 0 15c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H.997z\" fill=\"#858585\"/>\n" +
            "                                        <path class=\"c-spinner__bar-4\" d=\"M3.373 22.868c-.477.275-1.085.114-1.363-.368-.277-.478-.108-1.093.363-1.365l5.2-3.003c.478-.275 1.087-.114 1.365.368.276.478.107 1.093-.364 1.365l-5.2 3.003z\" fill=\"#858585\"/>\n" +
            "                                        <path class=\"c-spinner__bar-5\" d=\"M8.865 27.627c-.276.477-.883.64-1.365.363-.478-.276-.64-.892-.368-1.363l3.003-5.2c.276-.478.883-.643 1.365-.365.478.276.64.893.368 1.364l-3.003 5.2z\" fill=\"#858585\"/>\n" +
            "                                        <path class=\"c-spinner__bar-6\" d=\"M16 29.003c0 .55-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006c0-.55.444-.997 1-.997.552 0 1 .453 1 .997v6.006z\" fill=\"#858585\"/>\n" +
            "                                        <path class=\"c-spinner__bar-7\" d=\"M22.868 26.627c.275.477.114 1.085-.368 1.363-.478.277-1.093.108-1.365-.363l-3.003-5.2c-.275-.478-.114-1.087.368-1.365.478-.276 1.093-.107 1.365.364l3.003 5.2z\" fill=\"#858585\"/>\n" +
            "                                        <path class=\"c-spinner__bar-8\" d=\"M27.627 21.135c.477.276.64.883.363 1.365-.276.478-.892.64-1.363.368l-5.2-3.003c-.478-.276-.643-.883-.365-1.365.276-.478.893-.64 1.364-.368l5.2 3.003z\" fill=\"#858585\"/>\n" +
            "                                        <path class=\"c-spinner__bar-9\" d=\"M29.003 14c.55 0 .997.444.997 1 0 .552-.453 1-.997 1h-6.006c-.55 0-.997-.444-.997-1 0-.552.453-1 .997-1h6.006z\" fill=\"#858585\"/>\n" +
            "                                        <path class=\"c-spinner__bar-10\" d=\"M26.627 7.132c.477-.275 1.085-.114 1.363.368.277.478.108 1.093-.363 1.365l-5.2 3.003c-.478.275-1.087.114-1.365-.368-.276-.478-.107-1.093.364-1.365l5.2-3.003z\" fill=\"#858585\"/>\n" +
            "                                        <path class=\"c-spinner__bar-11\" d=\"M21.135 2.373c.276-.477.883-.64 1.365-.363.478.276.64.892.368 1.363l-3.003 5.2c-.276.478-.883.643-1.365.365-.478-.276-.64-.893-.368-1.364l3.003-5.2z\" fill=\"#858585\"/>\n" +
            "                                        <path class=\"c-spinner__bar-12\" d=\"M14 .997c0-.55.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .55-.444.997-1 .997-.552 0-1-.453-1-.997V.997z\" fill=\"#858585\"/>\n" +
            "                                    </g>\n" +
            "                                </svg>\n" +
            "            \n" +
            "                        </div>\n" +
            "\n" +
            "                        <div class=\"spk-card-content\">\n" +
            "                            <span class=\"spk-card-content-text spk-card-loading-text\">We Are Processing Your <br>Payment ...</span>\n" +
            "                        </div>\n" +
            "                </div>\n" +
            "                \n" +
            "\n" +
            "    </div>";

        pages.success = "" +
            "<div id=\"spkSuccess\" class=\"spk-checkout\">\n" +
            "\n" +
            "            <div class=\"spk-card\">\n" +
            "                \n" +
            "                <div class=\"spk-title\">\n" +
            "                        <span class=\"spk-brand-name\"></span>\n" +
            "        \n" +
            "                    </div>\n" +
            "\n" +
            "                <div class=\"spk-card-content\">\n" +
            "                    <div class=\"spk-card-icon-done spk-success-text\"></div>\n" +
            "\n" +
            "                    <span class=\"spk-card-content-text \">\n" +
            "                        <p>Your Payment Of <span style=\"color:#000000; font-family: WhitneyHTF-Bold; font-size: 19;\">KES\n" +
            "                                </span> <br /> Was Successful.\n" +
            "\n" +
            "                        </p>\n" +
            "                    </span>\n" +
            "\n" +
            "                    <br>\n" +
            "                    <button class=\"spk-card-button\">All Done</button>\n" +
            "                </div>\n" +
            "\n" +
            "\n" +
            "\n" +
            "            </div>\n" +
            "        </div>";

        pages.timedOut = "" +
            "<div id=\"spkTimeout\" class=\"spk-checkout\">\n" +
            "\n" +
            "        <div class=\"spk-card\">\n" +
            "            \n" +
            "                <div class=\"spk-title\">\n" +
            "                        <span class=\"spk-brand-name\"></span>\n" +
            "        \n" +
            "                    </div>\n" +
            "            <div class=\"spk-card-content\">\n" +
            "                <div class=\"spk-card-icon-failed spk-timeout-text\"></div>\n" +
            "                <span class=\"spk-card-content-text\"><p>Your Payment Request <br /> <span style=\"color:#000000; font-family: WhitneyHTF-Bold; font-size: 19;\">TIMED OUT!</span></p>\n" +
            "\n" +
            "\n" +
            "                <a href=\"#\" onclick=\"spkTryAgain(\'spkTimeout\')\">Please Try Again</a>\n" +
            "                </span>\n" +
            "\n" +
            "                <br>\n" +
            "            </div>\n" +
            "\n" +
            "        </div>\n" +
            "        <script src=\"./js/index.js\"></script>\n" +
            "\n" +
            "    </div>";

        pages.failed = "" +
            "<div id=\"spkFailed\" class=\"spk-checkout\">\n" +
            "\n" +
            "        <div class=\"spk-card\">\n" +
            "            \n" +
            "                <div class=\"spk-title\">\n" +
            "                        <span class=\"spk-brand-name\"></span>\n" +
            "        \n" +
            "                    </div>\n" +
            "\n" +
            "            <div class=\"spk-card-content\">\n" +
            "                <div class=\"spk-card-icon-failed spk-failed-text\"></div>\n" +
            "                <span class=\"spk-card-content-text\"><p>Your Payment Request <br /> <span style=\"color:#000000; font-family: WhitneyHTF-Bold; font-size: 19;\">FAILED!</span></p>\n" +
            "\n" +
            "\n" +
            "                <a href=\"#\"  onclick=\"spkTryAgain(\'spkFailed\')\">Please Try Again</a>\n" +
            "                </span>\n" +
            "\n" +
            "                <br>\n" +
            "                <button class=\"spk-card-button\" onclick=\"spkChangeNumber()\">Change Number</button>\n" +
            "            </div>\n" +
            "\n" +
            "        </div>\n" +
            "        <script src=\"./js/index.js\"></script>\n" +
            "\n" +
            "    </div>";

        } else {
        pages.stylescss = "@font-face {\n" +
            "    font-family: WhitneyHTF-Black;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Black.otf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-BlackItalic;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-BlackItalic.otf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-BlackItalicSc;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-BlackItalicSC.otf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-BlackSC;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-BlackSC.otf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: whitneyhtf-bolditalic-webfont;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/whitneyhtf-bolditalic-webfont.ttf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-Bold;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Bold.ttf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-Book;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Book.ttf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-Light;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Light.ttf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-Medium;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-Medium.ttf);\n" +
            "}\n" +
            "\n" +
            "@font-face {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    src: url(https://s3.amazonaws.com/spektra-checkout/fonts/WhitneyHTF-SemiBold.ttf);\n" +
            "}\n" +
            "\n" +
            ".ps_checkout {\n" +
            "    background-color: rgba(0, 0, 0, 0.77);\n" +
            "    height: 100%;\n" +
            "    width: 100%;\n" +
            "    /* display: none; */\n" +
            "    top: 0px;\n" +
            "    left: 0px;\n" +
            "    position: fixed;\n" +
            "}\n" +
            "\n" +
            ".spk-card {\n" +
            "    position: relative;\n" +
            "    transform: perspective(1px) translateY(-50%);\n" +
            "    -ms-transform: perspective(1px) translateY(-50%);\n" +
            "    -webkit-transform: perspective(1px) translateY(-50%);\n" +
            "    /* -webkit-transform: perspective(1px)  translateY(40%); */\n" +
            "    -moz-transform: perspective(1px) translateY(-50%);\n" +
            "    top: 50%;\n" +
            "    margin-left: auto;\n" +
            "    margin-right: auto;\n" +
            "    background-color: #f2f2f4;\n" +
            "    width: 320px;\n" +
            "    height: 480px;\n" +
            "    border-radius: 10px 10px 10px 10px;\n" +
            "    box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.10);\n" +
            "    overflow: visible;\n" +
            "}\n" +
            "\n" +
            "/*.ps_form .spk-card {*/\n" +
            "/*transform: translateY(35%) ;*/\n" +
            "/*}*/\n" +
            "/*.spcard-load {*/\n" +
            "/*min-height: 430px ;*/\n" +
            "/*}*/\n" +
            ".spk-card-close {\n" +
            "    position: absolute;\n" +
            "    display: block;\n" +
            "    right: -35px;\n" +
            "    top: 20px;\n" +
            "}\n" +
            "\n" +
            "/*.spclose {*/\n" +
            "/*position: relative ;*/\n" +
            "/*display: inline-block ;*/\n" +
            "/*width: 20px ;*/\n" +
            "/*height: 20px ;*/\n" +
            "/*overflow: hidden ;*/\n" +
            "/*height: 1px ;*/\n" +
            "/*}*/\n" +
            ".spk-card-icon {\n" +
            "    position: relative;\n" +
            "    /* top: 0%;\n" +
            "    transform: translateY(180%); */\n" +
            "    transform: perspective(1px) translateY(-50%);\n" +
            "    -ms-transform: perspective(1px) translateY(-50%);\n" +
            "    -webkit-transform: perspective(1px) translateY(-50%);\n" +
            "    /* -webkit-transform: perspective(1px)  translateY(40%); */\n" +
            "    -moz-transform: perspective(1px) translateY(-50%);\n" +
            "    top: 30%;\n" +
            "    height: 60px;\n" +
            "    width: 120px;\n" +
            "    margin-left: auto;\n" +
            "    margin-right: auto;\n" +
            "}\n" +
            "\n" +
            ".spk-title {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 16px;\n" +
            "    color: #73767F;\n" +
            "    letter-spacing: 0;\n" +
            "    margin: auto;\n" +
            "    padding: 30px 23px;\n" +
            "}\n" +
            "\n" +
            ".spk-logo {\n" +
            "    float: right;\n" +
            "    height: 19px;\n" +
            "    width: 63px;\n" +
            "}\n" +
            "\n" +
            ".spk-card label {\n" +
            "    font-family: WhitneyHTF-Bold;\n" +
            "    font-size: 10px;\n" +
            "    color: #818B92;\n" +
            "    letter-spacing: 0.5px;\n" +
            "    text-align: left;\n" +
            "    display: block;\n" +
            "    background-color: #fff;\n" +
            "}\n" +
            "\n" +
            "spk-card input::-ms-clear {\n" +
            "    display: none;\n" +
            "}\n" +
            "\n" +
            ".spk-card ::-webkit-input-placeholder {\n" +
            "    color: rgba(40, 48, 54, 0.24) !important;\n" +
            "}\n" +
            "\n" +
            "/* Firefox 4-18 */\n" +
            ".spk-card :-moz-placeholder {\n" +
            "    color: rgba(40, 48, 54, 0.24) !important;\n" +
            "}\n" +
            "\n" +
            "/* Firefox 19-50 */\n" +
            ".spk-card ::-moz-placeholder {\n" +
            "    color: rgba(40, 48, 54, 0.24) !important;\n" +
            "}\n" +
            "\n" +
            "/* - Internet Explorer 10–11\n" +
            "   - Internet Explorer Mobile 10-11 */\n" +
            ".spk-card :-ms-input-placeholder {\n" +
            "    color: rgba(40, 48, 54, 0.24) !important;\n" +
            "}\n" +
            "\n" +
            "/* Edge (also supports ::-webkit-input-placeholder) */\n" +
            ".spk-card ::-ms-input-placeholder {\n" +
            "    color: rgba(40, 48, 54, 0.24) !important;\n" +
            "}\n" +
            "\n" +
            "/* CSS Pseudo-Elements Level 4 Editor's Draft */\n" +
            ".spk-card ::placeholder {\n" +
            "    color: rgba(40, 48, 54, 0.24) !important;\n" +
            "}\n" +
            "\n" +
            ".spk-card input {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 14px;\n" +
            "    color: #283036;\n" +
            "    /*letter-spacing: 0 ;*/\n" +
            "    text-align: left;\n" +
            "    border-radius: 1px;\n" +
            "    height: 45px;\n" +
            "    width: 236px;\n" +
            "    padding: 0 20px;\n" +
            "    border: 1.4px solid #DEE2E5;\n" +
            "    border-radius: 4px;\n" +
            "    margin-bottom: 25px;\n" +
            "    margin-top: 10px;\n" +
            "    text-transform: capitalize;\n" +
            "    display: block;\n" +
            "    background-color: #fff;\n" +
            "}\n" +
            "\n" +
            ".spk-card input:focus {\n" +
            "    border: 1.45px solid #0ABF53;\n" +
            "    outline: none;\n" +
            "}\n" +
            "\n" +
            ".spk-card input[valid=true] {\n" +
            "    border: 1.45px solid #0ABF53;\n" +
            "}\n" +
            "\n" +
            ".spk-card input[valid=true]:last-of-type {\n" +
            "    border: 1.45px solid #0ABF53;\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 14px;\n" +
            "    color: #0ABF53;\n" +
            "    letter-spacing: 0;\n" +
            "    text-align: left;\n" +
            "    caret-color: black;\n" +
            "}\n" +
            "\n" +
            ".spk-card input[valid=false] {\n" +
            "    border: 1.45px solid #FF3B30;\n" +
            "}\n" +
            "\n" +
            ".spk-card input[valid=false]:last-of-type {\n" +
            "    border: 1.45px solid #FF3B30;\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 14px;\n" +
            "    color: #FF3B30;\n" +
            "    letter-spacing: 0;\n" +
            "    text-align: left;\n" +
            "    caret-color: black\n" +
            "}\n" +
            "\n" +
            ".spk-card input[valid=true]:placeholder-shown {\n" +
            "    border: 1.45px solid #DEE2E5;\n" +
            "}\n" +
            "\n" +
            ".spk-card input:required:placeholder-shown {\n" +
            "    border: 1.45px solid #DEE2E5;\n" +
            "}\n" +
            "\n" +
            ".spk-card input:required:placeholder-shown:focus {\n" +
            "    border: 1.45px solid #0ABF53;\n" +
            "}\n" +
            "\n" +
            ".spk-card-content {\n" +
            "    color: rgb(118, 121, 130);\n" +
            "    font-family: WhitneyHTF-Medium;\n" +
            "}\n" +
            "\n" +
            ".spk-card-content-text {\n" +
            "    font-style: normal;\n" +
            "    font-stretch: normal;\n" +
            "    line-height: normal;\n" +
            "    letter-spacing: normal;\n" +
            "    color: #73767f;\n" +
            "    position: absolute;\n" +
            "    width: 100%;\n" +
            "    text-align: center;\n" +
            "    font-size: 22px;\n" +
            "    /*padding-right: -25px ;*/\n" +
            "    height: 320px;\n" +
            "}\n" +
            "\n" +
            ".spk-card-loading-text {\n" +
            "    top: 50%;\n" +
            "}\n" +
            "\n" +
            "/*.spk-card-success-text::before {*/\n" +
            "/*font-family: WhitneyHTF-SemiBold ;*/\n" +
            "/*font-size: 22px ;*/\n" +
            "/*color: #0ABF53 ;*/\n" +
            "/*letter-spacing: 0 ;*/\n" +
            "/*text-align: center ;*/\n" +
            "/*content: \"Payment Successful\" ;*/\n" +
            "/*}*/\n" +
            "/*.spk-card-sent-text {*/\n" +
            "/*font-family: WhitneyHTF-SemiBold ;*/\n" +
            "/*position: absolute ;*/\n" +
            "/*width: 100% ;*/\n" +
            "/*text-align: center ;*/\n" +
            "/*font-size: 17px ;*/\n" +
            "/*padding-right: -5px ;*/\n" +
            "/*height: 40% ;*/\n" +
            "/*top: 35% ;*/\n" +
            "/*}*/\n" +
            "/* \n" +
            ".spk-card-sent-text::before {\n" +
            "\n" +
            "\n" +
            "font-family: WhitneyHTF-SemiBold ;\n" +
            "\n" +
            "\n" +
            "font-size: 22px ;\n" +
            "\n" +
            "\n" +
            "content: \"Request Sent\" ;\n" +
            "\n" +
            "\n" +
            "color: #F5A623 ;\n" +
            "\n" +
            "\n" +
            "} */\n" +
            "/*.spk-card-failed-text {*/\n" +
            "/*font-family: WhitneyHTF-SemiBold ;*/\n" +
            "/*position: absolute ;*/\n" +
            "/*width: 100% ;*/\n" +
            "/*text-align: center ;*/\n" +
            "/*font-size: 17px ;*/\n" +
            "/*padding-right: -5px ;*/\n" +
            "/*height: 40% ;*/\n" +
            "/*top: 35% ;*/\n" +
            "/*}*/\n" +
            "/*.spk-card-failed-text::before {*/\n" +
            "/*font-family: WhitneyHTF-SemiBold ;*/\n" +
            "/*font-size: 22px ;*/\n" +
            "/*content: \"Payment Failed\" ;*/\n" +
            "/*color: #FF3B30 ;*/\n" +
            "/*}*/\n" +
            ".spk-card-icon-failed {\n" +
            "    background-image: url(\"https://s3.amazonaws.com/spektra-checkout/images/failed.svg\");\n" +
            "    background-repeat: no-repeat;\n" +
            "    background-repeat: no-repeat;\n" +
            "    background-position: center;\n" +
            "    background-size: 90px 90px;\n" +
            "    margin-left: auto;\n" +
            "    margin-right: auto;\n" +
            "    padding-top: 180px;\n" +
            "    text-align: center;\n" +
            "}\n" +
            "\n" +
            ".spk-card-icon-done {\n" +
            "    background-image: url(\"https://s3.amazonaws.com/spektra-checkout/images/Success.svg\");\n" +
            "    background-repeat: no-repeat;\n" +
            "    background-position: center;\n" +
            "    background-size: 90px 90px;\n" +
            "    margin-left: auto;\n" +
            "    margin-right: auto;\n" +
            "    padding-top: 180px;\n" +
            "    text-align: center;\n" +
            "}\n" +
            "\n" +
            ".spk-card-icon-sent {\n" +
            "    background-image: url(\"https://s3.amazonaws.com/spektra-checkout/images/Pending.svg\");\n" +
            "    background-repeat: no-repeat;\n" +
            "    background-position: center;\n" +
            "    background-size: 90px 90px;\n" +
            "    /* height: 90px;\n" +
            "    width: 90px; */\n" +
            "    margin-left: auto;\n" +
            "    margin-right: auto;\n" +
            "    padding-top: 180px;\n" +
            "    /* padding-bottom: 20px; */\n" +
            "    text-align: center;\n" +
            "}\n" +
            "\n" +
            ".spk-request-sent::after {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 22px;\n" +
            "    content: \"Request Sent\";\n" +
            "    color: #F5A623;\n" +
            "}\n" +
            "\n" +
            ".spk-success-text::after {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 22px;\n" +
            "    color: #0ABF53;\n" +
            "    letter-spacing: 0;\n" +
            "    text-align: center;\n" +
            "    content: \"Payment Successful\";\n" +
            "}\n" +
            "\n" +
            ".spk-failed-text::after {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 22px;\n" +
            "    color: #FF3B30;\n" +
            "    letter-spacing: 0;\n" +
            "    text-align: center;\n" +
            "    content: \"Request Failed\";\n" +
            "}\n" +
            "\n" +
            ".spk-timeout-text::after {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 22px;\n" +
            "    color: #FF3B30;\n" +
            "    letter-spacing: 0;\n" +
            "    text-align: center;\n" +
            "    content: \"Request Timed Out\";\n" +
            "}\n" +
            "\n" +
            "/*.spk-card-sent-text {*/\n" +
            "/*font-family: WhitneyHTF-SemiBold ;*/\n" +
            "/*position: absolute ;*/\n" +
            "/*width: 100% ;*/\n" +
            "/*text-align: center ;*/\n" +
            "/*font-size: 17px ;*/\n" +
            "/*padding-right: -5px ;*/\n" +
            "/*height: 40% ;*/\n" +
            "/*top: 35% ;*/\n" +
            "/*}*/\n" +
            "/* /*  */\n" +
            "sppay-button {\n" +
            "    background-color: rgb(21, 21, 21);\n" +
            "    color: white;\n" +
            "    height: 30px;\n" +
            "    border-radius: 4px;\n" +
            "    outline: 0;\n" +
            "    border: none;\n" +
            "    transition: all .5s ease-in-out;\n" +
            "}\n" +
            "\n" +
            ".spk-card-button {\n" +
            "    background-image: linear-gradient(-180deg, #333333 0%, #000000 100%);\n" +
            "    border: 4px solid #ECECEC;\n" +
            "    border-radius: 4px;\n" +
            "    position: absolute;\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 18px;\n" +
            "    color: #FFFFFF;\n" +
            "    letter-spacing: 0.56px;\n" +
            "    text-align: center;\n" +
            "    width: 80%;\n" +
            "    padding: 15px;\n" +
            "    top: 77%;\n" +
            "    left: 10%;\n" +
            "    outline: none;\n" +
            "    cursor: pointer;\n" +
            "}\n" +
            "\n" +
            "/* .spk-card-content {\n" +
            "    color: rgb(118, 121, 130);\n" +
            "    font-family: WhitneyHTF-Medium;\n" +
            "    font-style: normal;\n" +
            "    font-stretch: normal;\n" +
            "    line-height: normal;\n" +
            "    letter-spacing: normal; \n" +
            "    color: #73767f; \n" +
            "    position: absolute;\n" +
            "    width: 100%;\n" +
            "    text-align: center;\n" +
            "    font-size: 17px;\n" +
            "    /*padding-right: -25px ;\n" +
            "    height: 60%;\n" +
            "    top: 55%;\n" +
            "} */\n" +
            "/*.spk-card-content a {*/\n" +
            "/*color: rgb(44, 131, 235) ;*/\n" +
            "/*display: inline-block ;*/\n" +
            "/*}*/\n" +
            "/*.spk-card-body {*/\n" +
            "/*color: rgb(118, 121, 130) ;*/\n" +
            "/*}*/\n" +
            "/*.spk-card-body a {*/\n" +
            "/*color: #0F76ED ;*/\n" +
            "/*}*/\n" +
            "/*.spk-card-body-no {*/\n" +
            "/*color: rgb(4, 4, 4) ;*/\n" +
            "/*font-weight: 600 ;*/\n" +
            "/*}*/\n" +
            ".spk-error {\n" +
            "    display: inline-table;\n" +
            "    margin-top: -22px;\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 12px;\n" +
            "    color: #FF3B30;\n" +
            "    letter-spacing: 0;\n" +
            "    text-align: left;\n" +
            "    float: left;\n" +
            "    width: 100%\n" +
            "}\n" +
            "\n" +
            ".spk-er-wrapper {}\n" +
            "\n" +
            ".spk-pay-btn {\n" +
            "    background-image: linear-gradient(-180deg, #AA216E 0%, #5D1F5E 100%);\n" +
            "    border: 3px solid #F2F2F2;\n" +
            "    border-radius: 4px;\n" +
            "    font-family: WhitneyHTF-Bold;\n" +
            "    font-size: 18px;\n" +
            "    color: #FFFFFF;\n" +
            "    letter-spacing: 0.56px;\n" +
            "    text-align: center;\n" +
            "    width: 100%;\n" +
            "    padding: 15px;\n" +
            "    outline: none;\n" +
            "    cursor: pointer;\n" +
            "}\n" +
            "\n" +
            "/*.spactive {*/\n" +
            "/*box-shadow: 0 0 40px #dee2e5 ;*/\n" +
            "/*}*/\n" +
            ".spk-checkout-msg {\n" +
            "    font-family: WhitneyHTF-SemiBold;\n" +
            "    font-size: 12px;\n" +
            "    color: #4A90E2;\n" +
            "    letter-spacing: 0.38px;\n" +
            "    text-align: center;\n" +
            "    padding: 10px;\n" +
            "}\n" +
            "\n" +
            ".spk-card-body {\n" +
            "    background: #FFFFFF;\n" +
            "    border-radius: 0px 20px 10px 10px;\n" +
            "    box-shadow: 0 2px 2.5px 0 rgba(0, 0, 0, 0.12);\n" +
            "    height: 362px;\n" +
            "    padding: 20px;\n" +
            "}\n" +
            "\n" +
            ".spdefault {\n" +
            "    background: url(\"https://s3.amazonaws.com/spektra-checkout/images/sim.png\") no-repeat;\n" +
            "    background-size: 45px;\n" +
            "    background-position: 97%;\n" +
            "}\n" +
            "\n" +
            "/*.sp-provider-icon {*/\n" +
            "/*background-size: 45px ;*/\n" +
            "/*background-position: 97% ;*/\n" +
            "/*}*/\n" +
            "/*.spvodafoneghana {*/\n" +
            "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/vodafoneghana.png) no-repeat ;*/\n" +
            "/*background-size: 45px ;*/\n" +
            "/*background-position: 97% ;*/\n" +
            "/*}*/\n" +
            "/*.spmtnghana {*/\n" +
            "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/mtnghana.png) no-repeat ;*/\n" +
            "/*background-size: 45px ;*/\n" +
            "/*background-position: 97% ;*/\n" +
            "/*}*/\n" +
            "/*.sptigoghana {*/\n" +
            "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/airteltigoghana.png) no-repeat ;*/\n" +
            "/*background-size: 45px ;*/\n" +
            "/*background-position: 97% ;*/\n" +
            "/*}*/\n" +
            "/*.spairtelghana {*/\n" +
            "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/airteltigoghana.png) no-repeat ;*/\n" +
            "/*background-size: 45px ;*/\n" +
            "/*background-position: 97% ;*/\n" +
            "/*}*/\n" +
            "/*.spsafaricomkenya {*/\n" +
            "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/mpesa.png) no-repeat ;*/\n" +
            "/*background-size: 45px ;*/\n" +
            "/*background-position: 97% ;*/\n" +
            "/*}*/\n" +
            "/*.spairtelkenya {*/\n" +
            "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/airtelkenya.png) no-repeat ;*/\n" +
            "/*background-size: 45px ;*/\n" +
            "/*background-position: 97% ;*/\n" +
            "/*}*/\n" +
            "/*.sptelkom {*/\n" +
            "/*background: url(https://s3.amazonaws.com/spektra-checkout/images/telkom.png) no-repeat ;*/\n" +
            "/*background-size: 45px ;*/\n" +
            "/*background-position: 97% ;*/\n" +
            "/*}*/\n" +
            "/*@media only screen and (min-height: 400px) and (max-width: 489px) {*/\n" +
            "/*.spk-card {*/\n" +
            "/*margin-bottom: auto ;*/\n" +
            "/*width: 70% ;*/\n" +
            "/*}*/\n" +
            "/*}*/\n" +
            "/*@media only screen and (max-width: 489px) {*/\n" +
            "/*.spk-card {*/\n" +
            "/*width: 60% ;*/\n" +
            "/*}*/\n" +
            "/*}*/\n" +
            "/*@media only screen and (max-width: 768px) {*/\n" +
            "/*.spk-card {*/\n" +
            "/*width: 60% ;*/\n" +
            "/*height: 400px ;*/\n" +
            "/*}*/\n" +
            "/*}*/\n" +
            "/*@media only screen and (min-width: 768px) and (max-width: 1024px) {*/\n" +
            "/*.spk-card {*/\n" +
            "/*margin-top: -160px ;*/\n" +
            "/*width: 33% ;*/\n" +
            "/*}*/\n" +
            "/*}*/\n" +
            "/*@media only screen and (min-width: 1224px) {*/\n" +
            "/*.spk-card {*/\n" +
            "/*margin-top: -100px ;*/\n" +
            "/*width: 25% ;*/\n" +
            "/*}*/\n" +
            "/*}*/\n" +
            "/*@media only screen and (min-width: 1440px) {*/\n" +
            "/*.spk-card {*/\n" +
            "/*margin-top: -100px ;*/\n" +
            "/*width: 25% ;*/\n" +
            "/*}*/\n" +
            "/*}*/\n" +
            "/*@media only screen and (min-width: 1824px) {*/\n" +
            "/*.spk-card {*/\n" +
            "/*margin-top: -100px ;*/\n" +
            "/*width: 13% ;*/\n" +
            "/*}*/\n" +
            "/*}*/\n" +
            "/*vg {*/\n" +
            "/*-webkit-transform: scale(3) ;*/\n" +
            "/*transform: scale(3) ;*/\n" +
            "/*}*/\n" +
            "/*@-webkit-keyframes fade {*/\n" +
            "/*0% {*/\n" +
            "/*opacity: 1 ;*/\n" +
            "/*}*/\n" +
            "/*100% {*/\n" +
            "/*opacity: .1 ;*/\n" +
            "/*}*/\n" +
            "/*}*/\n" +
            "/*@keyframes fade {*/\n" +
            "/*0% {*/\n" +
            "/*opacity: 1 ;*/\n" +
            "/*}*/\n" +
            "/*100% {*/\n" +
            "/*opacity: .1 ;*/\n" +
            "/*}*/\n" +
            "/*}*/\n" +
            "@-webkit-keyframes fade {\n" +
            "    0% {\n" +
            "        opacity: 1;\n" +
            "    }\n" +
            "\n" +
            "    100% {\n" +
            "        opacity: .1;\n" +
            "    }\n" +
            "}\n" +
            "\n" +
            "@keyframes fade {\n" +
            "    0% {\n" +
            "        opacity: 1;\n" +
            "    }\n" +
            "\n" +
            "    100% {\n" +
            "        opacity: .1;\n" +
            "    }\n" +
            "}\n" +
            "\n" +
            ".c-spinner {\n" +
            "    /* Bind the animation */\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-1 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -1s;\n" +
            "    animation-delay: -1s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-2 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.9166666667s;\n" +
            "    animation-delay: -0.9166666667s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-3 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.8333333333s;\n" +
            "    animation-delay: -0.8333333333s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-4 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.75s;\n" +
            "    animation-delay: -0.75s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-5 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.6666666667s;\n" +
            "    animation-delay: -0.6666666667s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-6 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.5833333333s;\n" +
            "    animation-delay: -0.5833333333s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-7 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.5s;\n" +
            "    animation-delay: -0.5s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-8 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.4166666667s;\n" +
            "    animation-delay: -0.4166666667s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-9 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.3333333333s;\n" +
            "    animation-delay: -0.3333333333s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-10 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.25s;\n" +
            "    animation-delay: -0.25s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-11 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.1666666667s;\n" +
            "    animation-delay: -0.1666666667s;\n" +
            "}\n" +
            "\n" +
            ".c-spinner .c-spinner__bar-12 {\n" +
            "    -webkit-animation: fade 1s linear infinite;\n" +
            "    animation: fade 1s linear infinite;\n" +
            "    -webkit-animation-delay: -0.0833333333s;\n" +
            "    animation-delay: -0.0833333333s;\n" +
            "}"

            pages.checkoutForm = "" +
        " <!-- Checkout form section -->\n" +
        "    <div id=\"spkCheckout\" class=\"ps_checkout ps_form\">\n" +
        "\n" +
        "        <div class=\"spk-card\">\n" +
        "            <span class=\"spk-card-close\" onclick=\"spCloseCard('ps_checkout')\">\n" +
        "                <svg width=\"18px\" height=\"18px\" viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"\n" +
        "                    xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
        "                    <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->\n" +
        "                    <title>close</title>\n" +
        "                    <desc>Created with Sketch.</desc>\n" +
        "                    <defs></defs>\n" +
        "                    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
        "                        <g id=\"2C\" transform=\"translate(-574.000000, -90.000000)\" fill=\"#73767F\">\n" +
        "                            <g id=\"3\" transform=\"translate(208.000000, 72.000000)\">\n" +
        "                                <g id=\"Material/Icons-black/close\" transform=\"translate(361.000000, 13.000000)\">\n" +
        "                                    <polygon id=\"Shape\" points=\"19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12\"></polygon>\n" +
        "                                </g>\n" +
        "                            </g>\n" +
        "                        </g>\n" +
        "                    </g>\n" +
        "                </svg>\n" +
        "            </span>\n" +
        "            <div class=\"spk-title\">\n" +
        "                <span class=\"spk-brand-name\">Payment Information</span>\n" +
        "                <span class=\"spk-logo\"><img src=\"https://s3.amazonaws.com/spektra-checkout/images/spektra.png\" alt=\"Spektra.\"\n" +
        "                        width=\"65\" height=\"20\"></span>\n" +
        "            </div>\n" +
        "            <div class=\"spk-card-body\">\n" +
        "                <form id=\"spkCheckoutForm\" name=\"spkCheckoutForm\" class=\"spkCheckout\">\n" +
        "                    <label for=\"spkFirstName\">\n" +
        "                        FIRST NAME\n" +
        "                    </label>\n" +
        "                    <input id=\"spkFirstName\" onkeyup=\"validateName(this)\" name=\"spkFirstName\" type=\"text\" autocomplete=\"off\"" +
        "                        placeholder=\"Enter Your First Name \">\n" +
        "                    <span id=\"spkFirstName_er\" class=\"spk-error\"></span>\n" +
        "\n" +
        "                    <label for=\"spkLastName\">\n" +
        "                        LAST NAME\n" +
        "                    </label>\n" +
        "                    <input id=\"spkLastName\" onkeyup=\"validateName(this)\" name=\"spkLastName\" type=\"text\" autocomplete=\"off\"" +
        "                        placeholder=\"Enter Your Last Name \">\n" +
        "                    <span id=\"spkLastName_er\" class=\"spk-error\"></span>\n" +
        "\n" +
        "                    <label for=\"spkPhoneNumber\">\n" +
        "                        MOBILE NUMBER\n" +
        "                    </label>\n" +
        "\n" +
        "                    <input id=\"spkPhoneNumber\" name=\"spkPhoneNumber\" type=\"text\" autocomplete=\"off\" placeholder=\"Enter Your Mobile Number \"\n" +
        "                        class=\"sp-provider-icon spdefault \" maxlength=\"15\" minlength=\"12\" onkeyup=\"spkPhoneKeyUp(event)\">\n" +
        "                    <span id=\"spkPhoneNumber_er\" class=\"spk-error\"></span>\n" +
        "\n" +
        "\n" +
        "                    <button is=\"spk-button\" type=\"button\" onclick=\"spkPaySubmit(true, this)\" id=\"spkPayBtn\" class=\"spk-pay-btn\"\n" +
        "                        data-spkAmount=\"\" data-reference=\"\" data-spkKey=\"\">Pay </button>\n" +
        "\n" +
        "                    <div id=\"spkCharges\" class=\"spk-checkout-msg\"> </div>\n" +
        "                </form>\n" +
        "\n" +
        "            </div>\n" +
        "        </div>\n" +
        "\n" +
        "    </div>\n" +
        "    <!-- end of checkout form -->\n";

    pages.requestSent = "" +
        "\n" +
        "    <!-- request sent section -->\n" +
        "    <div id=\"spkSent\" class=\"ps_checkout\">\n" +
        "\n" +
        "        <div class=\"spk-card\">\n" +
        "            <span class=\"spk-card-close\" onclick=\"spCloseCard('ps_sent')\">\n" +
        "                <svg width=\"18px\" height=\"18px\" viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"\n" +
        "                    xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
        "                    <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->\n" +
        "                    <title>close</title>\n" +
        "                    <desc>Created with Sketch.</desc>\n" +
        "                    <defs></defs>\n" +
        "                    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
        "                        <g id=\"2C\" transform=\"translate(-574.000000, -90.000000)\" fill=\"#73767F\">\n" +
        "                            <g id=\"3\" transform=\"translate(208.000000, 72.000000)\">\n" +
        "                                <g id=\"Material/Icons-black/close\" transform=\"translate(361.000000, 13.000000)\">\n" +
        "                                    <polygon id=\"Shape\" points=\"19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12\"></polygon>\n" +
        "                                </g>\n" +
        "                            </g>\n" +
        "                        </g>\n" +
        "                    </g>\n" +
        "                </svg>\n" +
        "            </span>\n" +
        "\n" +
        "            <div class=\"spk-card-content\">\n" +
        "                <div class=\"spk-card-icon-sent spk-request-sent\"></div>\n" +
        "\n" +
        "                <span class=\"spk-card-content-text\">\n" +
        "                    <p>A Payment Request <br /> Has Been Sent To Your Number, <br /> Check Your Phone Now And <br />Enter\n" +
        "                        Your <span style=\"color:#000000; font-family: WhitneyHTF-Bold; font-size: 19;\">M-PESA PIN</span>\n" +
        "                        <br /> To Confirm.</p>\n" +
        "\n" +
        "\n" +
        "\n" +
        "                </span>\n" +
        "\n" +
        "                <br>\n" +
        "            </div>\n" +
        "\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <!-- end of request sent section -->\n" +
        "\n";

    pages.loading = "" +
        "<!-- request loading section -->\n" +
        "    <div id=\"spkLoading\" class=\"ps_checkout\">\n" +
        "\n" +
        "        <div class=\"spk-card \">\n" +
        "            <span class=\"spk-card-close\" onclick=\"spCloseCard('ps_loading')\">\n" +
        "                <svg width=\"18px\" height=\"18px\" viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\"\n" +
        "                    xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
        "                    <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->\n" +
        "                    <title>close</title>\n" +
        "                    <desc>Created with Sketch.</desc>\n" +
        "                    <defs></defs>\n" +
        "                    <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
        "                        <g id=\"2C\" transform=\"translate(-574.000000, -90.000000)\" fill=\"#73767F\">\n" +
        "                            <g id=\"3\" transform=\"translate(208.000000, 72.000000)\">\n" +
        "                                <g id=\"Material/Icons-black/close\" transform=\"translate(361.000000, 13.000000)\">\n" +
        "                                    <polygon id=\"Shape\" points=\"19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12\"></polygon>\n" +
        "                                </g>\n" +
        "                            </g>\n" +
        "                        </g>\n" +
        "                    </g>\n" +
        "                </svg>\n" +
        "            </span>\n" +
        "            <div class=\"spk-card-icon\">\n" +
        "                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"120\" height=\"120\" viewBox=\"0 0 30 30\" class=\"c-spinner js-spinner\">\n" +
        "                    <title></title>\n" +
        "                    <g fill=\"none\" fill-rule=\"evenodd\">\n" +
        "                        <path class=\"c-spinner__bar-1\" d=\"M7.132 3.373c-.275-.477-.114-1.085.368-1.363.478-.277 1.093-.108 1.365.363l3.003 5.2c.275.478.114 1.087-.368 1.365-.478.276-1.093.107-1.365-.364l-3.003-5.2z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-2\" d=\"M2.373 8.865c-.477-.276-.64-.883-.363-1.365.276-.478.892-.64 1.363-.368l5.2 3.003c.478.276.643.883.365 1.365-.276.478-.893.64-1.364.368l-5.2-3.003z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-3\" d=\"M.997 16C.447 16 0 15.556 0 15c0-.552.453-1 .997-1h6.006c.55 0 .997.444.997 1 0 .552-.453 1-.997 1H.997z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-4\" d=\"M3.373 22.868c-.477.275-1.085.114-1.363-.368-.277-.478-.108-1.093.363-1.365l5.2-3.003c.478-.275 1.087-.114 1.365.368.276.478.107 1.093-.364 1.365l-5.2 3.003z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-5\" d=\"M8.865 27.627c-.276.477-.883.64-1.365.363-.478-.276-.64-.892-.368-1.363l3.003-5.2c.276-.478.883-.643 1.365-.365.478.276.64.893.368 1.364l-3.003 5.2z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-6\" d=\"M16 29.003c0 .55-.444.997-1 .997-.552 0-1-.453-1-.997v-6.006c0-.55.444-.997 1-.997.552 0 1 .453 1 .997v6.006z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-7\" d=\"M22.868 26.627c.275.477.114 1.085-.368 1.363-.478.277-1.093.108-1.365-.363l-3.003-5.2c-.275-.478-.114-1.087.368-1.365.478-.276 1.093-.107 1.365.364l3.003 5.2z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-8\" d=\"M27.627 21.135c.477.276.64.883.363 1.365-.276.478-.892.64-1.363.368l-5.2-3.003c-.478-.276-.643-.883-.365-1.365.276-.478.893-.64 1.364-.368l5.2 3.003z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-9\" d=\"M29.003 14c.55 0 .997.444.997 1 0 .552-.453 1-.997 1h-6.006c-.55 0-.997-.444-.997-1 0-.552.453-1 .997-1h6.006z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-10\" d=\"M26.627 7.132c.477-.275 1.085-.114 1.363.368.277.478.108 1.093-.363 1.365l-5.2 3.003c-.478.275-1.087.114-1.365-.368-.276-.478-.107-1.093.364-1.365l5.2-3.003z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-11\" d=\"M21.135 2.373c.276-.477.883-.64 1.365-.363.478.276.64.892.368 1.363l-3.003 5.2c-.276.478-.883.643-1.365.365-.478-.276-.64-.893-.368-1.364l3.003-5.2z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                        <path class=\"c-spinner__bar-12\" d=\"M14 .997c0-.55.444-.997 1-.997.552 0 1 .453 1 .997v6.006c0 .55-.444.997-1 .997-.552 0-1-.453-1-.997V.997z\"\n" +
        "                            fill=\"#858585\" />\n" +
        "                    </g>\n" +
        "                </svg>\n" +
        "\n" +
        "            </div>\n" +
        "            <div class=\"spk-card-content\">\n" +
        "\n" +
        "                <span class=\"spk-card-content-text spk-card-loading-text\">We Are Processing Your Payment ...</span>\n" +
        "\n" +
        "            </div>\n" +
        "\n" +
        "        </div>\n" +
        "        <!-- loading section end -->\n" +
        "\n";

    pages.success = "" +
        "\"<!-- request succesful section -->\\n\" +\n" +
        "    \"        <div id=\\\"spkSuccess\\\" class=\\\"ps_checkout\\\">\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"            <div class=\\\"spk-card\\\">\\n\" +\n" +
        "    \"                <span class=\\\"spk-card-close\\\" onclick=\\\"spCloseCard('ps_success')\\\">\\n\" +\n" +
        "    \"                    <svg width=\\\"18px\\\" height=\\\"18px\\\" viewBox=\\\"0 0 14 14\\\" version=\\\"1.1\\\" xmlns=\\\"http://www.w3.org/2000/svg\\\"\\n\" +\n" +
        "    \"                        xmlns:xlink=\\\"http://www.w3.org/1999/xlink\\\">\\n\" +\n" +
        "    \"                        <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->\\n\" +\n" +
        "    \"                        <title>close</title>\\n\" +\n" +
        "    \"                        <desc>Created with Sketch.</desc>\\n\" +\n" +
        "    \"                        <defs></defs>\\n\" +\n" +
        "    \"                        <g id=\\\"Page-1\\\" stroke=\\\"none\\\" stroke-width=\\\"1\\\" fill=\\\"none\\\" fill-rule=\\\"evenodd\\\">\\n\" +\n" +
        "    \"                            <g id=\\\"2C\\\" transform=\\\"translate(-574.000000, -90.000000)\\\" fill=\\\"#73767F\\\">\\n\" +\n" +
        "    \"                                <g id=\\\"3\\\" transform=\\\"translate(208.000000, 72.000000)\\\">\\n\" +\n" +
        "    \"                                    <g id=\\\"Material/Icons-black/close\\\" transform=\\\"translate(361.000000, 13.000000)\\\">\\n\" +\n" +
        "    \"                                        <polygon id=\\\"Shape\\\" points=\\\"19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12\\\"></polygon>\\n\" +\n" +
        "    \"                                    </g>\\n\" +\n" +
        "    \"                                </g>\\n\" +\n" +
        "    \"                            </g>\\n\" +\n" +
        "    \"                        </g>\\n\" +\n" +
        "    \"                    </svg>\\n\" +\n" +
        "    \"                </span>\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"                <div class=\\\"spk-card-content\\\">\\n\" +\n" +
        "    \"                    <div class=\\\"spk-card-icon-done spk-success-text\\\"></div>\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"                    <span class=\\\"spk-card-content-text \\\">\\n\" +\n" +
        "    \"                        <p>Your Payment Of <span id=\"spkAmount\" style=\\\"color:#000000; font-family: WhitneyHTF-Bold; font-size: 19;\\\">\\n\" +\n" +
        "    \"                                </span> <br /> Was Successful.\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"                        </p>\\n\" +\n" +
        "    \"                    </span>\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"                    <br>\\n\" +\n" +
        "    \"                    <button class=\\\"spk-card-button\\\">All Done</button>\\n\" +\n" +
        "    \"                </div>\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"\\n\" +\n" +
        "    \"            </div>\\n\" +\n" +
        "    \"        </div>\\n\" +\n" +
        "    \"        <!-- end of request succesful section -->\"";

    pages.timedOut = "" +
        "<!-- request timeout section -->\n" +
        "        <div id=\"spkTimeout\" class=\"ps_checkout\">\n" +
        "\n" +
        "            <div class=\"spk-card\">\n" +
        "                <span class=\"spk-card-close\" onclick=\"spCloseCard('ps_sent')\">\n" +
        "                            <svg width=\"18px\" height=\"18px\" viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
        "                            <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->\n" +
        "                            <title>close</title>\n" +
        "                            <desc>Created with Sketch.</desc>\n" +
        "                            <defs></defs>\n" +
        "                            <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
        "                                <g id=\"2C\" transform=\"translate(-574.000000, -90.000000)\" fill=\"#73767F\">\n" +
        "                                    <g id=\"3\" transform=\"translate(208.000000, 72.000000)\">\n" +
        "                                        <g id=\"Material/Icons-black/close\" transform=\"translate(361.000000, 13.000000)\">\n" +
        "                                            <polygon id=\"Shape\" points=\"19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12\"></polygon>\n" +
        "                                        </g>\n" +
        "                                    </g>\n" +
        "                                </g>\n" +
        "                            </g>\n" +
        "                        </svg>\n" +
        "                    </span>\n" +
        "    \n" +
        "                <div class=\"spk-card-content\">\n" +
        "                    <div class=\"spk-card-icon-failed spk-timeout-text\"></div>\n" +
        "                    <span class=\"spk-card-content-text\"><p>Your Payment Request <br /> <span style=\"color:#000000; font-family: WhitneyHTF-Bold; font-size: 19;\">TIMED OUT!</span></p>\n" +
        "    \n" +
        "    \n" +
        "                    <a href=\"#\"  onclick=\"spkTryAgain(\'spkTimeout\')\">Please Try Again</a>\n" +
        "                    </span>\n" +
        "    \n" +
        "                    <br>\n" +
        "                </div>\n" +
        "    \n" +
        "            </div>\n" +
        "            <script src=\"./js/index.js\"></script>\n" +
        "    \n" +
        "        </div>\n" +
        "        <!-- Enf of request timeout section -->";

    pages.failed = "" +
        "<!-- Request failed section -->\n" +
        "        <div id=\"pskFailed\" class=\"ps_checkout\">\n" +
        "\n" +
        "            <div class=\"spk-card\">\n" +
        "                <span class=\"spk-card-close\" onclick=\"spCloseCard('ps_sent')\">\n" +
        "                            <svg width=\"18px\" height=\"18px\" viewBox=\"0 0 14 14\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n" +
        "                            <!-- Generator: Sketch 51.2 (57519) - http://www.bohemiancoding.com/sketch -->\n" +
        "                            <title>close</title>\n" +
        "                            <desc>Created with Sketch.</desc>\n" +
        "                            <defs></defs>\n" +
        "                            <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n" +
        "                                <g id=\"2C\" transform=\"translate(-574.000000, -90.000000)\" fill=\"#73767F\">\n" +
        "                                    <g id=\"3\" transform=\"translate(208.000000, 72.000000)\">\n" +
        "                                        <g id=\"Material/Icons-black/close\" transform=\"translate(361.000000, 13.000000)\">\n" +
        "                                            <polygon id=\"Shape\" points=\"19 6.4 17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12\"></polygon>\n" +
        "                                        </g>\n" +
        "                                    </g>\n" +
        "                                </g>\n" +
        "                            </g>\n" +
        "                        </svg>\n" +
        "                    </span>\n" +
        "    \n" +
        "                <div class=\"spk-card-content\">\n" +
        "                    <div class=\"spk-card-icon-failed spk-failed-text\"></div>\n" +
        "                    <span class=\"spk-card-content-text\"><p>Your Payment Request <br /> <span style=\"color:#000000; font-family: WhitneyHTF-Bold; font-size: 19;\">FAILED!</span></p>\n" +
        "    \n" +
        "    \n" +
        "                    <a href=\"#\"  onclick=\"spkTryAgain(\'spkFailed\')\">Please Try Again</a>\n" +
        "                    </span>\n" +
        "    \n" +
        "                    <br>\n" +
        "                    <button class=\"spk-card-button\">Change Number</button>\n" +
        "                </div>\n" +
        "    \n" +
        "            </div>\n" +
        "    \n" +
        "        </div>\n" +
        "\n" +
        "        <!-- End of request failed section -->";
    }

    var selector = function (codeString, stylescss) {
        // console.log(config.targetElement, "comparing", document.getElementById("spkCheckout"));
        try {
            // console.log("Attempting to load styles", window.spkCss)
            document.getElementById("spkCheckoutDiv").innerHTML += codeString;

        } catch (e) {
            document.body.innerHTML += '<div id="spkCheckoutDiv">' + "<style>" + stylescss+ "</style>" + codeString + '</div>';
        }

        var target = document.getElementById(config.targetElement);
        target.style.display = "block";
        // root.spkGetCharges();
    }
    var payForm = function (codeString, btn, stylescss) {
        // console.log(btn, "This is the button", btn.dataset.amt);
        // console.log("comparing", codeString);
        try {
            // console.log("Attempting to load styles", window.spkCss)
            document.getElementById("spkCheckoutDiv").innerHTML += codeString;

        } catch (e) {
            document.body.innerHTML += '<div id="spkCheckoutDiv">' + "<style>" + stylescss + "</style>" + codeString + '</div>';
        }

        var target = document.getElementById(config.targetElement);
        var payBtn = document.getElementById("spkPayBtn");
        payBtn.dataset.reference = btn.dataset.reference;
        payBtn.dataset.spkamount = btn.dataset.amt;
        payBtn.dataset.spkkey = btn.dataset.key;
        target.style.display = "block";

        root.spkGetCharges(payBtn);
    }

    exports.showSuccess = function () {
        return selector(pages.success, pages.stylescss);
    };
    exports.showError = function () {
        return selector(pages.failed, pages.stylescss);
    };
    exports.showTimeout = function () {
        return selector(pages.timedout, pages.stylescss);
    };
    exports.showSent = function () {
        return selector(pages.requestSent, pages.stylescss);
    };
    exports.showLoading = function () {
        return selector(pages.loading, pages.stylescss);
    };
    exports.showForm = function (btn) {

        return payForm(pages.checkoutForm, btn, pages.stylescss);
    };

    exports.setTarget = function (value) {
        config.targetElement = value
    };

    return exports;
});



(function () {

    'use strict';

    var exports = {};

    var options = {
        contentType: 'application/x-www-form-urlencoded',
        responseType: 'json'
    };

    var parse = function (req) {
        var result;
        try {
            result = JSON.parse(req.responseText);
        } catch (e) {
            result = req.responseText;
        }
        return [result, req];
    };

    var xhr = function (httpMethod, url, data, contentType) {
        var contentTypeHeader = contentType || options.contentType;
        var responseType = options.responseType;
        var methods = {
            success: function () {},
            error: function () {}
        };
        var XHR = window.XMLHttpRequest || ActiveXObject;
        var request = new XHR('MSXML2.XMLHTTP.3.0');
        request.open(httpMethod, url, true);
        request.setRequestHeader('Content-Type', contentTypeHeader);
        request.responseType = responseType;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    if (responseType != "json") {
                        methods.success.apply(methods, parse(request));
                    } else {
                        methods.success.apply(methods, [request.response, request]);
                    }

                } else {
                    if (responseType != "json") {
                        methods.error.apply(methods, parse(request));
                    } else {
                        methods.error.apply(methods, [request.response, request]);
                    }
                }
            }
        };
        request.send(data);
        // console.log()
        var callbacks = {
            success: function (callback) {
                methods.success = callback;
                return callbacks;
            },
            error: function (callback) {
                methods.error = callback;
                return callbacks;
            }
        };

        return callbacks;
    };

    exports['get'] = function (src) {
        return xhr('GET', src);
    };

    exports['put'] = function (url, data, contentType) {
        return xhr('PUT', url, data, contentType);
    };

    exports['post'] = function (url, data, contentType) {
        return xhr('POST', url, data, contentType);
    };

    exports['delete'] = function (url) {
        return xhr('DELETE', url);
    };

    exports['setContentType'] = function (contentType) {
        options.contentType = contentType;
    };

    exports['setResponseType'] = function (responseType) {
        options.responseType = responseType;
    };

    // check for AMD/Module support, otherwise define Bullet as a global variable.
    if (typeof define !== 'undefined' && define.amd) {
        // AMD. Register as an anonymous module.
        define(function () {
            return exports;
        });

    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = exports;
    } else {
        window.spkAjax = exports;
    }

})();