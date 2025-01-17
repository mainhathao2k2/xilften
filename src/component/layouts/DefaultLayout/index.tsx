// import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Header from '../../Header';
import { DefaultLayoutProvider } from '../../providers/DefaultLayoutProvider';

const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex">
            <DefaultLayoutProvider>
                <Header></Header>
                <Sidebar></Sidebar>
                <div className="self-center flex-1">{children}</div>
            </DefaultLayoutProvider>
        </div>
    );
};

export default DefaultLayout;
