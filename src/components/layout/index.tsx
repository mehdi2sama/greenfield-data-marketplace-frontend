import Header from './Header';
import Footer from './Footer';
import { ReactNode, useCallback } from 'react';
import styled from '@emotion/styled';
import { Flex } from '@totejs/uikit';
import { ListModal } from '../modal/listModal';
import { ListProcess } from '../modal/listProcess';
import { ListError } from '../modal/listError';
import { useModal } from '../../hooks/useModal';
import { batchUpdate } from '../../utils';

export default function Layout({ children }: { children: ReactNode }) {
  const modalData = useModal();

  const { openList, initInfo, listData, openListProcess, openListError } =
    modalData.modalState;

  const handleListOpen = useCallback(() => {
    modalData.modalDispatch({ type: 'CLOSE_LIST' });
  }, []);

  const handleListProcessOpen = useCallback(() => {
    modalData.modalDispatch({ type: 'CLOSE_LIST_PROCESS' });
  }, []);

  const handleListErrorOpen = useCallback(() => {
    modalData.modalDispatch({ type: 'CLOSE_LIST_ERROR' });
  }, []);

  return (
    <>
      <Container flexDirection={'column'} justifyContent={'space-between'}>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </Container>
      {initInfo && (
        <ListModal
          isOpen={openList}
          handleOpen={() => {
            console.log('ssssss');
            handleListOpen();
          }}
          detail={initInfo}
        ></ListModal>
      )}

      <ListProcess
        isOpen={openListProcess}
        handleOpen={() => {
          handleListProcessOpen();
        }}
      ></ListProcess>

      <ListError
        isOpen={openListError}
        handleOpen={() => {
          handleListErrorOpen();
        }}
      ></ListError>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex: 1 1 0%;
  justify-content: center;
`;

const Container = styled(Flex)`
  background-color: #000000;
  min-height: 100vh;
`;
