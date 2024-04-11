import CardDeveloper from '@/components/list-developers/components/card-developer';
import CardBox from '@/components/template/CardBox';
import CardBoxComponentEmpty from '@/components/template/CardBoxComponentEmpty';
import ToastComponent from '@/components/ui/Toast';
import { IProfile, useDeveloper } from '@/context/useDeveloper';
import React from 'react';

const ListDevelopers = () => {
  const { developers, success, error } = useDeveloper();

  if (developers.length === 0) {
    return (
      <CardBox>
        <CardBoxComponentEmpty />
      </CardBox>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3">
      <div>
        {success && <ToastComponent text={success} />}
        {error && <ToastComponent text={error} color="red" />}
      </div>

      {developers.map((developer: IProfile) => (
        <CardDeveloper developer={developer} />
      ))}
    </div>
  );
};

export default ListDevelopers;
