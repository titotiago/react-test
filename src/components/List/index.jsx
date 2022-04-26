import {
    Box,
    Textarea,
    Text,
    Button,
    Input,
    Divider
  } from "@chakra-ui/react";
import { useState, useCallback } from "react";
import { createPost, getPosts } from '../../api/posts'
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { reorder } from "../../utils/reorder";
import { Post } from "../Post";
export const List = () => { 
    const toast = useToast();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [postList, setPostList] = useState([]);
    const fetchList = useCallback(async () => { 
        const response = await getPosts();
        if(response.success)  {
            const responseReordered = response.data.sort(reorder)
            setPostList(responseReordered);
        } else {
            toast({
                title: response.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }
    }, [toast])
    const handleSubmit = async () => {
        const response = await createPost({ title, content});
        if(response.success)  {
            toast({
                title: 'Post realizado com sucesso',
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
              fetchList();
              setContent('');
              setTitle('');
        } else {
            toast({
                title: response.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
        }
    }

    useEffect(() => {
        fetchList();
    }, [fetchList]);
    
    return (
    <Box margin="0rem 20%">
        <Box bg="gray.200" h="100%" minHeight="100vh" mt="1.5rem" borderRadius="16px" px="1rem" >
            <Text color="gray.600" fontWeight={700} fontSize="1.5rem" pl="1rem" pt="0.5rem">Criar nova postagem</Text>
            <Box padding="0.5rem 1rem 0rem 1rem">
                <Text color="gray.600" fontWeight={700} fontSize="1.2rem" pt="0.5rem">Titulo</Text>
                <Input mb="0.5rem" bg="white" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Text color="gray.600" fontWeight={700} fontSize="1.2rem">Conteúdo</Text>
                <Textarea bg="white" value={content} onChange={(e) => setContent(e.target.value)}/>
            <Box display="flex" justifyContent="flex-end">
                <Button disabled={!content || !title} colorScheme="purple" my="1rem" onClick={() => handleSubmit()}>
                    Submit
                </Button>
            </Box>
            </Box>
            <Divider h="3px" bg="#805ad5" />
            <Box pb="1rem" mt="1rem">
                {postList.map((item) =>  
                   <Post postData={item} refresh={fetchList} />
                )}
            </Box>
        </Box>
    </Box>
    );
}
  