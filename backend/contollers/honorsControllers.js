const Honor = require('../Models/honorsAwardsModels');


const createHonors = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId } = user
        const { academicAwards, professionalAwards  } = req.body;

        if ( !departmentId) {
            return res.status(400).json({ message: 'Id are required'});
        }

        let honor = await Honor.findOne({ where: { departmentId }});

        if (honor) {
            honor.academicAwards = academicAwards || honor.academicAwards;
            honor.professionalAwards = professionalAwards || honor.professionalAwards;
            await honor.save();
        } else {
            honor = await Honor.create({
                userRole,
                userId: user.id,
                departmentId,
                academicAwards,
                professionalAwards
            });
        }

       
        res.status(201).json(honor);
    } catch(error) {
        res.status(500).json({ error: 'Failed to create honors', details: error.message });
    }
}

const getHonors = async (req, res) => {
    try {
        const { id: userId, departmentId } = req.user;

        const honors = await Honor.findOne({ where: { userId, departmentId } });

        if (!honors) {
            return res.status(404).json({ message: 'Honors not found' });
        }

        res.status(200).json(honors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve honors', details: error.message });
    }
};

const updateHonors = async (req, res) => {
    try {
        const { id: userId, departmentId } = req.user;
        const { academicAwards, professionalAwards } = req.body;

        const honors = await Honor.findOne({ where: { userId, departmentId } });

        if (!honors) {
            return res.status(404).json({ message: 'Honors not found' });
        }

        // Update the honors fields
        honors.academicAwards = academicAwards || honors.academicAwards;
        honors.professionalAwards = professionalAwards || honors.professionalAwards;
        
        await honors.save();

        res.status(200).json(honors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update honors', details: error.message });
    }
};



const deleteHonors = async (req, res) => {
    try {
        const { id: userId, departmentId } = req.user;

        const honors = await Honor.findOne({ where: { userId, departmentId } });

        if (!honors) {
            return res.status(404).json({ message: 'Honors not found' });
        }

        await honors.destroy();

        res.status(200).json({ message: 'Honors deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete honors', details: error.message });
    }
};



module.exports = {createHonors, getHonors, deleteHonors, updateHonors}