const UserProfile = require('../Models/userProfile');
const User = require('../Models/userModels');

const createOrUpdateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            name,
            email,
            password,
            address,
            cellPhone,
            highestDegree,
            yearOfDegree,
            latestInstitutionName,
            latestJobTitle,
            latestExperienceFrom,
            latestExperienceTo
          } = req.body;

            // Find the user and update their details if needed
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update user details if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password; // Ensure to hash the password before saving

        await user.save();

        const [ userProfile, created] = await UserProfile.findOrCreate({
            where: { userId},
            defaults: {
                    address,
                    cellPhone,
                    highestDegree,
                    yearOfDegree,
                    latestInstitutionName,
                    latestJobTitle,
                    latestExperienceFrom,
                    latestExperienceTo
                  }
        });

        if(!created) {
          const updateData = {
            ...(address && { address }),
            ...(cellPhone && { cellPhone }),
            ...(highestDegree && { highestDegree }),
            ...(yearOfDegree && { yearOfDegree }),
            ...(latestInstitutionName && { latestInstitutionName }),
            ...(latestJobTitle && { latestJobTitle }),
            ...(latestExperienceFrom && { latestExperienceFrom }),
            ...(latestExperienceTo && { latestExperienceTo })
        };
            await userProfile.update(updateData);
        }
        res.status(200).json({
          message: created ? 'Profile created successfully' : 'Profile updated successfully',
          user,
          userProfile
      });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create or update user profile' });
    }
}

const getProfile = async (req, res) => {
    try {
      const userId = req.user.id; // Get the current user's ID
  
      const userProfile = await UserProfile.findOne({
        where: { userId }
      });
  
      if (!userProfile) {
        return res.status(404).json({ message: 'User profile not found' });
      }
  
      res.status(200).json(userProfile);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user profile' });
    }
  };


module.exports = { createOrUpdateProfile, getProfile };