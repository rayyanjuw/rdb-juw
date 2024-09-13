const IntellectualProperty = require("../Models/IntellectualProperty");
const allowedRoles = require('../config/roles');
const {Op} = require('sequelize')


const canCreateIPFor = (creatorRole, createdBy) => {
  return allowedRoles[creatorRole]?.includes(createdBy);
};

const createIP = async (req, res) => {
  try {
    const { user } = req;
    const {
      role: userRole,
      departmentId,
      impersonatorRole,
      impersonating,
    } = user;
    const { createdBy, ...intellectualpropertyData } = req.body;
    const creatorRole = impersonating ? impersonatorRole : userRole;
    // const departmentId = req.user.departmentId;

    const newIP = await IntellectualProperty.create({
      ...intellectualpropertyData,
      // Set the creator role
      createdBy: userRole || creatorRole,
      userId: user.id,
      departmentId,
    });

    res.status(201).json(newIP);
  }  catch (error) {
    console.error('Error creating intellectual property:', error); // Log the error details
    res.status(500).json({
      error: "Failed to create intellectual property",
      details: error.message, // Include the error message in the response
    });
  }
};

const getallIp = async (req, res) => {
  try {
    const { user } = req;
    const {
        role: userRole,
        departmentId,
        impersonating,
        impersonatorRole,
      } = user;

      let filterConditions = {
        departmentId, // Default filter by department
      };

    // Admins can see all intellectual properties
    if (userRole === 'admin') {
        filterConditions = {}; // Admins have no restrictions
      } else if (impersonating) {
        // If impersonating, filter by the impersonated role's department
        filterConditions = {
          departmentId,
          createdBy: userRole, // Get IPs created by or for the impersonated role
        };
      } else {
        // For non-admin, non-impersonating users, restrict by department and role
        filterConditions = {
          [Op.or]: [
            { userId: user.id }, // Own IPs
            {
              departmentId,
              createdBy: {
                [Op.in]: allowedRoles[userRole] || [], // Roles they are allowed to view
              },
            },
          ],
        };
      }
  
      const ips = await IntellectualProperty.findAll({
        where: filterConditions,
      });
  
      res.status(200).json(ips);
    } catch (error) {
      res.status(500).json({
        error: "Failed to retrieve intellectual properties",
        details: error.message,
      });
    }
  };

const getIPById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    console.log("userid:", userId);

    const ip = await IntellectualProperty.findOne({
      where: { id, userId },
    });

    console.log("ip:", ip);

    if (!ip) {
      return res.status(404).json({ error: "Intellectual Property not Found" });
    }

    res.status(200).json(ip);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrive intellectual property" });
  }
};

// const updateIP = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       title,
//       OwnerIp,
//       address,
//       fieldofinvention,
//       backgroundofinvention,
//       descriptionofinvention,
//       refrences,
//       inventivesteps,
//     } = req.body;

//     const userId = req.user.id;

//     const ip = await IntellectualProperty.findOne({
//       where: {
//         id,
//         userId,
//       },
//     });

//     if (!ip) {
//       return res.status(404).json({ error: "Intellectual Property not Found" });
//     }

//     ip.title = title || ip.title;
//     ip.OwnerIp = OwnerIp || ip.OwnerIp;
//     ip.address = address || ip.address;
//     ip.fieldofinvention = fieldofinvention || ip.fieldofinvention;
//     ip.backgroundofinvention =
//       backgroundofinvention || ip.backgroundofinvention;
//     ip.descriptionofinvention =
//       descriptionofinvention || ip.descriptionofinvention;
//     ip.refrences = refrences || ip.refrences;
//     ip.inventivesteps = inventivesteps || ip.inventivesteps;

//     await ip.save();

//     res.status(200).json(ip);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update intellectual property" });
//   }
// };

const updateIP = async (req, res) =>{
  try {
  const { user } = req;
  const { role: userRole, departmentId: userDepartmentId, impersonatorRole, impersonating} = user;
  const  intellectualpropertyId  = req.params.id;
  const { createdBy, ...updateIPData } = req.body;

  if (!intellectualpropertyId) {
    return res.status(400).json({ message: 'Intellectual Id is required'})
  }

  const intellectualProperty = await IntellectualProperty.findByPk(intellectualpropertyId, {
    include: { association: 'creator'}
  });

  if (!intellectualProperty) {
    return res.status(404).json({ message: 'Intellectual Property not found'});
  }

  const creatorRole = impersonating ? impersonatorRole : userRole;
  const effectiveDepartmentId = impersonating ? intellectualProperty.creator.departmentId : userDepartmentId;
  
  const isOwner = intellectualProperty.userId === user.id;
  const isAdminOrManager = creatorRole !== 'admin' || creatorRole !== 'manager';

  if (!isOwner && creatorRole === isAdminOrManager) {
    if (intellectualProperty.creator.departmentId !== effectiveDepartmentId) {
      return res.status(403).json({ message: 'Cannot update intellectual property from a different department' });
    }


  if(!canCreateIPFor(creatorRole, createdBy)) {
    return res.status(403).json({ message: 'Access denied to update intellectual property for this role'});
  }
}

  await intellectualProperty.update(updateIPData);
  res.status(200).json(intellectualProperty)
} catch (err) {
  res.status(500).json({ message: err.message });
}
}





// const deleteIP = async (req, res) => {
//   try {
//     const { user } = req;
//     const { role: userRole, departmentId: userDepartmentId, impersonating, impersonatorRole} = req;

//     const intellectualpropertyId = req.params.id;

//     const intellectualProperty = await IntellectualProperty.findByPk(intellectualpropertyId, {
//       include: { association: 'creator'}
//     });

//     if (!intellectualProperty) {
//       return res.status(404).json({message: 'Intellectual Property not found'});
//     }

//     // Determine the effective role and department
//     const effectiveRole = impersonating ? impersonatorRole : userRole;
//     const effectiveDepartmentId = impersonating ? intellectualProperty.creator.departmentId : userDepartmentId;

//     const isOwner = intellectualProperty.userId === user.id;

//     // Allow the owner to delete their own IP regardless of role
//     if (!isOwner && effectiveRole !== 'admin') {
//       if (intellectualProperty.creator.departmentId !== effectiveDepartmentId) {
//         return res.status(403).json({ message: 'Cannot delete intellectual property from a different department' });
//       }

//       if (!canCreateIPFor(effectiveRole, intellectualProperty.createdBy)) {
//         return res.status(403).json({ message: 'Access denied to delete intellectual property for this role' });
//       }
//     }

//     // Delete the intellectual property
//     await intellectualProperty.destroy();

//     res.status(200).json({ message: "Intellectual property deleted successfully" });
   
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete intellectual property", error: error.message  });
//   }
// };

const deleteIP = async (req, res) => {
  try {
    const { user } = req;
    const { role: userRole, departmentId: userDepartmentId, impersonatorRole, impersonating } = user;

    const intellectualPropertyId = req.params.id; // Get the intellectual property ID from the request parameters

    // Fetch the intellectual property by its ID, including its creator details
    const intellectualProperty = await IntellectualProperty.findByPk(intellectualPropertyId, {
      include: { association: 'creator' } // Make sure the 'creator' association is defined in your model associations
    });

    if (!intellectualProperty) {
      return res.status(404).json({ message: "Intellectual property not found" });
    }

    // Determine the effective role and department
    const effectiveRole = impersonating ? impersonatorRole : userRole;
    const effectiveDepartmentId = impersonating ? intellectualProperty.creator.departmentId : userDepartmentId;

    const isOwner = intellectualProperty.userId === user.id;

    // Allow the owner to delete their own IP regardless of role
    if (!isOwner && effectiveRole !== 'admin' || !isOwner && effectiveRole !== 'manager') {
      if (intellectualProperty.creator.departmentId !== effectiveDepartmentId) {
        return res.status(403).json({ message: 'Cannot delete intellectual property from a different department' });
      }

      if (!canCreateIPFor(effectiveRole, intellectualProperty.createdBy)) {
        return res.status(403).json({ message: 'Access denied to delete intellectual property for this role' });
      }
    }

    // Delete the intellectual property
    await intellectualProperty.destroy();

    res.status(200).json({ message: "Intellectual property deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete intellectual property", error: error.message });
  }
};


module.exports = { createIP, getallIp, getIPById, updateIP, deleteIP };
