export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <nav className="nav flex-column">
        <a href="/Account/Signin" className="nav-link text-black border-0 border-start border-dark border-4">
       Signin
        </a>
        <a href="/Account/Signup" className="nav-link text-danger">
      Signup
        </a>
        <a href="/Account/Profile" className="nav-link text-danger">
      Profile
        </a>
      </nav>
    </div>
  );
}