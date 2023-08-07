import { Outlet } from "react-router-dom";
import NavigationBar from "../../components/NavigationBar";
import { useAuth } from "../../context/Auth";

export default function Layout() {

    const {isLoading, account } = useAuth();

  return (
    <div>
      <NavigationBar username={account?.username} isLoading={isLoading}/>
      <section className='section'>
        <Outlet />
      </section>
    </div>
  );
}
