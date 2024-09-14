const ORICFundedProject = require('../Models/ORICFundedProject');
const allowedRoles = require('../config/roles');
const {Op} = require('sequelize');


const canCreatefundedFor = (creatorRole, createdBy) => {
    return allowedRoles[creatorRole]?.includes(createdBy);
};


const createOricFunded = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId, impersonatorRole, impersonating} = user;

        const { createdBy, ...oricfundedprojectData} = req.body;

        const creatorRole = impersonating ? impersonatorRole : userRole;

         // Role-based check
        

        const oricFundedProject = await ORICFundedProject.create({
            ...oricfundedprojectData,
            userId: user.id,
            departmentId,
            createdBy: creatorRole
        });

        res.status(201).json(oricFundedProject);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create ORIC Funded Project', details: error.message})
    }
}


const getAllOricFundedProjects = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId, impersonatorRole, impersonating } = user;

        // Determine the effective role and department ID
        const effectiveRole = impersonating ? impersonatorRole : userRole;
        const effectiveDepartmentId = impersonating ? user.departmentId : departmentId;

        let query = {};

        // Admin or Manager can see all projects, while others see their own or department's projects
        if (['admin', 'manager'].includes(effectiveRole)) {
            query = {};  // No restrictions for Admin or Manager
        } else if (['dean', 'chairperson'].includes(effectiveRole)) {
            query = { departmentId: effectiveDepartmentId }; 
             // dean and chairperson see projects in their department
        } else if (effectiveRole === 'researcher') {
            query = { userId: user.id };  // Researchers only see their own projects
        }

        const oricFundedProjects = await ORICFundedProject.findAll({ where: query });
        res.status(200).json(oricFundedProjects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve ORIC Funded Projects', details: error.message });
    }
};

const updateOricFundedProject = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId, impersonatorRole, impersonating } = user;
        const { id } = req.params;

        const oricFundedProject = await ORICFundedProject.findByPk(id);

        if (!oricFundedProject) {
            return res.status(404).json({ error: 'ORIC Funded Project not found' });
        }

        // Determine the role to use for access control
        const effectiveRole = impersonating ? impersonatorRole : userRole;
        const effectiveDepartmentId = impersonating ? user.departmentId : departmentId;

        if (['admin', 'manager'].includes(effectiveRole)){
            await oricFundedProject.update(req.body);
            return res.status(200).json({ message: `ORIC Funded Project updated successfully by ${effectiveRole}`, oricFundedProject})
        } else if (effectiveRole === 'researcher ') {
            if (oricFundedProject.userId !== user.id) {
                return res.status(403).json({ error: 'Unauthorized'})
            }
            await oricFundedProject.update(req.body);
            return res.status(200).json({ message: 'ORIC Funded Project updated successfully', oricFundedProject });
        } else if (['dean', 'chaiperson'].includes(effectiveRole)) {
            if(oricFundedProject.departmentId !== effectiveDepartmentId) {
                return res.status(403).json({ error: 'User is not allowed to update from different Department'})
            };
            await oricFundedProject.update(req.body);
            return res.status(200).json({ message: `ORIC Funded Project updated successfully by ${effectiveRole}`, oricFundedProject });
        } else {
            // Unauthorized access for any other roles
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // // Role-based access control
        // if (userRole === 'Researcher' && oricFundedProject.userId !== user.id) {
        //     return res.status(403).json({ error: 'Unauthorized' });
        // }
        // if (['dean', 'chairperson'].includes(userRole) && oricFundedProject.departmentId !== departmentId) {
        //     return res.status(403).json({ error: 'Unauthorized' });
        // }

        // await oricFundedProject.update(req.body);
        // res.status(200).json({ message: 'ORIC Funded Project updated successfully', oricFundedProject });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update ORIC Funded Project', details: error.message });
    }
};

const deleteOricFundedProject = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId } = user;
        const { id } = req.params;

        const oricFundedProject = await ORICFundedProject.findByPk(id);

        if (!oricFundedProject) {
            return res.status(404).json({ error: 'ORIC Funded Project not found' });
        }

        // Role-based access control
        if (userRole === 'Researcher' && oricFundedProject.userId !== user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        if (['dean', 'chairperson'].includes(userRole) && oricFundedProject.departmentId !== departmentId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await oricFundedProject.destroy();
        res.status(200).json({ message: 'ORIC Funded Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete ORIC Funded Project', details: error.message });
    }
};

module.exports = {
    createOricFunded,
    getAllOricFundedProjects, 
    updateOricFundedProject, 
    deleteOricFundedProject 
}