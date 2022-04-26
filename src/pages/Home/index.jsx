import {
  Box
} from "@chakra-ui/react";
import { List } from "../../components/List";
import { Navbar } from "../../components/Navbar";

export const Home = () => { 
  return (
    <Box bg="gray.100" h="100%" pb="2rem">
        <Navbar />
        <List/>
    </Box>
  );
}