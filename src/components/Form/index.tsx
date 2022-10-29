import React, { useEffect, useRef, useState } from 'react';
import {
  useCreateNewUserMutation,
  useGepPositionsQuery,
} from '../../store/reducers/usersApi';
import { Button } from '../common/Button';
import Checkbox from '../common/Checkbox';
import Input from '../common/Input';
import styles from './index.module.scss';
import { Format } from './types';
import * as Toaster from '../Toaster';
import { success } from '../../assets';

const regPhoneNumber = /^[\+]{0,1}380([0-9]{9})$/;

interface Props {
  count: number;
  setCount: (n: number) => void;
}

const Form = ({ count, setCount }: Props) => {
  const [name, setName] = useState('');
  const [errName, setErrName] = useState('');
  const [email, setEmail] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errPhone, setErrPhone] = useState('');
  const [checkbox, setCheckbox] = useState(1);
  const [photo, setPhoto] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);

  const { data } = useGepPositionsQuery();
  const [createUser] = useCreateNewUserMutation();

  useEffect(() => {
    const isUserPhone =
      phone.startsWith('+380') && regPhoneNumber.test(String(phone).toLowerCase());

    if (name && email && isUserPhone) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, email, phone]);

  const handleClick = (val: number) => {
    setCheckbox(val);
  };

  const clearForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setErrName('');
    setErrEmail('');
    setErrPhone('');
    setPhoto('');
    setCheckbox(1);
  };

  const checkFile = (file?: File) => {
    if (!file) {
      return Toaster.showErrorToast('Please select a photo');
    }
    if (file.size >= 5000000) {
      return Toaster.showErrorToast('Image must be light then 5 Mb');
    } else return file;
  };

  const addNewUser = () => {
    let file = checkFile(fileInput.current?.files?.[0]);
    if (file) {
      const form = new FormData();
      form.append('name', name);
      form.append('email', email);
      form.append('phone', phone);
      form.append('position_id', checkbox.toString());
      form.append('photo', file);

      createUser(form)
        .unwrap()
        .then(() => {
          setCount(6);
          clearForm();
          setIsSuccess(true);
          Toaster.showSuccessToast('Success');
        })
        .catch((err) => {
          Toaster.showErrorToast(err.data.message);
          let errors = Object.keys(err?.data.fails);

          if (errors.includes('name')) {
            setErrName(err?.data.fails['name'][0]);
          }
          if (errors.includes('email')) {
            setErrEmail(err?.data.fails['email'][0]);
          }
          if (errors.includes('phone')) {
            setErrPhone(err?.data.fails['phone'][0]);
          }
        });
    }
  };

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>
        {isSuccess ? 'User successfully registered' : 'Working with POST request'}
      </h1>
      {isSuccess ? (
        <div onClick={() => setIsSuccess(false)}>
          <img src={success} alt="User successfully registered" />
        </div>
      ) : (
        <div className={styles.form}>
          <div className={styles.inputs}>
            <Input
              placeholder="Your name"
              value={name}
              onChange={setName}
              type="text"
              err={errName}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={setEmail}
              type="email"
              err={errEmail}
            />
            <Input
              placeholder="Phone"
              value={phone}
              onChange={setPhone}
              type="text"
              err={errPhone}
            />
            <span className={styles.example}> +38 (XXX) XXX - XX - XX</span>
          </div>
          <div className={styles.select}>
            <p>Select your position</p>
            {data?.positions.map(({ id, name }) => (
              <div
                key={id}
                className={styles.select_option}
                onClick={() => handleClick(id)}
              >
                <Checkbox checkbox={checkbox} value={id} />
                <p>{name}</p>
              </div>
            ))}
          </div>

          <label htmlFor="file-input" className={styles.download}>
            <div className={styles.download_button}>Upload</div>
            <Input
              name="photo-address"
              value={photo}
              placeholder="Upload your photo"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            />
            <input
              id="file-input"
              name="photo"
              type="file"
              ref={fileInput}
              accept={` ${Format.jpg}, ${Format.jpeg}`}
              onChange={({ target: { files } }) => setPhoto(files?.[0].name || '')}
              style={{ display: 'none' }}
            />
          </label>
          <div>
            <Button
              type="button"
              text="Sign up"
              onClick={addNewUser}
              disabled={isDisabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
