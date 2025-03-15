export type NotFoundProps = {
  message: string;
  title?: string;
};

const NotFound = ({
  message = "Ho no ! This page doesn't exist !",
  title = '404',
}: NotFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500">{title}</h1>
      <p className="text-xl mt-4">{message}</p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
      >
        Back to quiz creation
      </a>
    </div>
  );
};

export default NotFound;
