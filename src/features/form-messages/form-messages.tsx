import {useState} from "react";
import axios from 'axios';
import {useFormik} from "formik";
import * as yup from "yup";
import { v4 as uuidv4 } from 'uuid';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {useAppDispatch} from '../../app/hooks';
import {addMessages} from "../../app/messagesSlice";
import {DateFormats, formatDate} from "../../utils/date";
import './form-messages.scss';

const validationSchema = yup.object({
    name: yup
        .string()
        .min(2, 'Имя должно быть от 2х до 30 символов')
        .max(30, 'Имя должно быть от 2х до 30 символов')
        .matches(/^[а-яА-ЯёЁ]+$/, 'Только русские буквы')
        .required('Обязательное поле'),
    email: yup
        .string()
        .email('Ввведите валидный email')
        .required('Обязательное поле'),
    carBrand: yup
        .string()
        .min(4, 'Марка авто должна быть от 4х до 20 символов')
        .max(20, 'Марка авто должна быть от 4х до 20 символов')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Только латинские буквы')
        .required('Обязательное поле'),
    carModel: yup
        .string()
        .min(4, 'Модель авто должна быть от 4х до 20 символов')
        .max(20, 'Модель авто должна быть от 4х до 20 символов')
        .matches(/^[a-zA-Z0-9\s]+$/, 'Только латинские буквы')
        .required('Обязательное поле'),
    text: yup
        .string()
        .max(500, 'Текст не должен быть более 500 символов')
        .matches(/^[?!,.a-zA-Zа-яА-ЯёЁ0-9\s]+$/, 'Спецсимволы запрещены')
        .required('Обязательное поле'),
});

export const FormMessages = () => {
    const [error, setError] = useState(false)
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            carBrand: '',
            carModel: '',
            text: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {
            const data = {
                id: uuidv4(),
                date: String(new Date()),
                ...values
            };
            const sentData = async () => {
                try {
                    const {data: response} = await axios.post('http://httpbin.org/post', data);
                    setError(false)
                    dispatch(addMessages(data))
                    resetForm()
                } catch (error) {
                    setError(true)
                    console.error(error.message);
                }
            }
            sentData();
        },
    });
    const dispatch = useAppDispatch();
    return (
        <div className='form-messages'>
            <h2 className='form-messages__header'>Задать вопрос</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-messages__wrapper'>
                    <div className='form-messages__sub-wrapper'>
                        <div className='form-messages__field'>
                            <TextField
                                id="name"
                                name="name"
                                label="Имя"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                variant="outlined"
                                size="small"
                                style={{width: 250}}
                            />
                        </div>
                        <div className='form-messages__field'>
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                variant="outlined"
                                size="small"
                                style={{width: 250}}
                            />
                        </div>
                    </div>
                    <div className='form-messages__sub-wrapper'>
                        <div className='form-messages__field'>
                            <TextField
                                id="carBrand"
                                name="carBrand"
                                label="Марка авто"
                                value={formik.values.carBrand}
                                onChange={formik.handleChange}
                                error={formik.touched.carBrand && Boolean(formik.errors.carBrand)}
                                helperText={formik.touched.carBrand && formik.errors.carBrand}
                                variant="outlined"
                                size="small"
                                style={{width: 250}}
                            />
                        </div>
                        <div className='form-messages__field'>
                            <TextField
                                id="carModel"
                                name="carModel"
                                label="Модель авто"
                                value={formik.values.carModel}
                                onChange={formik.handleChange}
                                error={formik.touched.carModel && Boolean(formik.errors.carModel)}
                                helperText={formik.touched.carModel && formik.errors.carModel}
                                variant="outlined"
                                size="small"
                                style={{width: 250}}
                            />
                        </div>
                    </div>
                    <div className='form-messages__sub-wrapper'>
                        <div className='form-messages__field'>
                            <TextField
                                multiline
                                rows={6}
                                id="text"
                                name="text"
                                label="Текст"
                                value={formik.values.text}
                                onChange={formik.handleChange}
                                error={formik.touched.text && Boolean(formik.errors.text)}
                                helperText={formik.touched.text && formik.errors.text}
                                variant="outlined"
                                size="small"
                                style={{width: 525}}
                            />
                        </div>
                    </div>
                    {
                        error && (
                            <div className='form-messages__error-message'>
                                Не удалось отпавить данные. Повторите попытку позже.
                            </div>
                        )
                    }
                    <div className='form-messages__button'>
                        <Button color="primary" variant="contained" type="submit">
                            Отправить
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

