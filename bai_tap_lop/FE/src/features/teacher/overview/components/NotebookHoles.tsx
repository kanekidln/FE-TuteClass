type NotebookHolesProps = {
  count?: number;
};

function NotebookHoles({ count = 7 }: NotebookHolesProps) {
  return (
    <div className="overview-notebook-holes" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span key={index} />
      ))}
    </div>
  );
}

export default NotebookHoles;
