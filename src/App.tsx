import {
  Button,
  Center,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import theme from './theme/theme';
import { useEffect, useState } from 'react';
import { InputArea } from './components/InputArea';
import { ListArea } from './components/ListArea';
import { pastProjectsType } from './types/pastProjectsType';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from './firebase';

function App() {
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [siteUrl, setSiteUrl] = useState<string>('');
  const [system, setSystem] = useState<string>('');
  const [pastProjects, setPastProjects] = useState<pastProjectsType[]>([]);
  const [password, setPassword] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  //関数としてまとめて使い回している
  const clickCheck = () => {
    const check = async () => {
      const q2 = query(collection(db, 'projects'), where('check', '==', true));
      const querySnapshot2 = await getDocs(q2);

      const deletePromises2 = querySnapshot2.docs.map(async (document2) => {
        const docRef2 = doc(db, 'projects', document2.id);
        const docSnap2 = await getDoc(docRef2);
        const data2 = docSnap2.data();
        let flag = data2!.check;
        flag = !flag;
        const washingtonRef2 = doc(db, 'projects', document2.id);
        await updateDoc(washingtonRef2, {
          check: flag,
        });
      });
      //上の処理を待つため
      await Promise.all(deletePromises2);
    };
    check();
  };

  const onClickClose = () => {
    clickCheck();
  };

  const onClickPass = async () => {
    const q = query(collection(db, 'projects'), where('check', '==', true));
    const querySnapshot = await getDocs(q);

    if (password === '') {
      alert('パスワードを入力してください');
    } else {
      //パスワード判定　pass:Onishi1991
      if (password === 'Onishi1991') {
        const deletePromises = querySnapshot.docs.map(async (document) => {
          const docRef = doc(db, 'projects', document.id);
          await deleteDoc(docRef);
        });
        //上の処理を待つため
        await Promise.all(deletePromises);

        //削除後、リストを再セット
        const getProjects = async () => {
          const data = await getDocs(collection(db, 'projects'));
          setPastProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as pastProjectsType)).sort((a, b) => b.created_at - a.created_at));
        };
        getProjects();
      } else {
        alert('パスワードが違います！');

        clickCheck();
        setPassword('');
      }
      onClose();
    }
  };

  const onClickDelete = async () => {
    //checkのtrueを絞って削除できる
    const q = query(collection(db, 'projects'), where('check', '==', true));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length) {
      //選択している場合
      onOpen();
    } else {
      //選択していない場合
      alert('削除したい案件を選択してください');
    }
  };

  //最初に実績リストを読み込み
  useEffect(() => {
    const getProjects = async () => {
      const data = await getDocs(collection(db, 'projects'));
      setPastProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as pastProjectsType)).sort((a, b) => b.created_at - a.created_at));
    };
    getProjects();
    clickCheck();
  }, []);

  const onClickAdd = async () => {
    // firebaseに投稿
    await addDoc(collection(db, 'projects'), {
      projectTitle: projectTitle,
      siteUrl: siteUrl,
      system: system,
      check: false,
      created_at: new Date().getTime(),
    });
    setProjectTitle('');
    setSiteUrl('');
    setSystem('');

    // firebaseから取得してリストを表示
    const getProjects = async () => {
      const data = await getDocs(collection(db, 'projects'));
      setPastProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as pastProjectsType)).sort((a, b) => b.created_at - a.created_at));
    };
    getProjects();
  };

  const changeCheck = async (id: string) => {
    // チェックした要素を取得
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    // フラグを反転
    let flag = data!.check;
    flag = !flag;
    //checkプロパティを更新
    const washingtonRef = doc(db, 'projects', id);
    await updateDoc(washingtonRef, {
      check: flag,
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Container maxW='2xl' pt={{ base: 20, md: 40 }} pb={{ base: 20, md: 40 }}>
        <Heading as='h1' size='xl' textAlign='center' color='#44403e' mb='10'>
          Web制作実績リスト
        </Heading>
        <Text color='#44403e' fontWeight='bold' mb='1'>
          このアプリ（Web制作実績リスト）を制作した際の技術スタック
        </Text>
        <Text color='#44403e' mb='2'>
          React + TypeScript
          <br />
          開発環境:Vite
          <br />
          UIライブラリ:Chakra UI
          <br />
          データベース:Firebase
        </Text>
        <Text color='#44403e' mb='6'>
          前職のWeb制作会社で携わった案件をいくつかピックアップして、ポートフォリオに掲載しています。現在は独学でReactを勉強中のため、実際のアウトプットとして自身のポートフォリオを作成しました。
        </Text>
        <InputArea projectTitle={projectTitle} setProjectTitle={setProjectTitle} siteUrl={siteUrl} setSiteUrl={setSiteUrl} system={system} setSystem={setSystem} onClick={onClickAdd} />
        <ListArea pastProjects={pastProjects} onChange={changeCheck} onClick={onClickDelete} />
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent pb='5' mx={4}>
            <ModalHeader>パスワード入力画面</ModalHeader>
            <ModalCloseButton onClick={onClickClose} />
            <ModalBody>
              <Stack>
                <Text>パスワード</Text>
                <Input type='password' placeholder='パスワードを入力' onChange={(e) => setPassword(e.target.value)} value={password} />
              </Stack>
              <Flex justifyContent='flex-end' mt='5'>
                <Button h='30' fontSize='sm' color='#44403e' onClick={onClickPass}>
                  削除
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Container>
    </ChakraProvider>
  );
}

export default App;
