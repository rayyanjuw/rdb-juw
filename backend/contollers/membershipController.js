const Membership = require("../Models/membershipModel");


const createMembership = async (req, res) => {
    try {
        const { description } = req.body;
        const { id: userId } = req.user;

        if (!Array.isArray(description)) {
            return res.status(400).json({ message: 'Description must be an array of strings.' });
        }

        const membership = await Membership.create({
            userId,
            description
        });

       
        res.status(201).json(membership);
    } catch (error) {
        res.status(500).json({ error: 'Failed top create memberships', details: error.message})
        
    }
}

const getMemberships = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming userId is obtained from the authenticated user

        const memberships = await Membership.findAll({
            where: { userId },
            attributes: ['id', 'userId', 'description', 'createdAt', 'updatedAt']
        });

        res.status(200).json(memberships);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve memberships.', error: error.message });
    }
};

const updateMembership = async (req, res) => {
    try {
        const userId = req.user.id; // Get the userId from the authenticated user
        const { description } = req.body; // Updated description

        if (!Array.isArray(description)) {
            return res.status(400).json({ message: 'Description must be an array of strings.' });
        }

        // Find the membership by userId
        const membership = await Membership.findOne({ where: { userId } });

        if (!membership) {
            return res.status(404).json({ message: 'Membership not found.' });
        }

        // Update the membership's description
        membership.description = description;
        await membership.save();

        res.status(200).json({ message: 'Membership updated successfully.', membership });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update membership.', error: error.message });
    }
};




module.exports = {
    createMembership,
    getMemberships,
    updateMembership
}