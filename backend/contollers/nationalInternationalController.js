const multer = require('multer');
const path = require('path');
const { Op } = require("sequelize");
const { allowedRoles } = require("../config/roles");
const NationalInternationalGrant = require("../Models/nationalGrantsModels");
const dotenv = require('dotenv')
dotenv.config();
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;

// Set up multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
       filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

const canCreateGrantFor = (creatorRole, createdBy) => {
    return allowedRoles[creatorRole]?.includes(createdBy);
};

const createNationalInternationalGrant = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId, impersonatorRole, impersonating } = user;

        const { createdBy, ...grantData } = req.body;
        // if (!grantData || Object.keys(grantData).length === 0) {
        //     return res.status(400).json({ error: 'No grant data provided' });
        // }
        const creatorRole = impersonating ? impersonatorRole : userRole;

       

          // Handle file upload
          const projectDescription = req.file.filename ? req.file.path : null;

        //   console.log(req.file.path)
        // console.log({
        //     ...grantData,
        //     userId: user.id,
        //     departmentId,
        //     projectDescription,
        //     createdBy: creatorRole
        // });

        const grant = await NationalInternationalGrant.create({
            ...grantData,
            userId: user.id,
            departmentId,
            projectDescription  ,
            createdBy: creatorRole
        });

        console.log("User Role:", userRole);
        console.log("Created By:", createdBy);
        console.log("Department ID:", departmentId);


        res.status(201).json(grant);
    } catch (error) {
        console.error("Error creating grant:", error); // Log the error
        res.status(500).json({ error: 'Failed to create National/International Grant', details: error.message });
    }
};

const getAllNationalInternationalGrants = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId, impersonatorRole, impersonating } = user;

        // Determine the effective role and department ID
        const effectiveRole = impersonating ? impersonatorRole : userRole;
        const effectiveDepartmentId = impersonating ? user.departmentId : departmentId;

        let query = {};

        // Admin or Manager can see all grants, while others see their own or department's grants
        if (['admin', 'manager'].includes(effectiveRole)) {
            query = {};  // No restrictions for Admin or Manager
        } else if (['dean', 'chairperson'].includes(effectiveRole)) {
            query = { departmentId: effectiveDepartmentId }; 
            // Dean and Chairperson see grants in their department
        } else if (effectiveRole === 'researcher') {
            query = { userId: user.id };  // Researchers only see their own grants
        }

        const grants = await NationalInternationalGrant.findAll({ where: query });
        res.status(200).json(grants);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve National/International Grants', details: error.message });
    }
};

const updateNationalInternationalGrant = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId, impersonatorRole, impersonating } = user;
        const { id } = req.params;

        const grant = await NationalInternationalGrant.findByPk(id);

        if (!grant) {
            return res.status(404).json({ error: 'National/International Grant not found' });
        }

        // Determine the role to use for access control
        const effectiveRole = impersonating ? impersonatorRole : userRole;
        const effectiveDepartmentId = impersonating ? user.departmentId : departmentId;

        // Handle file upload
        const projectDescription = req.file ? req.file.path : grant.projectDescription;

        console.log('Request Body:', req.body);
console.log('Uploaded File Path:', req.file ? req.file.path : 'No file uploaded');

        if (['admin', 'manager'].includes(effectiveRole)) {
            await grant.update({ ...req.body, projectDescription });
            return res.status(200).json({ message: `National/International Grant updated successfully by ${effectiveRole}`, grant });
        } else if (effectiveRole === 'researcher') {
            if (grant.userId !== user.id) {
                return res.status(403).json({ error: 'Unauthorized' });
            }
            await grant.update({ ...req.body, projectDescription });
            return res.status(200).json({ message: 'National/International Grant updated successfully', grant });
        } else if (['dean', 'chairperson'].includes(effectiveRole)) {
            if (grant.departmentId !== effectiveDepartmentId) {
                return res.status(403).json({ error: 'Unauthorized - User is not allowed to update grants from a different department' });
            }
            await grant.update({ ...req.body, projectDescription });
            return res.status(200).json({ message: `National/International Grant updated successfully by ${effectiveRole}`, grant });
        } else {
            // Unauthorized access for any other roles
            return res.status(403).json({ error: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update National/International Grant', details: error.message });
    }
};

const deleteNationalInternationalGrant = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId } = user;
        const { id } = req.params;

        const grant = await NationalInternationalGrant.findByPk(id);

        if (!grant) {
            return res.status(404).json({ error: 'National/International Grant not found' });
        }

        // Role-based access control
        if (userRole === 'researcher' && grant.userId !== user.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        if (['dean', 'chairperson'].includes(userRole) && grant.departmentId !== departmentId) {
            return res.status(403).json({ error: 'Unauthorized - User is not allowed to delete grants from a different department' });
        }

        await grant.destroy();
        res.status(200).json({ message: 'National/International Grant deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete National/International Grant', details: error.message });
    }
};

module.exports = {
    createNationalInternationalGrant,
    getAllNationalInternationalGrants, 
    updateNationalInternationalGrant, 
    deleteNationalInternationalGrant,
    upload
};
