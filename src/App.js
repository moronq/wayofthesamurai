import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Route} from "react-router-dom";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import News from "./components/News/News";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";


function App(props) {
    return (
        <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper-content'>
                    {/*<Route path='/dialogs' element={<DialogsContainer/>}/>*/}
                    {/*<Route path='/profile/:userId?' element={<ProfileContainer/>}/>*/}
                    {/*<Route path='/music' element={<Music/>}/>*/}
                    {/*<Route path='/news' element={<News/>}/>*/}
                    {/*<Route path='/users' element={<UsersContainer/>}/>*/}
                    {/*<Route path='/settings' element={<Settings/>}/>*/}
                    <Route path='/dialogs' render = {()=><DialogsContainer/>}/>
                    <Route path='/profile/:userId?' render = {()=><ProfileContainer/>}/>
                    <Route path='/music' render = {()=><Music/>}/>
                    <Route path='/news' render = {()=><News/>}/>
                    <Route path='/users' render = {()=><UsersContainer/>}/>
                    <Route path='/settings' render = {()=><Settings/>}/>
            </div>
        </div>
    );
}


export default App;
