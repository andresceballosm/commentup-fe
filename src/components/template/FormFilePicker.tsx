import UserAvatar from '@/components/template/UserAvatar';
import { SetStateAction, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebaseConfig';
import { useAuth } from '@/context/authContext';

type Props = {
  label?: string;
  icon?: string;
  accept?: string;
  uploadImage: (image: any) => void;
  isRoundIcon?: boolean;
};

const FormFilePicker = ({ accept, uploadImage, isRoundIcon }: Props) => {
  const [checkFile, setCheckFile] = useState(false);
  const { user, setLoading } = useAuth();
  const [file, setFile] = useState<any>(null);

  const handleFileChange = async (event: { currentTarget: { files: SetStateAction<null>[] } }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setFile(event.currentTarget.files[0]);
      setCheckFile(true);
      if (event.currentTarget.files[0]) {
        setLoading(true);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        const pdfRef = ref(storage, `avatar/${user?._id}/${file?.name}`);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await uploadBytes(pdfRef, event.currentTarget.files[0]);
        const downloadURL = await getDownloadURL(pdfRef);
        uploadImage(downloadURL);
      }
    } catch (error) {
      console.log('ERROR ', error);
      setLoading(false);
    }
  };

  const showFilename = !isRoundIcon && file;

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div className="">
      <div className="w-full flex justify-center">
        <UserAvatar
          username=""
          avatar={file ? URL.createObjectURL(file) : null}
          className="w-24 h-24 mr-3 inline-flex my-5"
        />
      </div>

      <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="file_input">
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          id="file_input"
          type="file"
          accept={accept}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange={handleFileChange}
        />
      </label>
      {showFilename && (
        // eslint-disable-next-line max-len
        <div className="px-4 py-2 max-w-full flex-grow-0 overflow-x-hidden bg-gray-100 dark:bg-slate-800 border-gray-200 dark:border-slate-700 border rounded-r">
          <span className="text-ellipsis max-w-full line-clamp-1">{file?.name}</span>
        </div>
      )}
    </div>
  );
};

export default FormFilePicker;
