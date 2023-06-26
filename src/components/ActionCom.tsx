import { ConnectKitButton } from 'connectkit';

import { useStatus } from '../hooks/useStatus';
import { useModal } from '../hooks/useModal';
import { OwnActionCom } from './OwnActionCom';
import styled from '@emotion/styled';
import { Button, Flex } from '@totejs/uikit';

export const ActionCom = (obj: any) => {
  const { data, address } = obj;
  const { id, groupName, ownerAddress, type } = data;

  const { status } = useStatus(groupName, ownerAddress, address);

  const modalData = useModal();
  return (
    <ButtonCon gap={6}>
      {status == 1 && (
        <Button
          size={'sm'}
          onClick={async () => {
            modalData.modalDispatch({
              type: 'OPEN_BUY',
              buyData: data,
            });
          }}
        >
          Buy
        </Button>
      )}
      {(status == 0 || status == 2) && (
        <OwnActionCom
          data={{
            id,
            groupName,
            ownerAddress,
            type,
          }}
          address={address}
        ></OwnActionCom>
      )}

      <ConnectKitButton.Custom>
        {({ isConnected, show }) => {
          return (
            status === -1 && (
              <Button
                size={'sm'}
                onClick={() => {
                  if (!isConnected) {
                    show?.();
                  }
                }}
              >
                Buy
              </Button>
            )
          );
        }}
      </ConnectKitButton.Custom>
    </ButtonCon>
  );
};
const ButtonCon = styled(Flex)``;
