const {ReS,ReE,to}=require('../global_function');
const Timesheet =require('../models').Timesheet;
const {Op}=require('sequelize')
const moment=require('moment');
const Employee=require('../models').employee;
const insertEmployee=async function(req,res){
    let[err,emp]=await to(Employee.create({
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
        where:{
            date:{
                [Op.between]: ['2023-03-24','2023-04-24']
                   
                
            }
        }
    }));
    let date= new Date('YYYY-MM-DD'); 
    
    console.log("Date today",date);
    if(err){
        return ReE(res,err,422);
    }
    if(data){
        return ReS(res,data,200);
    }
}
module.exports.getDate=getDate;
// select * from Timesheet;

const getTimesheet=async function(req,res){
    let [err,data]=await to(Timesheet.findAll({
        attributes:['employeeId','date','status']
    }));
    if(err)ReE(res,err,422);
    if(data)ReS(res,data,200);
}
module.exports.getTimesheet=getTimesheet;


// login
const login=async function(req,res){
    let tableDetails={};
    let token;
    let err,user;
    console.log(req.body);
    
     [err,user]=await to(Employee.findOne({
        where:{
            ename:req.body.ename
        }
    }));
    if(err) return ReE(res,err,422);
    [err,token]=await to(user.getJWT());
    if(err)return ReE(res,err,422);
    if(user && token){
        tableDetails['user']=user;
        tableDetails['token']=token;
    };

    if(tableDetails) return ReS(res,tableDetails,200);
};
module.exports.login=login;