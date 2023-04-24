const {ReS,ReE,to}=require('../global_function');
const Timesheet =require('../models').Timesheet;
const {Op}=require('sequelize')
const insertEmployee=async function(req,res){
    let[err,emp]=await to(employee.create({
        ename:req.body.ename,
        password:req.body.password
    }));
    if(err)return ReE(res,err,422);
    if(emp)return ReS(res,emp,200);

};
module.exports.insertEmployee=insertEmployee;

const insertTimesheet= async function (req,res){
    let [err,data]=await to(Timesheet.create({
        employeeId:req.body.employeeId,
        date:req.body.date,
        description:req.body.description,
        status:req.body.status
    }));
    if(err)return ReE(res,err,422);
    if(data)return ReS(res,data,200);
}
module.exports.insertTimesheet=insertTimesheet;

//  question 1
const getStatus= async function(req,res){
    let [err,data]=await to(Timesheet.findAll({
        where:{
           
            [Op.or]: [
                { status:req.body.statusArray[0] },
                { status:req.body.statusArray[1] }
              ]
           
        }
    }));
    console.log("The answer is",req.body.statusArray[1]);
    if(err)ReE(res,err,422);
    if(data)ReS(res,data,200);

}
module.exports.getStatus=getStatus;

// question 2
const getDate=async function(req,res){
    let [err,data]=await to(Timesheet.findAll({
        
    }))
}
