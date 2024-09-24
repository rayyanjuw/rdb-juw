// CRUD 

const Department = require('../Models/departmentmodel');



// const createDepartment = async (req, res) => {
//     try {
       
//         const { name } = req.body;
//         const department = await Department.create({ name });
//         res.status(201).json(department);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

const createDepartment = async (req, res) => {
    try {
        const { name } = req.body;

        // Check if name is provided
        if (!name) {
            return res.status(400).json({ error: "Department name is required" });
        }

        // Create department
        const department = await Department.create({ name });
        res.status(201).json(department);

    } catch (error) {
        // Handle Sequelize validation errors
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({ error: "Department name must be unique" });
        }

        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ error: error.errors.map(e => e.message) });
        }

        // Other unexpected errors
        console.error("Error creating department: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



const getAllDepartmentNames = async (req, res) => {
    try {
        const departments = await Department.findAll({
            attributes: ['name'],
        });

        if (!departments || departments.length === 0) {
            return res.status(404).json({ message: "No departments found" });
        }

        res.status(200).json(departments);
    } catch (error) {
        console.error("Error fetching department names: ", error);
        res.status(500).json({ error: "Internal server error" });
    }
};



module.exports ={
    createDepartment,
    getAllDepartmentNames
}
