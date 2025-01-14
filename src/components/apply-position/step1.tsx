import CardBox from '@/components/template/CardBox';

const Step1 = ({ handleFileChange }: any) => (
  <CardBox>
    <p>
      <b className="text-indigo-900">CommentUp</b> is an AI-powered service that analyzes your profile and matches them
      to this position. It helps ensure that the position you apply for is well-suited to your skills and
      qualifications.{' '}
    </p>
    <p className="text-1xl text-bold mt-5 mb-5 text-bold">1. Please upload CV</p>
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 
            border-gray-300 border-dashed rounded-lg cursor-pointer
             bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 
             dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload CV</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOC, DOCX</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange={handleFileChange}
          accept=".pdf, .doc,.docx,
              application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        />
      </label>
    </div>
  </CardBox>
);

export default Step1;
