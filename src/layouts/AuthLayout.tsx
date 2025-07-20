const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sidebar">
      {children}
    </div>
  );
};

export default AuthLayout;
