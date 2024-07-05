import { Box, Checkbox, Divider, Flex, Link, Text } from '@chakra-ui/react';
import { pastProjectsType } from '../types/pastProjectsType';
import { v4 as uuid } from 'uuid';

type Props = {
  pastProjects: pastProjectsType[];
  onChange: (id: string) => void;
};

export const ListCard = ({ pastProjects, onChange }: Props) => {
  return (
    <>
      {pastProjects.map((project) => {
        return (
          <Box key={uuid()}>
            <Flex justifyContent='space-between' align='center'>
              <Flex w='50%' align='center' pr={4}>
                <Checkbox
                  onChange={() => onChange(project.id)}
                  size='sm'
                  color='#44403e'
                >
                  {project.projectTitle}
                </Checkbox>
              </Flex>
              <Link
                w='50%'
                href={project.siteUrl}
                isExternal
                fontSize='sm'
                color='#44403e'
              >
                {project.siteUrl}
              </Link>
            </Flex>
            <Flex justifyContent='space-between' align='center'>
              <Text fontSize={{ base: 'xs', md: 'sm' }} mt='2' color='#44403e'>
                担当範囲：{project.system}
              </Text>
            </Flex>
            <Divider my={{ base: 2, md: 3 }} />
          </Box>
        );
      })}
    </>
  );
};
