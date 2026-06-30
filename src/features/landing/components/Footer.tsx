const Footer = () => {
  return (
    <footer className="bg-white p-2 px-4 py-6 lg:px-8 lg:py-8">
      <p className="text-center text-sm text-slate-600">
        © {new Date().getFullYear()} Claroo. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
