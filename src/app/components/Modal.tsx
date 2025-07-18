interface ModalProps {
  children: React.ReactNode;
}

export function Modal({ children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-xs overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border min-w-96 shadow-lg opacity-100 rounded-md bg-white">
        {children}
      </div>
    </div>
  );
}