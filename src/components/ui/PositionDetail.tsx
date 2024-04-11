import React, { useCallback, useEffect, useState } from 'react';
import LoadingComponent from '@/components/template/loading';
import { usePosition } from '@/context/positionContext';
import { useRouter } from 'next/router';
import { Editable, Slate, withReact } from 'slate-react';
import { Leaf, Element } from '@/components/commons/text-input-rich.component';
import { createEditor } from 'slate';
import CardBox from '@/components/template/CardBox';
import { useAuth } from '@/context/authContext';

const PositionDetail = () => {
  const [editor] = useState(() => withReact(createEditor()));
  const [editorRequirements] = useState(() => withReact(createEditor()));
  const { user } = useAuth();

  const { position, postulations, loading } = usePosition();
  const renderElement: any = useCallback((props: any) => <Element {...props} styles={{ color: 'black' }} />, []);

  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);

  if (!user || !position || !postulations || loading) {
    return <LoadingComponent loading />;
  }

  return (
    <>
      <div className="flex">
        <span
          className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 
            py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300"
        >
          {position.location}
        </span>
        {position.salary && position.salary !== '0' && (
          <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
            {position.salary}
          </span>
        )}
      </div>

      <div>
        <Slate editor={editor} value={position.description}>
          <CardBox>
            <h1 className="text-2xl mb-5 text-indigo-900">Description</h1>
            <Editable
              readOnly
              renderElement={renderElement}
              style={{ color: 'gray' }}
              renderLeaf={renderLeaf}
              spellCheck
              autoFocus
            />
          </CardBox>
        </Slate>
        <Slate editor={editorRequirements} value={position.requirements}>
          <CardBox>
            <h1 className="text-2xl mb-5 text-indigo-900">Requirements</h1>
            <Editable
              readOnly
              renderElement={renderElement}
              style={{ color: 'gray' }}
              renderLeaf={renderLeaf}
              spellCheck
              autoFocus
            />
          </CardBox>
        </Slate>
      </div>
    </>
  );
};

export default PositionDetail;
