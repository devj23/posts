import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
};

export default Layout;
