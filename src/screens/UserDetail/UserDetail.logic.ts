import { useRoute } from '@react-navigation/native';

const useLogicUserDetail = () => {
  const route = useRoute<any>();

  const userInfo = route.params?.item;

  return {
    userInfo,
  };
};

export default useLogicUserDetail;
