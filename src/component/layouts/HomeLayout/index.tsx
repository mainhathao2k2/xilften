// import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Content from './Content';

interface HomeLayoutProps {
    children: React.ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
    return (
        <div>
            {/* <Header></Header> */}
            <Sidebar></Sidebar>
            <Content></Content>
            <div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default HomeLayout;
