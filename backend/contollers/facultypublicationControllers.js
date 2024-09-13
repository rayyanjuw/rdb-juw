const Department = require('../Models/departmentmodel');

const PublicationsofFaculty = require('../Models/PublicationofFaculty');



const canCreatePublicationFor = (creatorRole, targetRole) => {
    return allowedRoles[creatorRole]?.includes(targetRole);
};


const createFacultyPublication = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId, impersonatorRole, impersonating } = user;
        const { targetRole, ...publicationoffacultyData } = req.body;

        const department = await Department.findOne({ where: { id: departmentId }});


        if (!department) {
            return res.status(404).json({ message: 'Department not found'});
        }

        const creatorRole = impersonating ? impersonatorRole : userRole;

        const facultypublication = await PublicationsofFaculty.create({
            ...publicationoffacultyData,
            createdBy: creatorRole,
            targetRole: userRole,
            departmentId: department.id,
            departmentName: department.name,
            userId: user.id
        });

        



        return res.status(201).json(facultypublication)
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const updatePublication = async (req, res ) => {
    try {
        const {id} = req.params;
        const { user } = req;
        const { role: userRole, departmentId, impersonatorRole, impersonating } = user;
        const { ...publicationoffacultyData } = req.body;

        const publication = await PublicationsofFaculty.findOne({ where: {id}});

        if (!publication) {
            return res.status(404).json({ message: 'Publication not found '});
        }

        const creatorRole = impersonating ? impersonatorRole : userRole;

        const department = await Department.findOne({ where: {id: departmentId}});

        if (!department) {
            return res.status(404).json({ message: 'Department not found'});
        }

        const updatedPublication = await publication.update({
            ...publicationoffacultyData,
            createdBy: creatorRole,
            targetRole: userRole,
            departmentId: department.id,
            departmentName: department.name, // Update departmentName
            userId: user.id
        });

        return res.status(200).json(updatedPublication);
    } catch (err) {
        console.error("Error in updatedPublication:", err);
        return res.status(500).json({ message: err.message});
    }
}


const DeletePublication = async (req, res) => {
    try {
        const { id } =req.params;
        const publication = await PublicationsofFaculty.findOne({ where: { id }});

        if (!publication) {
            return res.status(404).json({ message: 'Publication not found'});
        }

        await publication.destroy();

        return res.status(204).json({ message: "Publication Of faculty Deleted Successfully"});
    } catch (error) {
        return res.status(500).json({ message: err.message})
    }
}


const getAllPublications = async (req, res) => {
    try {
        const publications = await PublicationsofFaculty.findAll();
        return res.status(200).json(publications);
    } catch (err) {
        console.error('Error in getAllPublications:', err);
        return res.status(500).json({ message: err.message });
    }
};

const getPublicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await PublicationsofFaculty.findOne({ where: { id } });

        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }

        return res.status(200).json(publication);
    } catch (err) {
        console.error('Error in getPublicationById:', err);
        return res.status(500).json({ message: err.message });
    }
};


module.exports = { createFacultyPublication, updatePublication, getAllPublications, getPublicationById, DeletePublication }