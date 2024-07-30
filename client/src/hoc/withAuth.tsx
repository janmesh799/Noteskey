import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    if (typeof window !== 'undefined') {
      const router = useRouter();
      const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

      if (!isAuthenticated) {
        router.replace('/login');
        return null;
      }

      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;