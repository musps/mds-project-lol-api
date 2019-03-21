import React from 'react'
import { Modal, Button } from 'semantic-ui-react'

import SearchHistoryComponent from '@components/SearchHistory'

import store from '@store/rootStore'
import { historyRemoveName } from '@store/history/actions'

const onClickHistoryRemoveName = nextName => store.dispatch(historyRemoveName(nextName))

export const HistoryModal = ({ modalState, onClickClose, children }) => (
  <Modal
    onClose={onClickClose}
    open={modalState}
    size='small'
  >
    <Modal.Header>
      Recent search
    </Modal.Header>
    <Modal.Content>
      {children}
    </Modal.Content>
    <Modal.Actions>
      <Button icon='close' content='Close' onClick={onClickClose} />
    </Modal.Actions>
  </Modal>
)

const HistorySearchContainer = ({ items }) => (
  <SearchHistoryComponent
    hideHeader={true}
    items={items}
    onClickRemoveItem={onClickHistoryRemoveName}
  />
)

export default HistorySearchContainer
