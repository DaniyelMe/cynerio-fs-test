import { defineStore } from 'pinia';

export const useUIStore = defineStore({
  id: 'modal',
  state: (): { modal: Modal } => ({
    modal: {
      isShowModal: false,
      header: '',
      body: '',
    },
  }),
  getters: {},
  actions: {
    resetModal() {
      this.modal.isShowModal = false;
      this.modal.header = '';
      this.modal.body = '';
    },
    setModal({ isShowModal, header, body }: Modal) {
      this.modal.isShowModal = isShowModal;
      this.modal.header = header;
      this.modal.body = body || '';
    },
  },
});
