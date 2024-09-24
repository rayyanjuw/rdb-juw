const ORICFundedProject = require('../Models/ORICFundedProject');
const allowedRoles = require('../config/roles');
const {Op} = require('sequelize');


const canCreatefundedFor = (creatorRole, createdBy) => {
    return allowedRoles[creatorRole]?.includes(createdBy);
};


// const createOricFunded = async (req, res) => {
//     try {
//         const { user } = req;
//         const { role: userRole, departmentId, impersonatorRole, impersonating} = user;

//         const { createdBy, ...oricfundedprojectData} = req.body;

//         const effectiveRole = impersonating ? impersonatorRole : userRole;
//         const effectiveDepartmentId = impersonating ? user.departmentId : departmentId;

//          // Role-based check
//          if (['admin', 'manager'].includes(effectiveRole)){
          
//             return res.status(200).json({ message: `ORIC Funded Project updated successfully by ${effectiveRole}`, oricFundedProject})
//         } else if (effectiveRole === 'researcher ') {
//             if (oricFundedProject.userId !== user.id) {
//                 return res.status(403).json({ error: 'Unauthorized'})
//             }
//             return res.status(200).json({ message: 'ORIC Funded Project updated successfully', oricFundedProject });
//         } else if (['dean', 'chaiperson'].includes(effectiveRole)) {
//             if(oricFundedProject.departmentId !== effectiveDepartmentId) {
//                 return res.status(403).json({ error: 'User is not allowed to update from different Department'})
//             };
          
//             return res.status(200).json({ message: `ORIC Funded Project updated successfully by ${effectiveRole}`, oricFundedProject });
//         } else {
//             // Unauthorized access for any other roles
//             return res.status(403).json({ error: 'Unauthorized' });
//         }

//         const oricFundedProject = await ORICFundedProject.create({
//             ...oricfundedprojectData,
//             userId: user.id,
//             departmentId,
//             createdBy: creatorRole,
//             status: 'Pending'
//         });

//         res.status(201).json(oricFundedProject);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create ORIC Funded Project', details: error.message})
//     }
// }

const createOricFunded = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId: userDepartmentId, impersonatorRole, impersonating } = user;

        const { createdBy, ...oricFundedProjectData } = req.body;

        // Determine the effective role and departmentId (if impersonating, use impersonator details)
        const effectiveRole = impersonating ? impersonatorRole : userRole;
        const effectiveDepartmentId = impersonating ? user.departmentId : userDepartmentId;

        // Role-based checks before creating the project
        if (effectiveRole === 'researcher') {
            // Researcher can only create for their own department
            oricFundedProjectData.departmentId = effectiveDepartmentId;
            oricFundedProjectData.userId = user.id;
        } else if (['dean', 'chairperson'].includes(effectiveRole)) {
            // Dean and Chairperson can only create projects for their own department
            oricFundedProjectData.departmentId = effectiveDepartmentId;
        } else if (['admin', 'manager'].includes(effectiveRole)) {
            // Admin and Manager can create for any department; accept departmentId from the body
            if (!req.body.departmentId) {
                return res.status(400).json({ error: 'Department ID is required for creating a project by Admin or Manager.' });
            }
            oricFundedProjectData.departmentId = req.body.departmentId;
        } else {
            // Unauthorized roles
            return res.status(403).json({ error: 'Unauthorized role' });
        }

        // Now create the ORIC Funded Project
        const oricFundedProject = await ORICFundedProject.create({
            ...oricFundedProjectData,
            userId: user.id, // The user creating the project
            createdBy: effectiveRole, // The role of the creator
            status: 'Pending' // Default status for new projects
        });

        res.status(201).json({ message: `ORIC Funded Project created successfully by ${effectiveRole}`, oricFundedProject });
    } catch (error) {
        // Handle errors properly
        res.status(500).json({ error: 'Failed to create ORIC Funded Project', details: error.message });
    }
};

const getOricFundedProjectById = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId, impersonatorRole, impersonating } = user;
        const { id } = req.params; // Extract project ID from URL params

        const oricFundedProject = await ORICFundedProject.findByPk(id);

        if (!oricFundedProject) {
            return res.status(404).json({ error: 'ORIC Funded Project not found' });
        }

        // Determine the effective role and department ID
        const effectiveRole = impersonating ? impersonatorRole : userRole;
        const effectiveDepartmentId = impersonating ? user.departmentId : departmentId;

        // Access control logic
        if (['admin', 'manager'].includes(effectiveRole)) {
            // Admins and managers can access any project
            return res.status(200).json(oricFundedProject);
        } else if (['dean', 'chairperson'].includes(effectiveRole)) {
            // Deans and Chairpersons can access projects in their own department
            if (oricFundedProject.departmentId !== effectiveDepartmentId) {
                return res.status(403).json({ error: 'Unauthorized: You can only access projects in your own department' });
            }
            return res.status(200).json(oricFundedProject);
        } else if (effectiveRole === 'researcher') {
            // Researchers can only access their own projects
            if (oricFundedProject.userId !== user.id) {
                return res.status(403).json({ error: 'Unauthorized: You can only access your own projects' });
            }
            return res.status(200).json(oricFundedProject);
        } else {
            // Other roles are unauthorized
            return res.status(403).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve ORIC Funded Project', details: error.message });
    }
};


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



// Approve or reject a project
const approveOrRejectProject = async (req, res) => {
    try {
        const { user } = req;  // Extract user from request (authenticated user)
        const { role: userRole } = user;  // Extract role from user
        const { id } = req.params;  // Project ID from URL params
        const { status } = req.body;  // New status (approved/rejected)

        if (!['admin', 'manager'].includes(userRole)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const project = await ORICFundedProject.findByPk(id);

        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Update project status
        await project.update({ status });

        res.status(200).json({ message: `Project ${status} successfully`, project });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update project status', details: error.message });
    }
};


const getAllResearchProjects = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId } = user;

        // Check if the user is an admin or manager
        if (!['admin', 'manager'].includes(userRole)) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        // Extract filters from query parameters
        const { status, departmentId: filterDepartmentId, startDate, endDate } = req.query;

        // Build the query object
        let query = {};

        if (status) {
            query.status = status;  // Filter by status (e.g., 'pending', 'approved', 'rejected')
        }
        
        if (filterDepartmentId) {
            query.departmentId = filterDepartmentId;  // Filter by department ID
        } else if (userRole === 'dean' || userRole === 'chairperson') {
            // If the user is a Dean or Chairperson, filter by their own department
            query.departmentId = departmentId;
        }

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) {
                query.createdAt[Op.gte] = new Date(startDate);  // Filter by start date
            }
            if (endDate) {
                query.createdAt[Op.lte] = new Date(endDate);  // Filter by end date
            }
        }

        // Fetch filtered research projects from the database
        const researchProjects = await ORICFundedProject.findAll({ where: query });

        res.status(200).json(researchProjects);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch research projects', details: error.message });
    }
};





module.exports = {
    createOricFunded,
    getAllOricFundedProjects, 
    updateOricFundedProject, 
    deleteOricFundedProject,
    approveOrRejectProject,
    getAllResearchProjects,
    getOricFundedProjectById
}