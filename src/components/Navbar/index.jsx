import {
  Menu,
  Button,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { logout } from "../../api/auth";
import { ChevronDownIcon } from "@chakra-ui/icons";
export const Navbar = () => { 
  const handleLogout = async () => {
    const response = await logout();
    if(response.success)  {
        window.location.href = '/'
    }
  }
  return (
    <Box bg='purple.500' display="flex" justifyContent="flex-end">
        <Menu >
            <MenuButton h="0" py="1rem" margin="0.5rem" _hover="" _active="" bg="purple.500" color="white" as={Button} rightIcon={<ChevronDownIcon />}/>
            <MenuList>
            <MenuItem minH='48px'>
                <span>Your profile</span>
            </MenuItem>
            <MenuItem minH='40px' onClick={() => handleLogout()}>
                <span>Logout</span>
            </MenuItem>
            </MenuList>
        </Menu>
    </Box>
  );
}
