const { findById } = require("../models/sql_function");
const { selectQuery } = require("../models/studentReportSql");

const showStudentDetail = async (req, res) => {
    var id;
    if (req.query.id == undefined) {
        id = 1;
    }
    else {
        id = req.query.id;
    }
    const startIdx = (parseInt(id) - 1) * 10;

    const query = `select a.student_name as student_name, a.student_id as student_id ,a.total_prac as total_prac, a.total_theory as total_theory, b.pre_prac as pre_prac, b.pre_theory as pre_theory, b.mains_prac as mains_prac,
      b.mains_theory as mains_theory, b.final_prac as final_prac , b.final_theory as final_theory from
       (select student_name,c.student_id as student_id ,c.total_practical as total_prac, c.total_theory as total_theory from Student inner join (select b.student_id as student_id,sum(b.prac_marks_obtained) as total_practical, sum(b.theory_marks_obtained) as total_theory from Subject_Master as a
      inner join Exam as b on a.subject_id=b.subject_id group by student_id) as c on Student.student_id=c.student_id) as a inner join
      
      (select a.student_id as student_id ,a.pre_prac as pre_prac ,a.pre_theory as pre_theory,d.mains_prac as mains_prac, d.mains_theory as mains_theory ,d.final_prac as final_prac, d.final_theory as final_theory from (select student_id,sum(prac_marks_obtained) as pre_prac , sum(theory_marks_obtained) as pre_theory from Exam group by student_id,exam_type having exam_type=1) as a inner join
       (select b.student_id as student_id ,b.mains_prac as mains_prac, b.mains_theory as mains_theory, c.final_prac as final_prac, c.final_theory as final_theory from (select student_id,sum(prac_marks_obtained) as mains_prac , sum(theory_marks_obtained) as mains_theory from Exam group by student_id,exam_type having exam_type=2) as b inner join
      (select student_id,sum(prac_marks_obtained) as final_prac , sum(theory_marks_obtained) as final_theory from Exam group by student_id,exam_type having exam_type=3) as c on b.student_id=c.student_id) as d on a.student_id=d.student_id) as b on a.student_id=b.student_id limit 10 offset ${startIdx};
      `;
    let data = await selectQuery(query);
    if (data.length > 0) {
        res.render('listing_views/index2', { data: data, id: id });
        res.end();
    }
}

const showDetail = async (req, res) => {
    const s_id = parseInt(req.query.s_id);
    var name;

    let query = `select l.id, l.subject_name,l.ptt,l.ppt, l.ppm, l.ptm,p.mtt,p.mpt, p.mpm, p.mtm,p.ftt,p.fpt, p.fpm, p.ftm from(
       select a.subject_id as sub_id, a.student_id as id ,a.theory_total_marks as ptt, a.prac_total_marks as ppt, b.subject_name, a.prac_marks_obtained as ppm , a.theory_marks_obtained as ptm from Exam as a inner join Subject_Master as b on 
       a.subject_id=b.subject_id where a.student_id=${s_id} and a.exam_type=1 ) as l inner join (
       select m.sub_id as sub_id, m.id as id , m.mtt as mtt ,m.mpt as mpt, m.mpm as mpm , m.mtm as mtm,n.ftt as ftt ,n.fpt as fpt, n.fpm as fpm, n.ftm as ftm from
       (select c.subject_id as sub_id, c.student_id as id ,c.theory_total_marks as mtt, c.prac_total_marks as mpt, d.subject_name, c.prac_marks_obtained as mpm , c.theory_marks_obtained as mtm from Exam as c inner join Subject_Master as d on 
       c.subject_id=d.subject_id where c.student_id=${s_id} and c.exam_type=2) as m inner join (
       select e.subject_id as sub_id, e.student_id as id, e.theory_total_marks as ftt, e.prac_total_marks as fpt, f.subject_name, e.prac_marks_obtained as fpm , e.theory_marks_obtained as ftm from Exam as e inner join Subject_Master as f on 
       e.subject_id=f.subject_id where e.student_id=${s_id} and e.exam_type=3) as n on m.sub_id=n.sub_id) as p on l.sub_id=p.sub_id;
       `;

    let result = await findById('Student', 'student_id', s_id);
    if (result.length > 0) {
        result.forEach((item) => {
            name = item.student_name;
        });
    }
    let data = await selectQuery(query);
    if (data.length > 0) {
        res.render('listing_views/detail', { data: data, name: name });
        res.end();
    }
}

const attendDetail = async (req, res) => {
    var id = parseInt(req.query.s_id);
    var month;

    if (req.query.month == undefined) {
        month = "December";
    }
    else {
        month = req.query.month;
    }
    let query = `select a.student_name,b.totalDays, ROUND((b.totalDays/31)*100,2) as percent from Student as a inner join 
        (select student_id, count(attendence) as totalDays from Attendece group by month,student_id,attendence having month="${month}" and attendence=1) as b on a.student_id=b.student_id where a.student_id=${id} `;

    let result = await selectQuery(query);
    if (result.length > 0) {
        let myobj = { mydata: result, month: month, id: id, msg: `displaying data of month ${month}` };
        res.render('listing_views/index', { obj: myobj });
        res.end();
        console.log(result);
    }
}

module.exports = { showStudentDetail, showDetail, attendDetail };
