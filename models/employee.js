const crypto=require('crypto');
const bcrypt=require('bcrypt');
const {ReE,ReS,to}=require('../global_function');
const jwt=require('jsonwebtoken');
const cryptoService=require('../services/crypto.service.js');
module.exports=(sequelize,Datatypes)=>{
    const Model=sequelize.define('employee',{
       id:{
        type:Datatypes.INTEGER,
        allowNull:false,
        primaryKey:true,    
        autoIncrement:true
       },
        ename:{
            type:Datatypes.STRING,
            allowNull:false
        },
        password:{
            type:Datatypes.STRING,
            allowNull:false
        }

    },
    {
        freezeTableName:true,
        timestamps:true,
        paranoid:true,
        underscored:false

    });
    Model.associate=function(models){
        this.Timesheet=this.hasOne(models.Timesheet,{foreignKey:'employeeId'});
    }
 
    Model.beforeSave(async(user,option)=>{
        let err;
        if(user.changed('password')){
            let salt,hash;
            let rounds=crypto.randomInt(4,10);
            [err,salt]=await to(bcrypt.genSalt(rounds));
            if(err){
                console.log('error in encryption in user'+err.message);
            }
            [err,hash]=await to(bcrypt.hash(user.password,salt));
            if(err){
                console.log('error in hash method in encryption'+err.message);
            }
            user.password=hash;
        }
    });

    Model.prototype.getJWT=async function(){
        const token="Bearer "+jwt.sign({
            id:this.id,
            ename:this.ename
        },CONFIG.jwt_encryption,{expiresIn:CONFIG.jwt_expiration});
        let [err,encryptedToken]=await to(cryptoService.encrypt(token));
        if(err) TE(err.message);
        console.log(encryptedToken);
        return encryptedToken;
    }
    return Model;
};
