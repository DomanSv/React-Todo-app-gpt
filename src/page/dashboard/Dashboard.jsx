import { Navigate } from "react-router-dom";
import Greetings from "../../components/Greetings";
import { getStoredToken } from "../../utils/helperfuncs";
import { useAuth } from "../../context/Auth";
import NavigationBar from "../../components/NavigationBar";

export default function Dashboard() {
  const { authenticated, isLoading, account } = useAuth();

  if (!authenticated && !getStoredToken()) {
    return <Navigate to='/login' />;
  }

  return (
    <div>
      <NavigationBar>
        username={account?.username}
      </NavigationBar>
      <div className='text-center text-9xl font-extrabold text-blue-900 opacity-80 mt-4'>
        TODO
        <Greetings username={account?.username} isLoading={isLoading} />

      </div>
    </div>
  );
}
