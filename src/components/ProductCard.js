import '../styles/ProductCard.scss';
import { useShoppingCart } from '../context/ShoppingCartContext.js';
import Modal from '../components/Modal.js';

export default function ProductCard({ currentProduct: curr, isOpen, close }) {
    const { increaseCartQuantity, decreaseCartQuantity, getItemQuantity, openCart } = useShoppingCart();

    const handleSubmit = (e) => {
        e.preventDefault();
        close();
        openCart();
    };

    // Check if currentProduct is available and valid
    if (!curr) {
        console.error('Product information is missing.');
        return null;
    }

    return (
        <Modal isOpen={isOpen} close={close}>
            <div className="product">
                <form onSubmit={handleSubmit}>
                    <img
                        src={process.env.PUBLIC_URL + curr.img}
                        alt={curr.name}
                        className='product__img'
                    />
                    <div className='product__name'>{curr.name}</div>
                    {curr.desc && <div className='product__desc'>{curr.desc}</div>}
                    <div className='product__quantity'>
                        <span
                            className='product__quantity__minus'
                            onClick={() => decreaseCartQuantity(curr.id)}
                        >-</span>
                        <span className='product__quantity__number'>{getItemQuantity(curr.id)}</span>
                        <span
                            className='product__quantity__plus'
                            onClick={() => increaseCartQuantity(curr.id)}
                        >+</span>
                    </div>
                    <div className='product__buttons'>
                        <button
                            type="button"
                            className='product__buttons__back'
                            onClick={close}
                        >Wróć</button>
                        <button
                            type="submit"
                            className='product__buttons__submit'
                        >Przejdź do koszyka</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
