import {
  Box, Flex, HStack, Button, Text, Avatar, Menu, MenuButton, MenuList,
  MenuItem, MenuDivider, IconButton, useDisclosure, Drawer, DrawerOverlay,
  DrawerContent, DrawerCloseButton, DrawerBody, VStack, Badge,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHospital } from "react-icons/fa";
import { logout } from "../features/auth/authSlice";
import { getAvatarUrl } from "../utils/helpers";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Doctors", path: "/doctors" },
  { label: "Appointments", path: "/appointments", protected: true },
  { label: "Dashboard", path: "/dashboard", protected: true },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isAuthenticated } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const visibleLinks = NAV_LINKS.filter((l) => !l.protected || isAuthenticated);

  return (
    <Box bg="white" boxShadow="sm" position="sticky" top={0} zIndex={100}>
      <Flex maxW="1200px" mx="auto" px={4} py={3} align="center" justify="space-between">
        <Link to="/">
          <HStack spacing={2}>
            <Box color="blue.500" fontSize="24px"><FaHospital /></Box>
            <Text fontSize="xl" fontWeight="bold" color="blue.600">TeleMed</Text>
          </HStack>
        </Link>

        {/* Desktop nav */}
        <HStack spacing={6} display={{ base: "none", md: "flex" }}>
          {visibleLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Text
                fontWeight={location.pathname === link.path ? "700" : "500"}
                color={location.pathname === link.path ? "blue.600" : "gray.600"}
                _hover={{ color: "blue.500" }}
              >
                {link.label}
              </Text>
            </Link>
          ))}
        </HStack>

        <HStack spacing={3} display={{ base: "none", md: "flex" }}>
          {isAuthenticated ? (
            <Menu>
              <MenuButton>
                <HStack>
                  <Avatar
                    size="sm"
                    name={`${user?.firstName} ${user?.lastName}`}
                    src={user?.profileImage || getAvatarUrl(`${user?.firstName} ${user?.lastName}`)}
                  />
                  <Box>
                    <Text fontSize="sm" fontWeight="600">{user?.firstName}</Text>
                    <Badge colorScheme="blue" fontSize="xs">{user?.role}</Badge>
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem as={Link} to="/profile">My Profile</MenuItem>
                <MenuItem as={Link} to="/dashboard">Dashboard</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout} color="red.500">Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button variant="ghost" as={Link} to="/login">Login</Button>
              <Button as={Link} to="/register">Get Started</Button>
            </>
          )}
        </HStack>

        {/* Mobile hamburger */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          icon={<HamburgerIcon />}
          variant="ghost"
          onClick={onOpen}
        />
      </Flex>

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody pt={12}>
            <VStack spacing={4} align="start">
              {visibleLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={onClose}>
                  <Text fontSize="lg" fontWeight="500">{link.label}</Text>
                </Link>
              ))}
              {isAuthenticated ? (
                <Button onClick={() => { handleLogout(); onClose(); }} colorScheme="red" variant="ghost" w="full">
                  Logout
                </Button>
              ) : (
                <>
                  <Button as={Link} to="/login" onClick={onClose} variant="ghost" w="full">Login</Button>
                  <Button as={Link} to="/register" onClick={onClose} w="full">Get Started</Button>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
