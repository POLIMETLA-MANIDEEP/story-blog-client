import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between">
    <h1 className="text-lg font-bold">Story Blog</h1>
    <div className="space-x-4">
      <Link to="/">Home</Link>
      <Link to="/upload">Upload</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  </nav>
);

export default Navbar;
