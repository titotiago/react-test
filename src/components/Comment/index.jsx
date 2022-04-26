import {
    Box,
    Text,
    Image,
    IconButton,
    Input,
  } from "@chakra-ui/react";
import { isAuthor } from "../../utils/isAuthor";
import { useToast } from '@chakra-ui/react';
import { deleteComment, editComment } from "../../api/comments";
import { EditIcon, CheckIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";

  export const Comment = ({catPic, comment, refresh, postId}) => { 
    const toast = useToast();
    const [editMode, setEditMode] = useState(false);
    const [commentInput, setCommentInput] = useState(comment.content);
    const handleDelete = async () => {
        const response = await deleteComment({ post_id: postId, comment_id: comment.id });
        if(response.success)  {
        toast({
            title: 'Comentário excluído',
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
    }

    const handleEdit = async () => {
      if(editMode){
        const response = await editComment({ post_id: postId, comment_id: comment.id, comment: { content: commentInput} });
        if(response.success)  {
        toast({
            title: 'Comentário atualizado com sucesso',
            status: 'success',
            duration: 3000,
            isClosable: true,
            })
            setEditMode(false);
            refresh();
        } else {
            toast({
                title: response.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                })
        }
      } else {
        setCommentInput(comment.content);
        setEditMode(true);
      }
    }
    
    return (
        <Box pt="0.5rem" display="flex" w="100%" mb="0.5rem">
            <Image
              ml="5rem"
              mr="0.5rem"
              border="2px solid #553c9a"
              borderRadius='full'
              boxSize='40px'
              src={catPic}
              alt='cat'
              />
              <Box display="flex" bg="purple.700" w="100%"   borderRadius="4px" justifyContent="space-between">
                {editMode ?
                  <Input bg="white" mr="0.5rem" value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
                :
                  <Text padding="0.5rem 1rem" color="white" >{comment.content}</Text>
                }
                {!editMode && isAuthor(comment.user_id) && (
                  <Box display="flex">
                    <IconButton
                      onClick={() => handleEdit()}
                      colorScheme="purple" 
                      bg="purple.700"
                      fontSize="1rem"
                      icon={<EditIcon />} />
                      <IconButton
                        bg="purple.700" 
                      colorScheme="purple" 
                        fontSize="1rem"
                        icon={<DeleteIcon />} 
                        onClick={() => handleDelete()}
                      />
                  </Box>
                )}
                {editMode && (
                  <Box display="flex">
                  <IconButton
                      bg="purple.700" 
                      colorScheme="purple" 
                      fontSize="0.8rem"
                      icon={<CheckIcon />}
                      onClick={() => handleEdit()} 
                    />
                    <IconButton
                      bg="purple.700" 
                     colorScheme="purple" 
                      fontSize="0.7rem"
                      icon={<CloseIcon />} 
                      onClick={() => setEditMode(false)}
                    />
                  </Box>
                )}
              </Box>
          </Box>
    );
  }
  