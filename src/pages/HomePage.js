import { NavLink } from 'react-router-dom';
import '../styles/HomePage.scss'
import img from '../img/logo-white-XXL.png';
export const MainPage = () => {
    return (
        <div className='home-page'>
            <div className="home-page__section-1">
                <div className="home-page__section-1__content">
                    <img src={img}></img>
                    <div>Restauracja w Tczewie</div>
                    <div className='home-page__section-1__content__buttons-wrap'>
                        <NavLink to='menu'> <button className='home-page__section-1__content__button-order button-contained'>ZAMÓW ONLINE</button></NavLink>
                        <NavLink to='menu'> <button className='home-page__section-1__content__button-menu button-outlined'>ZOBACZ MENU</button></NavLink>
                    </div>

                </div>
            </div>
        </div >
    )
}

export default MainPage;