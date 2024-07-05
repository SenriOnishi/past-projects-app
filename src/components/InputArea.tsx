import { Box, Button, Flex, Input, Stack } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  projectTitle: string;
  setProjectTitle: Dispatch<SetStateAction<string>>;
  siteUrl: string;
  setSiteUrl: Dispatch<SetStateAction<string>>;
  system: string;
  setSystem: Dispatch<SetStateAction<string>>;
  onClick: () => void;
};

export const InputArea = ({
  projectTitle,
  setProjectTitle,
  siteUrl,
  setSiteUrl,
  system,
  setSystem,
  onClick,
}: Props) => {
  return (
    <Flex>
      <Box
        w='100%'
        backgroundColor='white'
        p={{ base: 6, md: 10 }}
        borderRadius='md'
        boxShadow='lg'
      >
        <Stack spacing='4'>
          <Input
            placeholder='案件名'
            onChange={(e) => setProjectTitle(e.target.value)}
            value={projectTitle}
          />
          <Input
            placeholder='サイトURL'
            onChange={(e) => setSiteUrl(e.target.value)}
            value={siteUrl}
          />
          <Input
            placeholder='担当範囲'
            onChange={(e) => setSystem(e.target.value)}
            value={system}
          />
          <Button
            isDisabled={!projectTitle.length && true}
            onClick={onClick}
            color='#44403e'
          >
            追加
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
};
