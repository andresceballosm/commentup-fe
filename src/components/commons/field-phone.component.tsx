import PhoneInput from 'react-phone-input-2';
import { useSelector } from 'react-redux';
import 'react-phone-input-2/lib/style.css';
import { styleSlice } from '@/stores/styleSlice';
import { localStorageDarkModeKey } from '@/config';

const TexFieldPhoneComponent = ({ field, form: { touched, errors, setFieldValue } }: any) => {
  const darkMode = useSelector((state: any) => state.style.darkMode);
  const handlePhoneNumberChange = (value: string) => {
    setFieldValue(field.name, value);
  };

  return (
    <>
      <PhoneInput
        {...field}
        value={field.value}
        onChange={handlePhoneNumberChange}
        country="us"
        inputStyle={{
          borderRadius: 5,
          height: 48,
          borderColor: 'black',
          width: '100%',
          backgroundColor: darkMode ? '#1E293B' : 'transparent',
        }}
        buttonStyle={{
          backgroundColor: darkMode ? '#1E293B' : 'transparent',
          borderBottomWidth: 0.7,
          borderColor: 'transparent',
        }}
        dropdownStyle={{
          backgroundColor: darkMode ? '#1E293B' : 'transparent',
          borderBottomWidth: 0.7,
          borderColor: 'transparent',
        }}
      />
      {/* <input type="text" {...field} {...props} /> */}
      {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </>
  );
};

export default TexFieldPhoneComponent;
