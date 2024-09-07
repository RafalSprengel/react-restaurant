import { useState, useEffect, useCallback } from 'react';
import '../styles/Checkout.scss';

export default function Checkout() {
    const [order, setOrder] = useState({
        time: { option: 1, hour: "16:30" },
        delivery: 1,
        address: { city: '', street: '', houseNo: '', flatNo: '', floor: '' },
        note: ''
    });

    const [errors, setErrors] = useState({
        city: '',
        street: '',
        houseNo: ''
    });

    const validateField = (val, regex) => regex.test(val);

    const handleTimeOption = (option) => {
        setOrder(order => ({ ...order, time: { option, hour: order.time.hour } }));
    };

    const handleHourOption = (e) => {
        setOrder(order => ({ ...order, time: { ...order.time, hour: e.target.value } }));
    };

    const handlePlaceOption = (option) => {
        setOrder(order => ({ ...order, delivery: option }));
    };

    const handleAdressFieldChange = (e) => {
        const { name, value } = e.target;
        setOrder(order => ({ ...order, address: { ...order.address, [name]: value } }));

        let error = '';
        if (!value.trim()) {
            error = 'To pole nie może być puste';
        } else if (!validateField(value, /^[a-zA-Z0-9-]+$/)) {
            error = 'To pole może zawierać tylko litery, cyfry i myślnik';
        }
        setErrors(errors => ({ ...errors, [name]: error }));
    };

    const handleNoteChange = (e) => {
        setOrder(order => ({ ...order, note: e.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = {
            city: !order.address.city.trim() ? 'To pole nie może być puste' : errors.city,
            street: !order.address.street.trim() ? 'To pole nie może być puste' : errors.street,
            houseNo: !order.address.houseNo.trim() ? 'To pole nie może być puste' : errors.houseNo
        };

        setErrors(newErrors);
        const hasErrors = Object.values(newErrors).some(el => el !== '');
        if (hasErrors) return;

        console.log('Wysyłam...');
    };

    useEffect(() => {
        console.log('errors: ', errors);
    });

    return (
        <form className="checkout" onSubmit={handleSubmit}>
            <div className="checkout__form">
                <div className='checkout__form__header'>Opcje Realizacji: </div>
                <div className='checkout__form__orderTime'>
                    <p>Zamówienie na:</p>
                    <div className={`formFieldWrap ${order?.time.option === 1 ? 'formFieldWrap--active' : ''}`} onClick={() => handleTimeOption(1)}>
                        <input
                            id="asap"
                            name="ASAP"
                            type="radio"
                            value='asap'
                            onChange={() => null}
                            checked={order?.time.option === 1}
                        />
                        <label htmlFor="asap"> ASAP</label>
                    </div>
                    <div className={`formFieldWrap ${order?.time.option === 2 ? 'formFieldWrap--active' : ''}`} onClick={() => handleTimeOption(2)}>
                        <input
                            id="time"
                            name="orderTime"
                            type="radio"
                            value='time'
                            onChange={() => null}
                            checked={order?.time.option === 2}
                        />
                        <label htmlFor="timeSlot">On Time</label>
                        {order?.time.option === 2 &&
                            <div className='checkout__form__orderTime__timeSlot'>
                                <select value={order?.time.hour} onChange={handleHourOption}>
                                    <option value="15:00">15:00</option>
                                    <option value="15:30">15:30</option>
                                    <option value="16:00">16:00</option>
                                    <option value="16:30">16:30</option>
                                </select>
                            </div>
                        }
                    </div>
                </div>
                <div className='checkout__form__orderPlace'>
                    <div>Sposób realizacji:</div>
                    <div className={`formFieldWrap ${order?.delivery === 1 ? 'formFieldWrap--active' : ''}`} onClick={() => handlePlaceOption(1)}>
                        <input
                            id="delivery"
                            name="delivery"
                            type="radio"
                            value='delivery'
                            onChange={() => null}
                            checked={order?.delivery === 1}
                        />
                        <label htmlFor="delivery">Dostawa</label>
                    </div>
                    <div className={`formFieldWrap ${order?.delivery === 2 ? 'formFieldWrap--active' : ''}`} onClick={() => handlePlaceOption(2)}>
                        <input
                            id="pickup"
                            name="pickup"
                            type="radio"
                            value='pickup'
                            onChange={() => null}
                            checked={order?.delivery === 2}
                        />
                        <label htmlFor="pickup">Odbiór własny</label>
                    </div>
                    <div className={`formFieldWrap ${order?.delivery === 3 ? 'formFieldWrap--active' : ''}`} onClick={() => handlePlaceOption(3)}>
                        <input
                            id="forHere"
                            name="forHere"
                            type="radio"
                            value='forHere'
                            onChange={() => null}
                            checked={order?.delivery === 3}
                        />
                        <label htmlFor="forHere">Zjem na miejscu</label>
                    </div>
                </div>
                {order?.delivery === 1 &&
                    <div className='checkout__form__orderAddress'>
                        <div className='checkout__form__orderAddress__city'>
                            <label htmlFor='city'>Miasto</label>
                            <input
                                type='text'
                                id='city'
                                name='city'
                                onChange={handleAdressFieldChange}
                                value={order?.address?.city}
                            />
                            {errors.city && <span className="error">{errors.city}</span>}
                        </div>
                        <div className='checkout__form__orderAddress__group1'>
                            <div className='checkout__form__orderAddress__group1__street'>
                                <label htmlFor='street'>Ulica</label>
                                <input type='text' id='street' onChange={handleAdressFieldChange} name='street' value={order?.address?.street} />
                                {errors.street && <span className="error">{errors.street}</span>}
                            </div>
                            <div className='checkout__form__orderAddress__group1__houseNumber'>
                                <label htmlFor='houseNumber'>Numer domu</label>
                                <input type='text' id='houseNumber' onChange={handleAdressFieldChange} name='houseNo' value={order?.address?.houseNo} />
                                {errors.houseNo && <span className="error">{errors.houseNo}</span>}
                            </div>
                        </div>
                        <div className='checkout__form__orderAddress__group2'>
                            <div className='checkout__form__orderAddress__group2__apartmentNumber'>
                                <label htmlFor='apartmentNumber'>Numer mieszkania</label>
                                <input type='text' id='apartmentNumber' onChange={handleAdressFieldChange} name='flatNo' value={order?.address?.flatNo} />
                            </div>
                            <div className='checkout__form__orderAddress__group2__floor'>
                                <label htmlFor='floor'>Piętro</label>
                                <input type='text' id='floor' onChange={handleAdressFieldChange} name='floor' value={order?.address?.floor} />
                            </div>
                        </div>
                    </div>
                }
                <div className='checkout__form__note'>
                    <label htmlFor='note'>Uwagi do zamówienia</label>
                    <textarea rows="3" id='note' onChange={handleNoteChange} name='note' value={order.note} />
                </div>
            </div>
            <div className="checkout__summary">
                <div className="checkout__summary__header">Koszyk:</div>
                <div className="checkout__summary__content">
                    <div className='checkout__summary__content__item'>
                        <div className="checkout__summary__content__item__name">Polędwiczki</div>
                        <div className="checkout__summary__content__item__price">32,6</div>
                    </div>
                    <div className='checkout__summary__content__item'>
                        <div className="checkout__summary__content__item__name">Kebab</div>
                        <div className="checkout__summary__content__item__price">32,6</div>
                    </div>
                    <div className='checkout__summary__content__item'>
                        <div className="checkout__summary__content__item__name">Zapiekanka</div>
                        <div className="checkout__summary__content__item__price">32,6</div>
                    </div>
                </div>
                <div className='checkout__summary__price'>
                    <div className='checkout__summary__price__name'>SUMA:</div>
                    <div className='checkout__summary__price__amount'>120,80 zł</div>
                </div>
                <div className="checkout__summary__button">
                    <button type='submit' className='button-contained'>ZAMÓW</button>
                </div>
            </div>
        </form>
    )
}
