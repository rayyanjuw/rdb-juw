// config/role.js
const allowedRoles = {
    admin: ['manager', 'dean', 'chairperson', 'researcher'],
    manager: ['dean', 'chairperson', 'researcher'],
    dean: ['chairperson', 'researcher'],
    chairperson: ['researcher'],
    researcher: []
  };


  const roleHierarchy = {
    admin: ['manager', 'dean', 'chairperson', 'researcher'],
    manager: ['dean', 'chairperson', 'researcher'],
    dean: ['chairperson', 'researcher'],
    chairperson: ['researcher']
};
  
module.exports =  {allowedRoles, roleHierarchy}
  