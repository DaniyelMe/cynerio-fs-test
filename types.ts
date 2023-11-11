type User = {
  date: string;
  name: string;
  address: string;
};

type NewUser = Omit<User, 'date'>;

type Modal = {
  isShowModal: boolean;
  header: string;
  body?: string;
};
