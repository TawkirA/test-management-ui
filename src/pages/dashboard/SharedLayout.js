import { Outlet } from "react-router-dom"
import {Navbar, BigSidebar } from '../../components';
import Wrapper from "../../assets/wrappers/SharedLayout"

const SharedLayout = () => {
    return (
        <Wrapper>
                <main className="dashboard">
                    {/* smallSide bar */}
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className="dashboard-pages">
                            <Outlet />
                        </div>
                    </div>
                </main>
        </Wrapper>
    )
}

export default SharedLayout