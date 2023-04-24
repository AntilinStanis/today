

module.exports=(sequelize,Datatypes)=>{
    const Model=sequelize.define('Timesheet',{
       id:{
        type:Datatypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
       },
       employeeId:{
        type:Datatypes.INTEGER,
        allowNull:false
       },
       date:{
      type:Datatypes.DATEONLY,
      allowNull:false
       },
       description:{
        type:Datatypes.STRING,
        allowNull:true
       },
       status:{
        type:Datatypes.STRING,
        allowNull:true
       } 
    },
    {
        freezeTableName:true,
        timestamps:true,
        paranoid:true,
        underscored:false

    });
    // Model.associate=function(models){
    //     this.employeeId=this.belongsTo(models.employee,{foreignKey:'employeeId'});
    // }
    return Model;
};