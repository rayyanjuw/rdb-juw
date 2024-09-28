const CompletedProject = require('../Models/CompleteProjectModel');

// Fetch all projects, but limit results to user's own department or role-based filtering
exports.getAllProjects = async (req, res) => {
    try {
        const { user } = req; // Get the authenticated user
        const { role: userRole, departmentId, impersonatorRole, impersonating } = user;

        let filterConditions = {
            departmentId // Default filter by department
        };

        // Admins can see all projects
        if (userRole === 'admin') {
            filterConditions = {}; // Admins have no restrictions
        } else if (impersonating) {
            // If impersonating, filter by the impersonated role's department
            filterConditions = {
                departmentId,
                createdBy: userRole, // Get projects created by or for the impersonated role
            };
        } else {
            // For non-admin, non-impersonating users, restrict by department and role
            filterConditions = {
                userId: user.id, // Own projects
                departmentId
            };
        }

        const projects = await CompletedProject.findAll({
            where: filterConditions
        });

        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch a single project by ID
exports.getProjectById = async (req, res) => {
    try {
        const { user } = req;
        const project = await CompletedProject.findOne({
            where: {
                id: req.params.id,
                userId: user.id // Ensure the project belongs to the user
            }
        });

        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new project with association to the user who created it
exports.createProject = async (req, res) => {
    try {
        const { user } = req; // Get the authenticated user
        const { departmentId, id: userId, role: userRole } = user; // Extract user details

        const newProject = await CompletedProject.create({
            ...req.body,
            userId, // Associate project with the user
            departmentId, // Associate project with user's department
            createdBy: userRole // Record the role of the creator
        });

        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing project
exports.updateProject = async (req, res) => {
    try {
        const { user } = req;
        const project = await CompletedProject.findOne({
            where: {
                id: req.params.id,
                userId: user.id // Ensure the project belongs to the user
            }
        });

        if (project) {
            await project.update(req.body);
            res.json({ message: 'Project updated successfully' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a project
exports.deleteProject = async (req, res) => {
    try {
        const { user } = req;
        const project = await CompletedProject.findOne({
            where: {
                id: req.params.id,
                userId: user.id // Ensure the project belongs to the user
            }
        });

        if (project) {
            await project.destroy();
            res.json({ message: 'Project deleted successfully' });
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
