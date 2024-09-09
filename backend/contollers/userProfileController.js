const UserProfile = require('../Models/userProfile');
const User = require('../Models/userModels');

const createOrUpdateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            address,
            cellPhone,
            highestDegree,
            yearOfDegree,
            latestInstitutionName,
            latestJobTitle,
            latestExperienceFrom,
            latestExperienceTo
          } = req.body;

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
            await userProfile.update({
                address,
                cellPhone,
                highestDegree,
                yearOfDegree,
                latestInstitutionName,
                latestJobTitle,
                latestExperienceFrom,
                latestExperienceTo
              });
        }
        res.status(200).json(userProfile);
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