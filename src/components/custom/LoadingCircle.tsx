interface props {
  blockPage: boolean;
}

export const LoadingCircle = (props: props) => {
  return (
    <div>
      {props.blockPage ? (
        <>
          <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          </div>
        </>
      )}
    </div>
  );
};
