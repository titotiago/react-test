import { Formik, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack, 
  Link
} from "@chakra-ui/react";
import { loginWithEmailAndPassword } from '../../api/auth'
import { useToast } from '@chakra-ui/react';
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username é um campo obrigatório"),
  password: Yup.string().required("Senha é um campo obrigatório"),
});

export const Login = () => { 
  const toast = useToast();
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w="25rem">
        <Formik
         initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={async (values) => {
            const response = await loginWithEmailAndPassword(values);
            if(response.success)  {
              toast({
                title: 'Login realizado com sucesso',
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
              setTimeout(() => {
                window.location.href = '/'
              }, 500);
            } else {
              toast({
                title: response.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
            }
          }}
          validationSchema={validationSchema}
        >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isInvalid={!!errors.username && touched.username}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Field
                    as={Input}
                    id="username"
                    name="username"
                    variant="filled"
                  />
                <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    variant="filled"
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button type="submit" colorScheme="purple" isFullWidth>
                  Login
                </Button>
                <Link href="/register">
                  Cadastrar novo usuário
                </Link>
              </VStack>
            </form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}