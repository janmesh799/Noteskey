import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const HOC = (props: any) => {
    const router = useRouter();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    // Check if we are in the browser environment and if authentication is required
    if (typeof window !== 'undefined' && !isAuthenticated) {
      router.replace('/login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  HOC.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return HOC;
};

export default withAuth;
