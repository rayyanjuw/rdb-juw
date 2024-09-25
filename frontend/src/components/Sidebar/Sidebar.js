// protected route
import React, { useState, useRef, useEffect } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton, Divider, Box, useMediaQuery } from '@mui/material';
import { ExpandLess, ExpandMore, Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { GiGreekTemple } from "react-icons/gi";
import { TiDocumentText } from "react-icons/ti";
import { IoBriefcaseOutline, IoCloudDownloadOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { BsLayoutTextSidebar } from "react-icons/bs";
import logo1 from '../../assets/logo1.png';
import './sidebar.css';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({});
  const drawerRef = useRef(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubMenuClick = (name) => {
    setOpenSubMenu((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const sideBarData = [
    {
      icon: <GiGreekTemple />,
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: <TiDocumentText />,
      name: 'Submission',
      options: [
        {
          subitem: 'Intellectual Property',
          suboptions: [
            { subsubitem: 'View', subsubpath: '/viewintellectualproperty' },
            { subsubitem: 'Add New', subsubpath: '/addintellectualproperty' },
          ],
        },
        {
          subitem: 'Project Submission',
          suboptions: [
            {
              subsubitem: 'ORIC Funded Project',
              subsuboptions: [
                { subsubsubitem: 'View', subsubsubpath: '/view-oric-funded-projects' },
                { subsubsubitem: 'Add New', subsubsubpath: '/add-oric' },
              ],
            },
            {
              subsubitem: 'International/National Grants',
              subsuboptions: [
                { subsubsubitem: 'View', subsubsubpath: '/view-international/national-grants' },
                { subsubsubitem: 'Add New', subsubsubpath: '/add-international/national-grants' },
              ],
            },
          ],
        },
      ],
    },
    {
      icon: <IoBriefcaseOutline />,
      name: 'Research Portfolio',
      options: [
        { subitem: 'Personal Information', subpath: '/researchportfolio' },
        { subitem: 'Honor And Awards, Scholarship', subpath: '/honorandawards' },
        { subitem: 'Membership', subpath: '/membership' },
        { subitem: 'View All Publications', subpath: '/viewallpublications' },
        { subitem: 'Add New Publications', subpath: '/researchpublication' },
        { subitem: 'Research Grants And Contracts', subpath: '/research-grants-and-contracts' },
      ],
    },

    ...(userRole !== 'researcher' ? [{
      icon: <FaRegBookmark />,
      name: 'Department Research Data',
      path: '/departmental-research-data-publications-of-faculty',
  }] : []),
    {
      icon: <IoCloudDownloadOutline />,
      name: 'Downloadable',
      path: '/downloadable',
    },

    ...(userRole !== 'researcher'  ? [{
      icon: <BsLayoutTextSidebar />,
      name: 'Users & Roles',
      options: [
        { subitem: 'View All Users', subpath: '/usermanagement' },
        { subitem: 'Add New User', subpath: '/usermanagement' },
      ],
    }] : []),
  ];

  return (
    <>
      <IconButton
        onClick={toggleSidebar}
        sx={{ position: 'fixed', top: 10, left: 10, zIndex: 2, display: { lg: 'none' } }}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>

      <Drawer
        ref={drawerRef}
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={isOpen || !isMobile}
        onClose={() => isMobile && setIsOpen(false)}
        sx={{
          width: isOpen || !isMobile ? 250 : 0,
          transition: 'width 0.3s',
          height: '100vh',
          [`& .MuiDrawer-paper`]: {
            width: isOpen || !isMobile ? 250 : 0,
            height: '100vh',
            boxSizing: 'border-box',
          },
        }}
        PaperProps={{ elevation: 4 }}
      >
        <Box sx={{ backgroundColor: '#0037a5', height: '100%', padding: '10px', overflowY: 'auto' }}>
          <div className="sidebar-logo">
            <img src={logo1} alt="Logo" style={{ width: '80%', margin: 'auto' }} />
          </div>

          <Divider sx={{ my: 1 }} />
          <List>
            {sideBarData.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  button
                  component={Link}
                  to={item.path || '#'}
                  onClick={() => {
                    console.log(`Navigating to ${item.path}`);
                    item.options && handleSubMenuClick(item.name);
                  }}
                  sx={{ color: 'white', backgroundColor: '#0037a5' }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: '0.675rem', marginLeft: '-15px' }} />
                  {item.options ? openSubMenu[item.name] ? <ExpandLess /> : <ExpandMore /> : null}
                </ListItem>
                {item.options && (
                  <Collapse in={openSubMenu[item.name]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.options.map((subItem, subIndex) => (
                        <React.Fragment key={subIndex}>
                          <ListItem
                            button
                            component={Link}
                            to={subItem.subpath || '#'}
                            onClick={() => subItem.suboptions && handleSubMenuClick(`${item.name}-${subItem.subitem}`)}
                            sx={{ pl: 4, color: 'white', backgroundColor: '#0037a5' }}
                          >
                            <ListItemText primary={subItem.subitem} primaryTypographyProps={{ fontSize: '0.675rem', marginLeft: '35px' }} />
                            {subItem.suboptions ? openSubMenu[`${item.name}-${subItem.subitem}`] ? <ExpandLess /> : <ExpandMore /> : null}
                          </ListItem>
                          {subItem.suboptions && (
                            <Collapse in={openSubMenu[`${item.name}-${subItem.subitem}`]} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding>
                                {subItem.suboptions.map((subSubItem, subSubIndex) => (
                                  <React.Fragment key={subSubIndex}>
                                    <ListItem
                                      button
                                      component={Link}
                                      to={subSubItem.subsubpath || '#'}
                                      onClick={() => subSubItem.subsuboptions && handleSubMenuClick(`${item.name}-${subItem.subitem}-${subSubItem.subsubitem}`)}
                                      sx={{ pl: 6, color: 'white', backgroundColor: '#0037a5' }}
                                    >
                                      <ListItemText primary={subSubItem.subsubitem} primaryTypographyProps={{ fontSize: '0.675rem', marginLeft: '35px' }} />
                                      {subSubItem.subsuboptions ? openSubMenu[`${item.name}-${subItem.subitem}-${subSubItem.subsubitem}`] ? <ExpandLess /> : <ExpandMore /> : null}
                                    </ListItem>
                                    {subSubItem.subsuboptions && (
                                      <Collapse in={openSubMenu[`${item.name}-${subItem.subitem}-${subSubItem.subsubitem}`]} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                          {subSubItem.subsuboptions.map((subSubSubItem, subSubSubIndex) => (
                                            <ListItem
                                              button
                                              component={Link}
                                              to={subSubSubItem.subsubsubpath || '#'}
                                              key={subSubSubIndex}
                                              sx={{ pl: 8, color: 'white', backgroundColor: '#0037a5' }}
                                            >
                                              <ListItemText primary={subSubSubItem.subsubsubitem} primaryTypographyProps={{ fontSize: '0.675rem' }} />
                                            </ListItem>
                                          ))}
                                        </List>
                                      </Collapse>
                                    )}
                                  </React.Fragment>
                                ))}
                              </List>
                            </Collapse>
                          )}
                        </React.Fragment>
                      ))}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;

