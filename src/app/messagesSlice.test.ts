import messagesReduce, {addMessages, MessagesState} from './messagesSlice'
import {dataMessages} from "../mock/data";

describe('messages reducer', () => {
    const initialState: MessagesState = {
        data: dataMessages,
    };

    it('should handle initial state', () => {
        expect(messagesReduce(undefined, {type: 'unknown'})).toEqual({
            data: dataMessages,
        })
    });

    it('should handle addMessages', () => {
        const newMessageMock = {
            id: '9a7034e9-5d01-4ef9-856e-8848cdf7e433',
            date: 'Tue Mar 01 2022 10:49:20 GMT+0300 (Москва, стандартное время)',
            name: 'Петр',
            email: 'test10@test.ru',
            carBrand: 'volkswagen',
            carModel: 'polo IV',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis et eum hic iste quia. Accusantium consequuntur deleniti illo impedit magni minus odit optio qui tempore velit. Architecto cumque deleniti dolore ducimus expedita ipsam minus, odit officiis quam quibusdam quis reiciendis sapiente temporibus voluptatem voluptates. Commodi, eius, ipsum. Exercitationem, magni, perferendis.',
        }
        const actual = messagesReduce(initialState, addMessages(newMessageMock))
        expect(actual.data).toEqual([...dataMessages, newMessageMock])
    });
})
