import { observer } from "mobx-react";
import * as React from "react";
import { Modal } from "semantic-ui-react";
import { useStore } from "../../stores/store";

export default observer(function ModelContainer() {
  const { modalStore } = useStore();
  return (
    <Modal
      open={modalStore.modal.open}
      onClose={modalStore.closeModal}
      size="tiny"
    >
      <Modal.Content>{modalStore.modal.body}</Modal.Content>
    </Modal>
  );
});
