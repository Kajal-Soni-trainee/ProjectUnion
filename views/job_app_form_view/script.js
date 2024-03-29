function removeExperience() {
    console.log("remove calling");
    let con = document.getElementsByClassName("work_exp_con")[0];
    let exp = document.getElementsByClassName("exp");
    con.removeChild(exp[exp.length - 1]);
}

function addExperience() {
    let con = document.getElementsByClassName("work_exp_con")[0];
    let txt = '<div class="exp"><div><label>Company Name</label><input type="text" name="cname[]" class="onlychar"/><p><span class="err"></span></p></div>&nbsp;<div><label>Position</label><input type="text" name="pos[]" class="onlychar"/><p><span class="err"></span></p></div>&nbsp;<div><label>From</label><input type="text" name="from[]" class="year"/><p><span class="err"></span></p></div>&nbsp;<div><label>To</label><input type="text"  name="to[]" class="year" /><p><span class="err"></span></p></div><br><hr></div>';
    con.innerHTML += txt;
}
function addRef() {
    let con = document.getElementsByClassName("ref_con")[0];
    let txt = '<div class="ref"><div><label>Name</label><input type="text"  name="ename[]" class="onlychar"/><p><spanclass="err"></span></p></div>&nbsp;<div><label>Designation</label><input type="text" name="edesign[]" class="onlychar" /><p><span class="err"></span></p></div>&nbsp;<div><label>Relation</label><input type="text" name="erelation[]" class="onlychar" /><p><span class="err"></span></p></div><br><hr></div>';
    con.innerHTML += txt;
}
function removeRef() {
    let con = document.getElementsByClassName("ref_con")[0];
    let ref = document.getElementsByClassName("ref");
    con.removeChild(ref[ref.length - 1]);
}
function validate(e) {
    console.log("validate calling");
    let cname = document.getElementsByName('cname[]');
    let pos = document.getElementsByName('pos[]');
    let from = document.getElementsByName('from[]');
    let to = document.getElementsByName('to[]');
    let ename = document.getElementsByName('ename[]');
    let edesign = document.getElementsByName('edesign[]');
    let erelation = document.getElementsByName('erelation[]');

    console.log(cname);
    console.log(pos);
    console.log(from);
    console.log(to);
    console.log(ename);
    console.log(edesign);
    console.log(erelation);

    let len = ename.length;

    for (let i = 0; i < len; i++) {
        if (ename[i].value != "") {
            if (edesign[i].value == "") {
                let div = edesign[i].parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "please enter employee's designation";
            }
            else{
                let div = edesign[i].parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "";
            }
            if (erelation[i].value == "") {
                let div = erelation[i].parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "please enter your relation with employee";
            }
            else{
                let div = erelation[i].parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "";
            }
            if (edesign[i].value == "" && erelation[i].value == "") {
                return false;
            }
            
        }
        if (edesign[i].value != "") {
            if (ename[i].value == "") {
                let div = ename[i].parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "please enter employee's name";
            }
            else{
                let div = ename[i].parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "";
            }
            if (erelation[i].value == "") {
                let div = erelation[i].parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "please enter your relation with employee";
            }
            else{
                let div = erelation[i].parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "";
            }
            if (ename[i].value == "" && erelation[i].value == "") {
                return false;
            }
        }
        if (erelation[i].value != "") {
            if (edesign[i].value == "") {
                let div = edesign[i].parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "please enter employee's designation";
            }
            else{
                let div = edesign[i].parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "";
            }
            if (ename[i].value == "") {
                let div = ename[i].parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "please enter employee's name";
            }
            else{
                let div = ename[i].parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "";
            }
            if (edesign[i].value == "" && ename[i].value == "") {
                return false;
            }
        }
    }


    let elements = document.getElementsByClassName('req');
    let elementsArr = Array.from(elements);
    elementsArr.forEach(element => {
        if (element.value == "") {
            console.log("the value of element " + element.value);
            let div = element.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "Please enter some value";
            return false;
        }
    
        else {
            let div = element.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "";
        }
    });
    let genFlag = 0;
    let gender = document.getElementsByName('gender');
    let genArr = Array.from(gender);
    genArr.forEach((item) => {
        if (item.checked) {
            genFlag++;
        }
    });
    console.log(genFlag);
    if (genFlag == 0) {
        document.getElementsByClassName('gen')[0].getElementsByTagName('span')[0].innerHTML = "Please select your gender";
        return false;
    }


    let fname = document.getElementById('fname');
    let lname = document.getElementById('lname');
    let design = document.getElementById('design');
    let email = document.getElementById('email');
    let add1 = document.getElementById('add1');
    let add2 = document.getElementById('add2');
    let state = document.getElementById('state');
    let city = document.getElementById('city');
    let zipcode = document.getElementById('zipcode');
    let phone = document.getElementById('phone');
    let ssc_boardname = document.getElementById('ssc_boardname');
    let ssc_sname = document.getElementById('ssc_name');
    let ssc_pyear = document.getElementById('ssc_pyear');
    let ssc_percent = document.getElementById('ssc_percent');
    let hsc_boardname = document.getElementById('hsc_boardname');
    let hsc_sname = document.getElementById('hsc_name');
    let hsc_pyear = document.getElementById('hsc_pyear');
    let hsc_percent = document.getElementById('hsc_percent');
    let d_boardname = document.getElementById('d_boardname');
    let d_sname = document.getElementById('d_sname');
    let d_pyear = document.getElementById('d_pyear');
    let d_percent = document.getElementById('d_percent');
    let m_boardname = document.getElementById('m_boardname');
    let m_sname = document.getElementById('m_sname');
    let m_pyear = document.getElementById('m_pyear');
    let m_percent = document.getElementById('m_percent');
    let hindi = document.getElementById('hindi');
    let hread = document.getElementById('hread');
    let hwrite = document.getElementById('hwrite');
    let hspeak = document.getElementById('hspeak');
    let english = document.getElementById('english');
    let eread = document.getElementById('eread');
    let ewrite = document.getElementById('ewrite');
    let espeak = document.getElementById('espeak');
    let gujarati = document.getElementById('gujarati');
    let gread = document.getElementById('gread');
    let gwrite = document.getElementById('gwrite');
    let gspeak = document.getElementById('gspeak');
    let php = document.getElementById('php');
    let phigh = document.getElementById('phigh');
    let paverage = document.getElementById('paverage');
    let plow = document.getElementById('plow');
    let java = document.getElementById('java');
    let jhigh = document.getElementById('jhigh');
    let javerage = document.getElementById('javerage');
    let jlow = document.getElementById('jlow');
    let oracle = document.getElementById('oracle');
    let ohigh = document.getElementById('ohigh');
    let oaverage = document.getElementById('oaverage');
    let olow = document.getElementById('olow');
    let cname1 = document.getElementById('cname1');
    let pos1 = document.getElementById('pos1');
    let from1 = document.getElementById('from1');
    let to1 = document.getElementById('to1');
    let ename1 = document.getElementById('ename1');
    let edesign1 = document.getElementById('edesign1');
    let erelation1 = document.getElementById('erelation1');
    let e_ctc = document.getElementById('e_ctc');
    let c_ctc = document.getElementById('c_ctc');
    let n_period = document.getElementById('n_period');
    if (add1.value == "") {
        let div = add1.parentElement;
        div.getElementsByTagName("span").innerHTML = "Please enter your permanent address";
        return false;
    }
    let namePtn = /[a-zA-Z]/;
    console.log(fname.value);
    if (!namePtn.test(fname.value)) {
        let div = fname.parentElement;
        div.getElementsByTagName('span')[0].innerHTML = "your name should only contain characters";
        return false;
    }
    if (!namePtn.test(lname.value)) {
        let div = lname.parentElement;
        div.getElementsByTagName('span')[0].innerHTML = "your name should only contain characters";
        return false;
    }
    let phonePtn = /[0-9]{10}/;
    if (!phonePtn.test(phone.value)) {
        console.log(phone);
        let div = phone.parentElement;
        div.getElementsByTagName('span')[0].innerHTML = "your phone number should be a 10 digit nummber";
        return false;
    }

    let emailPtn = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailPtn.test(email.value)) {
        let div = email.parentElement;
        div.getElementsByTagName('span')[0].innerHTML = "please enter correct email";
        return false;
    }

    if (d_boardname.value != "") {
        if (d_percent.value == "") {
            let div = d_percent.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your percentage";
        }
        if (d_pyear.value == "") {
            let div = d_pyear.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your passing year";
        }
        if (d_sname.value == "") {
            let div = d_sname.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter course name";
        }
        if (d_percent.value == "" || d_pyear.value == "" || d_sname.value == "") {
            return false;
        }
    }

    if (d_percent.value != "") {
        if (d_boardname.value == "") {
            let div = d_boardname.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your course name";
        }
        if (d_pyear.value == "") {
            let div = d_pyear.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your passing year";
        }
        if (d_sname.value == "") {
            let div = d_sname.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter university name";
        }
        if (d_boardname.value == "" || d_pyear.value == "" || d_sname.value == "") {
            return false;
        }
    }

    if (d_pyear.value != "") {
        if (d_boardname.value == "") {
            let div = d_boardname.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your course name";
        }
        if (d_percent.value == "") {
            let div = d_percent.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your percentage";
        }
        if (d_sname.value == "") {
            let div = d_sname.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter university name";
        }
        if (d_percent.value == "" || d_boardname.value == "" || d_sname.value == "") {
            return false;
        }
    }

    if (d_sname.value != "") {
        if (d_boardname.value == "") {
            let div = d_boardname.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your university name";
        }
        if (d_percent.value == "") {
            let div = d_percent.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your percentage";
        }
        if (d_pyear.value == "") {
            let div = d_pyear.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your passing year";
        }
        if (d_percent.value == "" || d_boardname.value == "" || d_pyear.value == "") {
            return false;
        }
    }

    if (m_boardname.value != "") {
        if (m_percent.value == "") {
            let div = m_percent.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your percentage";
        }
        if (m_pyear.value == "") {
            let div = m_pyear.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your passing year";
        }
        if (m_sname.value == "") {
            let div = m_sname.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter course name";
        }
        if (m_percent.value == "" || m_pyear.value == "" || m_sname.value == "") {
            return false;
        }
    }

    if (m_percent.value != "") {
        if (m_boardname.value == "") {
            let div = m_boardname.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your course name";
        }
        if (m_pyear.value == "") {
            let div = m_pyear.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your passing year";
        }
        if (m_sname.value == "") {
            let div = m_sname.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter university name";
        }
        if (m_boardname.value == "" || m_pyear.value == "" || m_sname.value == "") {
            return false;
        }
    }

    if (m_pyear.value != "") {
        if (m_boardname.value == "") {
            let div = m_boardname.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your course name";
        }
        if (m_percent.value == "") {
            let div = m_percent.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your percentage";
        }
        if (m_sname.value == "") {
            let div = m_sname.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter university name";
        }
        if (m_percent.value == "" || m_boardname.value == "" || m_sname.value == "") {
            return false;
        }
    }

    if (m_sname.value != "") {
        if (m_boardname.value == "") {
            let div = m_boardname.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your university name";
        }
        if (m_percent.value == "") {
            let div = m_percent.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your percentage";
        }
        if (m_pyear.value == "") {
            let div = m_pyear.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your passing year";
        }
        if (m_percent.value == "" || m_boardname.value == "" || m_pyear.value == "") {
            return false;
        }
    }


    if (cname1.value != "") {
        if (pos1.value == "") {
            let div = pos1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your postion in company";
        }
        if (from1.value == "") {
            let div = from1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your joining date in company";
        }
        if (to1.value == "") {
            let div = to1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your resignation date in company";
        }
        if (pos1.value == "" && from1.value == "" && to1.value == "") {
            return false;
        }
    }

    if (pos1.value != "") {
        if (cname1.value == "") {
            let div = cname1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your company name";
        }
        if (from1.value == "") {
            let div = from1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your joining date in company";
        }
        if (to1.value == "") {
            let div = to1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your resignation date in company";
        }
        if (cname1.value == "" && from1.value == "" && to1.value == "") {
            return false;
        }
    }

    if (from1.value != "") {
        if (cname1.value == "") {
            let div = cname1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your company name";
        }
        if (pos1.value == "") {
            let div = from1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your postion in company";
        }
        if (to1.value == "") {
            let div = to1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your resignation date in company";
        }
        if (cname1.value == "" && pos1.value == "" && to1.value == "") {
            return false;
        }
    }

    if (to1.value != "") {
        if (cname1.value == "") {
            let div = cname1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your company name";
        }
        if (pos1.value == "") {
            let div = from1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your postion in company";
        }
        if (from1.value == "") {
            let div = to1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter your joining date in company";
        }
        if (cname1.value == "" && pos1.value == "" && from1.value == "") {
            return false;
        }
    }


    if (ename1.value != "") {
        if (edesign1.value == "") {
            let div = edesign1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter employee's designation";
        }
        if (erelation1.value == "") {
            let div = erelation1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter relation with employee";
        }
        if (edesign1.value == "" && erelation1.value == "") {
            return false;
        }
    }
    if (edesign1.value != "") {
        if (ename1.value == "") {
            let div = ename1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "Please enter employee's name";
        }
        if (erelation1.value == "") {
            let div = erelation1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter relation with employee";
        }
        if (ename1.value == "" && erelation1.value == "") {
            return false;
        }
    }

    if (erelation1.value != "") {
        if (ename1.value == "") {
            let div = ename1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "Please enter employee's name";
        }
        if (edesign1.value == "") {
            let div = erelation1.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please enter employee's designation";
        }
        if (ename1.value == "" && edesign1.value == "") {
            return false;
        }
    }

    if (hindi.checked) {
        let hflag = 0;
        if (hread.checked) {
            hflag++;
        }
        if (hwrite.checked) {
            hflag++;
        }
        if (hspeak.checked) {
            hflag++;
        }
        if (hflag == 0) {
            let div = hindi.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please select atleast one option";
            return false;
        }
    }
    if (english.checked) {
        console.log("checked");
        let eflag = 0;
        if (eread.checked) {
            eflag++;
        }
        if (ewrite.checked) {
            eflag++;
        }
        if (espeak.checked) {
            eflag++;
        }
        console.log(eflag);
        if (eflag == 0) {

            let div = english.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please select atleast one option";
            return false;
        }
    }

    if (gujarati.checked) {
        let gflag = 0;
        if (gread.checked) {
            gflag++;
        }
        if (gwrite.checked) {
            gflag++;
        }
        if (gspeak.checked) {
            gflag++;
        }
        if (gflag == 0) {
            console.log(gflag);
            let div = gujarati.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please select atleast one option";
            return false;
        }
    }


    if (hread.checked || hwrite.checked || hspeak.checked) {
        hindi.checked = true;
    }

    if (eread.checked || ewrite.checked || espeak.checked) {
        english.checked = true;
    }
    if (gread.checked || gwrite.checked || gspeak.checked) {
        gujarati.checked = true;
    }

    if (phigh.checked || paverage.checked || plow.checked) {
        php.checked = true;
    }
    if (jhigh.checked || javerage.checked || jlow.checked) {
        java.checked = true;
    }
    if (ohigh.checked || oaverage.checked || olow.checked) {
        oracle.checked = true;
    }

    if (php.checked) {
        let phpflag = 0;
        if (phigh.checked) {
            phpflag++;
        }
        if (paverage.checked) {
            phpflag++;
        }
        if (plow.checked) {
            phpflag++;
        }
        if (phpflag == 0) {
            let div = php.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please select one of the option";
            return false;
        }
    }

    if (java.checked) {
        let javaflag = 0;
        if (jhigh.checked) {
            javaflag++;
        }
        if (javerage.checked) {
            javaflag++;
        }
        if (jlow.checked) {
            javaflag++;
        }
        if (javaflag == 0) {
            let div = java.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please select one of the option";
            return false;
        }
    }

    if (oracle.checked) {
        let oflag = 0;
        if (ohigh.checked) {
            oflag++;
        }
        if (oaverage.checked) {
            oflag++;
        }
        if (olow.checked) {
            oflag++;
        }
        if (oflag == 0) {
            let div = oracle.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "please select one of the option";
            return false;
        }
    }

    let onlychar = document.getElementsByClassName("onlychar");
    let onlycharArr = Array.from(onlychar);
    let charPattern = /[0-9]/;
    onlycharArr.forEach((item) => {
        if (item.value != "") {
            if (charPattern.test(item.value)) {
                let div = item.parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "only characters are allowed";
                return false;
            }
        }
    });

    let percentPtn = /^(\d{1,2}\.\d{1,2})$/;
    let percent = document.getElementsByClassName('percent');
    let perArr = Array.from(percent);
    perArr.forEach((item) => {
        if (item.value != "") {
            console.log(item.value);
            if (!percentPtn.test(item.value)) {
                let div = item.parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "please enter percent in proper format";
                return false;
            }
        }
    });

    let yearPtn = /^(\d{4})$/;
    let years = document.getElementsByClassName('year');
    let yearArr = Array.from(years);
    yearArr.forEach((item) => {
        if (item.value != "") {
            if (!yearPtn.test(item.value)) {
                let div = item.parentElement;
                div.getElementsByTagName('span')[0].innerHTML = "please enter year in this format yyyy";
                return false;
            }
        }
    });
    let ctcPtn = /^(\d{1,2}\.\d{1,2})$/;
    if (c_ctc.value != "") {
        if (!ctcPtn.test(c_ctc.value)) {

            let div = c_ctc.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "Please enter correct ctc";
            return false;
        }
    }
    if (e_ctc.value != "") {
        if (!ctcPtn.test(e_ctc.value)) {
            let div = e_ctc.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "Please enter correct ctc";
            return false;
        }
    }
    let period = /^[0-9]{2}$/;
    if (n_period.value != "") {
        if (!period.test(n_period.value)) {
            let div = n_period.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "Potice period should be greater than 10";
            return false;
        }
        if (n_period.value < 10) {
            let div = n_period.parentElement;
            div.getElementsByTagName('span')[0].innerHTML = "Potice period should be greater than 10";
            return false;
        }
    }


    let zipPtn = /[a-zA-Z]/;
    if (zipPtn.test(zipcode.value)) {
        let div = zipcode.parentElement;
        div.getElementsByTagName("span")[0].innerHTML = "characters are not allowed in zipcode";
        return false;
    }
    console.log("form is filled correctly");
    return true;
}


