import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react';
import { ListCard } from './ListCard';
import { pastProjectsType } from '../types/pastProjectsType';

type Props = {
  pastProjects: pastProjectsType[];
  onChange: (index: string) => void;
  onClick: () => void;
};

export const ListArea = ({ pastProjects, onChange, onClick }: Props) => {
  return (
    <Box
      backgroundColor='white'
      p={{ base: 4, md: 10 }}
      borderRadius='md'
      mt='10'
      fontSize={{ base: 'xs', md: 'md' }}
      boxShadow='lg'
    >
      <Flex justifyContent='flex-end' mb='5'>
        <Button
          h='30'
          fontSize='sm'
          isDisabled={!pastProjects.length && true}
          onClick={onClick}
          color='#44403e'
        >
          削除
        </Button>
      </Flex>
      <Flex justifyContent='space-between' fontWeight='bold'>
        <Text w='50%' color='#44403e'>
          案件名
        </Text>
        <Text w='50%' color='#44403e'>
          サイトURL
        </Text>
      </Flex>
      <Divider my={{ base: 2, md: 3 }} />
      <ListCard pastProjects={pastProjects} onChange={onChange} />
    </Box>
  );
};
