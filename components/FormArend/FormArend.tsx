'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { useFormik } from 'formik';
import { useState } from 'react';
import DatePicker from 'react-datepicker';

import { blocingCar } from '@/lib/api/apiFunc';
import Modal from '../Modal/Modal';

interface FormArendProps {
  id: string;
}

// const today = new Date();

export default function FormArend({ id }: FormArendProps) {
  const [errSubmit, setErrSubmit] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [inputDate, setInputDate] = useState<Date | null>(null);
  const [isDateErr, setIsDateErr] = useState(false);
  const [isErrName, setIserrName] = useState(false);
  const [errName, setErrName] = useState('');
  const [isErrEmail, setIserrEmail] = useState(false);
  const [errEmail, setErrEmail] = useState('');
  const [isCommentErr, setIsCommentErr] = useState(false);

  function changeName(event: React.ChangeEvent) {
    formik.handleChange(event);
    const elem = event.target as HTMLInputElement;
    const isBlank = elem.value === '';
    const isMin = elem.value.length < 3;
    const isMax = elem.value.length > 30;
    if (isBlank || isMin || isMax) {
      if (isBlank) setErrName('This field is required');
      if (isMin) setErrName('Must be at least 3 characters.');
      if (isMax) setErrName('Maximum 30 characters.');
      setIserrName(true);
    } else {
      setIserrName(false);
    }
  }

  function changeEmail(event: React.ChangeEvent) {
    formik.handleChange(event);
    const elem = event.target as HTMLInputElement;
    const isEmail = elem.value.includes('@');
    const isMax = elem.value.length > 30;
    if (!isEmail || isMax) {
      if (!isEmail) setErrEmail('This should be email.');
      if (isMax) setErrEmail('Maximum 30 characters.');
      setIserrEmail(true);
    } else {
      setIserrEmail(false);
    }
  }

  function changeDate(myDate: Date | null) {
    let isErr;
    if (myDate != null) {
      setInputDate(myDate);
      isErr = myDate.getDate() <= new Date().getDate();
    }
    if (isErr) {
      setIsDateErr(true);
    } else {
      setIsDateErr(false);
    }
    formik.setFieldValue('date', myDate);
  }

  function changeComment(event: React.ChangeEvent) {
    formik.handleChange(event);
    const elem = event.target as HTMLInputElement;
    const isMax = elem.value.length > 500;
    if (isMax) {
      setIsCommentErr(true);
    } else {
      setIsCommentErr(false);
    }
  }

  const formik = useFormik({
    initialValues: { name: '', email: '', date: null, comment: '' },
    onSubmit: async values => {
      setErrSubmit(false);
      const errName = values.name.length < 3 || values.name.length > 30;
      const errEmail = !values.email.includes('@') || values.email.length > 30;
      // const errDate =
      //   !values.date || new Date(values.date).getDate() <= today.getDate();
      const errDate = false;
      const errComment = values.comment.length > 500;
      if (errName || errEmail || errDate || errComment) {
        return;
      }
      const data = {
        name: values.name,
        email: values.email,
        // date: values.date || new Date(),
        comment: values.comment,
      };
      try {
        const res = await blocingCar(data, id);
        setModalText(res.message);
        setIsModal(true);
        const form = document.querySelector('.carForm') as HTMLFormElement;
        form.reset();
        setInputDate(null);
      } catch {
        setErrSubmit(true);
        setModalText('We apologize. There was an error sending your request.');
        setIsModal(true);
      }
    },
  });

  return (
    <div>
      <p>Book your car now</p>
      <p>Stay connected! We are always ready to help you.</p>
      <form
        className="carForm"
        onSubmit={e => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
      >
        <div>
          <input
            name="name"
            type="text"
            placeholder="Name*"
            required
            onChange={changeName}
          />
          {isErrName && <span>{errName}</span>}
        </div>
        <div>
          <input
            name="email"
            type="text"
            placeholder="Email*"
            required
            onChange={changeEmail}
          />
          {isErrEmail && <span>{errEmail}</span>}
        </div>
        <div>
          <DatePicker
            placeholderText="Booking date"
            selected={inputDate}
            onChange={(date: Date | null) => changeDate(date)}
            // wrapperClassName={clsx(css.input, css.datepicker)}
            // className={clsx(css.datainput, isDateErr && css.inputInvalid)}
            dateFormat="dd.MM.yyyy"
            autoComplete="off"
          />
          {isDateErr && <span>The date must be no earlier than tomorrow.</span>}
        </div>
        <div>
          <textarea
            name="comment"
            placeholder="Comment"
            onChange={changeComment}
          ></textarea>
          {isCommentErr && <span>Maximum 500 characters.</span>}
        </div>
        <button type="submit">Send</button>
      </form>

      {isModal && (
        <Modal onClose={() => setIsModal(false)}>
          {errSubmit ? <p>{modalText}</p> : <p>{modalText}</p>}
        </Modal>
      )}
    </div>
  );
}
