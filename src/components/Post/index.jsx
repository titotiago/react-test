import {
    Box,
    Text,
    Image,
    Input,
    CloseButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    ModalCloseButton,
    Textarea,
  } from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
import { ChatIcon, CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { returnCat } from "../../utils/returnCat";
import { isAuthor } from '../../utils/isAuthor';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { createComment } from "../../api/comments";
import { useDisclosure } from "@chakra-ui/react";
import { deletePost, editPost } from "../../api/posts";
import { Comment } from "../Comment";

export const Post = ({postData, refresh}) => { 
  const toast = useToast();
  const {title, content, user_id, id, comments} = postData;
  const [commentInput, setCommentInput] = useState('');
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [editMode, setEditMode] = useState(false);
  const catPic = returnCat(user_id);
  const { isOpen, onOpen, onClose } = useDisclosure()


  const handleSubmit = async () => {
    const response = await createComment({ post_id: id, comment: { content: commentInput }});
    if(response.success)  {
        toast({
            title: 'Comentário enviado com sucesso',
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          setCommentInput('');
          console.log(response);
          refresh();
        } else {
          toast({
            title: response.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
    }
      
  const handleDelete = async () => {
    const response = await deletePost({ post_id: id });
    if(response.success)  {
      toast({
          title: 'Postagem excluída com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        refresh();
  } else {
      toast({
          title: response.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    onClose();
}

const handleEdit = async () => {
  if(editMode) {
    const response = await editPost({post_id: id, post: {title: editTitle, content: editContent}});
    if(response.success)  {
      toast({
          title: 'Postagem editada com sucesso',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        refresh();
      } else {
        toast({
          title: response.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    setEditMode(false);
  } else {
    setEditContent(content);
    setEditTitle(title);
    setEditMode(true);
  }
}
return (
    <>
     <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deseja excluir esta postagem?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Todos os comentários relacionados serão excluidos.
          </ModalBody>

          <ModalFooter justifyContent="space-around">
            <Button colorScheme='purple' mr={0} onClick={() => handleDelete()}>
              Excluir
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box bg="purple.400" mt="0.5rem" padding="1rem" pt={isAuthor(user_id) ? '0': '1rem'} borderRadius="5px" >
        {editMode && (<Text ml="5.1rem" pt="1rem" fontSize="1.2rem" fontWeight="700" color="white">Editar Postagem</Text>)} 
        <Box display="flex" justifyContent="flex-end">
          {isAuthor(user_id) && !editMode && (
            <Box display="flex">
              <IconButton bg="purple.400" 
                onClick={() => handleEdit()}
                colorScheme="purple" 
                fontSize="1rem"
                icon={<EditIcon />} />
              <CloseButton color="white" colorScheme="purple" size="sm" mt="0.5rem" onClick={() => onOpen()}/>
            </Box>
          )}
        </Box>
        <Box display="flex" mb="1rem">
        <Image
            mr="1rem"
            mt="0.5rem"
            border="3px solid #553c9a"
            ml="0.5rem"
            borderRadius='full'
            boxSize='60px'
            src={catPic}
            alt='cat'
          />
          <Box pt="0.5rem" w="100%">
            {editMode?
            <>
              <Input mb="0.5rem" bg="white" mr="1rem" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
              <Textarea  mb="0.5rem" bg="white" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
            </>
            :
            <>
              <Text fontSize="1.2rem" color="white" fontWeight="800">{title}</Text>
              <Text color="white" wordBreak="break-all" >{content}</Text>
            </>
            }
            {editMode &&
            <Box display="flex">
            <IconButton
                bg="purple.400" 
                onClick={() => handleEdit()}
                colorScheme="purple" 
                fontSize="1rem"
                h="30px"
                icon={<CheckIcon />} 
              />
              <IconButton
                bg="purple.400" 
                onClick={() => setEditMode(false)}
                colorScheme="purple" 
                fontSize="1rem"
                h="30px"
                icon={<CloseIcon />} 
              />
            </Box>
            }
          </Box>
        </Box>
        {!editMode && <>
        {comments?.map((comment) => 
          <Comment comment={comment} refresh={refresh} postId={id} catPic={catPic} />
        )}
       <Box ml="5rem" mt="1rem" display="flex" justifyContent="flex-end">
          <Input mb="0.5rem" bg="white" mr="1rem" value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
          <IconButton onClick={() => handleSubmit()} disabled={!commentInput} colorScheme="purple" fontSize="1rem" aria-label='Search database' icon={<ChatIcon />} />
        </Box>
        </>}
      </Box>
      </>
  );
}
  