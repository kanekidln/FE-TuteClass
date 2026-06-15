import { Eye, GraduationCap, LockKeyhole, Mail } from "lucide-react";
import "../RegisterPage/RegisterPage.css";
import "./LoginPage.css";

export function LoginPage() {
  return (
    <main className="register-page login-page">
      <section className="register-shell login-shell" aria-label="Log in">
        <div className="register-card login-card">
          <div className="register-cap login-cap" aria-hidden="true">
            <GraduationCap size={58} strokeWidth={2.4} />
          </div>

          <div className="register-heading login-heading">
            <h1>Welcome back to TuteClass</h1>
            <p>Log in to continue your learning journey.</p>
          </div>

          <form className="register-form login-form">
            <label className="register-field login-field">
              <Mail size={21} aria-hidden="true" />
              <input type="email" placeholder="Email address" />
            </label>

            <label className="register-field login-field">
              <LockKeyhole size={21} aria-hidden="true" />
              <input type="password" placeholder="Password" />
              <Eye size={20} aria-hidden="true" />
            </label>

            <div className="login-options">
              <label className="register-agreement login-remember">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#forgot-password">Forgot password?</a>
            </div>

            <button className="login-submit" type="button">Log in</button>

            <div className="register-divider login-divider">
              <span>or</span>
            </div>

            <button className="register-google login-google" type="button">
              <span aria-hidden="true">G</span>
              Continue with Google
            </button>

            <p className="register-switch login-switch">
              Don&apos;t have an account? <a href="#register">Sign up</a>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
