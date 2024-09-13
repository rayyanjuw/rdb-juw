const { Sequelize, Op } = require('sequelize');
const { Publication } = require('../Models/association');
const allowedRoles = require('../config/roles');
const sequelize = require('../config/mysqlConnection');
const {User} = require('../Models/association'); // Import the User model


const canCreatePublicationFor = (creatorRole, targetRole) => {
    return allowedRoles[creatorRole]?.includes(targetRole);
};



// const createPublication = async (req, res) => {
//     try {
//       const { user } = req;
//       const { id: userId, departmentId, role: userRole, impersonatorRole, impersonating } = user;
//       const {  ...publicationData } = req.body;

//        // Handle impersonation logic
//     const isImpersonating = req.headers['x-impersonating'] === 'true'; // Example header flag for impersonation
//     const creatorRole = impersonating ? impersonatorRole : userRole;


//       // if (!canCreatePublicationFor(userRole)) {
//       //   return res.status(403).json({ message: 'Access denied to create publication for this role'});
//       // }

//       // Admin can create publications for any department
//       if (userRole === 'admin' || userRole === 'manager') {
//         const publication = await Publication.create({ 
          
//           ...publicationData, 
//           targetRole: userRole, 
//           createdBy: creatorRole, 
//           userId: user.id,
//           departmentId });
//         return res.status(201).json(publication);
//     }

//     // Non-admin users can only create publications for their own department
//     // if (departmentId !== userDepartmentId) {
//     //     return res.status(403).json({ message: 'Access denied to create publication for this department' });
//     // }

//       //
//       const publication = await Publication.create({ 
//         ...publicationData,
//         targetRole: userRole,
//         createdBy: creatorRole, 
//         departmentId,
//         userId });
//       res.status(201).json(publication);
//     } catch (err) {
//       res.status
//       (500).json({ message: err.message})
//     }
// };

// Helper function to get managed user IDs

const createPublication = async (req, res) => {
  try {
    const { user } = req; // Current user (may be impersonating)
    const { role: userRole, departmentId, impersonatorRole, impersonating } = user;
    const { targetRole, ...publicationData } = req.body;

    

    // Determine the role of the user creating the publication
    const creatorRole = impersonating ? impersonatorRole : userRole;

    // Validate that the targetRole is accessible based on the creatorRole
    // if (!canCreatePublicationFor(creatorRole, targetRole)) {
    //   return res.status(403).json({ message: 'Access denied to create publication for this role' });
    // }

    // Create the publication
    const publication = await Publication.create({ 
      ...publicationData, 
      createdBy: creatorRole, // Set the creator role
      targetRole: userRole, 
      departmentId,
      userId: user.id 
    });

    console.log(creatorRole)

    return res.status(201).json(publication);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};




const getManagedUserIds = async (userId, targetRoles) => {
  const users = await User.findAll({
      where: {
          role: {
              [Op.in]: targetRoles
          },
         
      },
      attributes: ['id']  // Only select the user ID
  });
  
  return users.map(user => user.id);
};

const getAllPublications = async (req, res) => {
  try {
      const { user } = req;  // Extract user from the request
      const { role: userRole } = user;  // Extract user's role
      let publications;

      if (userRole === 'admin') {
          // Admin can see all publications
          publications = await Publication.findAll();
      } else if (userRole === 'manager') {
          // Manager can see all publications they manage (dean, chairperson, researcher)
          publications = await Publication.findAll({
              where: {
                  userId: {
                      [Op.in]: await getManagedUserIds(user.id, ['dean', 'chairperson', 'researcher'])
                  }
              }
          });
      } else if (userRole === 'dean') {
          // dean can see their own publications and those of chairperson and researcher
          publications = await Publication.findAll({
              where: {
                  userId: {
                      [Op.in]: await getManagedUserIds(user.id, ['chairperson', 'researcher'])
                  }
              }
          });
      } else if (userRole === 'chairperson') {
          // chairperson can see their own publications and those of researcher
          publications = await Publication.findAll({
              where: {
                  userId: {
                      [Op.in]: await getManagedUserIds(user.id, ['researcher'])
                  }
              }
          });
      } else if (userRole === 'researcher') {
          // Researcher can only see their own publications
          publications = await Publication.findAll({
              where: { userId: user.id }
          });
      } else {
          // In case of an undefined role, return an empty array or handle it as needed
          return res.status(403).json({ message: 'Access denied' });
      }

      return res.status(200).json(publications);
  } catch (err) {
      return res.status(500).json({ message: err.message });
  }
};



  const getPublicationById = async (req, res) => {
    try {
      const { user } = req;
      const { role: userRole, id: userId } = user;
      const publicationId = req.params.id;
  
      const publication = await Publication.findByPk(publicationId, { include: [User] });
  
      if (!publication) {
        return res.status(404).json({ message: 'Publication not found' });
      }
  
      const publicationOwner = publication.userId;
  
      if (userRole === 'admin') {
        // Admin can view any publication
        return res.json(publication);
      }
  
      // Manager, dean, chairperson, and Researcher role checks
      if (userRole === 'manager' || userRole === 'dean' || userRole === 'chairperson' || userRole === 'researcher') {
        const isAllowed = userId === publicationOwner || (await isSupervised(userId, publicationOwner, userRole));
        if (isAllowed) return res.json(publication);
      }
  
      return res.status(403).json({ message: 'Access denied to view this publication' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  
  
  const getUserPublications = async (req, res) => {
    try {
        const { user } = req;
        const { id: userId, role: userRole} = user;
        let publications;

          // Fetch publications created by the user where the targetRole matches their own role
          publications = await Publication.findAll({
            where: {
                userId: userId,
                // Assuming `targetRole` is a field in the `Publication` model
                targetRole: userRole
            }
        });


        return res.status(200).json(publications);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
 
  
  //  const updatePublication = async (req, res) => {
  //   try {
  //     const { user } = req;
  //     const { role: userRole } = user;
  //     const publicationId = req.params.id;
  
  //     const publication = await Publication.findByPk(publicationId);
  
  //     if (!publication) return res.status(404).json({ message: 'Publication not found' });
  
  //     if (userRole === 'admin' || publication.userId === user.id) {
  //       // Admin or owner of the publication can update it
  //       await publication.update(req.body);
  //       return res.json(publication);
  //     }
  
  //     return res.status(403).json({ message: 'Forbidden' });
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  //    // Fetch the publication from the database
  // };

  // const updatePublication = async (req, res) => {
  //   try {
  //     const { user } = req;
  //     const { role: userRole } = user;
  //     const publicationId = req.params.id;
  
  //     // Fetch the publication from the database
  //     const [rows] = await sequelize.query('SELECT * FROM publications WHERE id = ?', {
  //       replacements: [publicationId],
  //       type: sequelize.QueryTypes.SELECT,
  //     });
  
  //     // Log the result to verify the structure
  //     console.log('Fetched Rows:', rows);
  
  //     if (rows.length === 0) {
  //       return res.status(404).json({ message: 'Publication not found' });
  //     }
  
  //     const publication = rows[0];
      
  //     // Check the structure of the publication object
  //     console.log('Publication Object:', publication);
  
  //     // Ensure the correct column name is used
  //     const publicationUserId = publication.user_id; // Adjust if necessary
  
  //     if (userRole === 'admin' || publicationUserId === user.id) {
  //       // Update the publication with the new data
  //       const updatedData = req.body;
  
  //       // Generate the update query dynamically based on the fields being updated
  //       const fieldsToUpdate = Object.keys(updatedData)
  //         .map(key => `${key} = ?`)
  //         .join(', ');
  //       const values = [...Object.values(updatedData), publicationId];
  
  //       const updateQuery = `UPDATE publications SET ${fieldsToUpdate} WHERE id = ?`;
  
  //       await sequelize.query(updateQuery, {
  //         replacements: values,
  //         type: sequelize.QueryTypes.UPDATE,
  //       });
  
  //       // Fetch the updated publication to return in the response
  //       const [updatedRows] = await sequelize.query('SELECT * FROM publications WHERE id = ?', {
  //         replacements: [publicationId],
  //         type: sequelize.QueryTypes.SELECT,
  //       });
  
  //       return res.json(updatedRows[0]);
  //     }
  
  //     return res.status(403).json({ message: 'Forbidden' });
  //   } catch (err) {
  //     console.error('Error:', err.message); // Log the error message
  //     res.status(500).json({ message: err.message });
  //   }
  // };

  const updatePublication = async (req, res) => {
    try {
        const { user } = req;
        const { role: userRole, departmentId: userDepartmentId, impersonating, impersonatorRole } = user;
        const publicationId = req.params.id;
        const { targetRole, ...updateData } = req.body;
        
    

        if (!publicationId) {
            return res.status(400).json({ message: 'Publication ID is required' });
        }

        // Fetch the publication to be updated
        const publication = await Publication.findByPk(publicationId, {
          include: {association: 'creator'}
        });

        if (!publication) {
            return res.status(404).json({ message: 'Publication not found' });
        }

        const creatorRole = impersonating ? impersonatorRole : userRole;
  const effectiveDepartmentId = impersonating ? publication.creator.departmentId : userDepartmentId;

  const isOwner = publication.userId === user.id;
  const isAdminorManager = creatorRole !== 'admin' || creatorRole !== 'manager';
        // Check if user is authorized to update the publication
        if (!isOwner && creatorRole === isAdminorManager ) {
          if (publication.creator.departmentId !== effectiveDepartmentId) {
            return res.status(403).json({ message: 'Cannot update intellectual property from a different department' });
        }

        // if (publication.creator.departmentId !== userDepartmentId) {
        //   return res.status(403).json({ message: 'Cannot update publication from a different department' });
        // }
        if (!canCreatePublicationFor(userRole, targetRole)) {
            return res.status(403).json({ message: 'Access denied to update publication for this role' });
        }
      }

        // Perform the update operation
        await publication.update(updateData);
        res.status(200).json(publication);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
 
  // Delete a publication
   const deletePublication = async (req, res) => {
    try {
      const { user } = req;
      const { role: userRole } = user;
      const publicationId = req.params.id;
  
      const publication = await Publication.findByPk(publicationId);
  
      if (!publication) return res.status(404).json({ message: 'Publication not found' });
  
      if (userRole === 'admin' || userRole === 'manager' || publication.userId === user.id) {
        // Admin or owner of the publication can delete it
        await publication.destroy();
        return res.json({ message: 'Publication deleted' });
      }
  
      return res.status(403).json({ message: 'Forbidden' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


module.exports = { createPublication, getAllPublications, getPublicationById, getUserPublications, updatePublication, deletePublication }