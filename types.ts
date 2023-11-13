type User = {
  id: number;
  date: string;
  name: string;
  address: string;
};

type NewUser = {
  name: string;
  address: string;
};

type Modal = {
  isShowModal: boolean;
  header: string;
  body?: string;
};
