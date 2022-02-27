import {useAppSelector} from "../../app/hooks";
import {selectMessages} from "../../app/messagesSlice";
import './messages.scss';
import {DateFormats, formatDate} from "../../utils/date";

export const Messages = () => {
    const messages = useAppSelector(selectMessages);
    const sortMessages = messages.slice().sort((a,b) => +new Date(b.date) - +new Date(a.date));

    return (
        <div className='messages'>
            <h1 className="messages__header">Вопросы по автомобилям</h1>
            {
                sortMessages.map(({id, name, carBrand, carModel, date, text}) => {
                    return (
                        <div className="messages__list" key={id}>
                            <div className="messages__name-and-car">
                                <div className=" messages__name">{name}</div>
                                <div className=" messages__car">{carBrand} {carModel}</div>
                            </div>
                            <div className=" messages__date">{formatDate(date, DateFormats.DDMMYYYY_TIME_DOT)}</div>
                            <div className=" messages__text">{text}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
