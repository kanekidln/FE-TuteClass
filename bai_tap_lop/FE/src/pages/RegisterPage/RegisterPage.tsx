import {
  Eye,
  GraduationCap,
  LockKeyhole,
  Mail,
  School,
  UserRound,
  UsersRound
} from "lucide-react";
import "./RegisterPage.css";

const roleOptions = [
  {
    key: "student",
    icon: <GraduationCap size={30} />,
    title: "Student",
    subtitle: "Join to learn and grow",
    active: true
  },
  {
    key: "teacher",
    icon: <School size={30} />,
    title: "Teacher",
    subtitle: "Teach and inspire",
    active: false
  }
];

export function RegisterPage() {
  return (
    <main className="register-page">
      <section className="register-shell" aria-label="Create account">
        <div className="register-card">
          <div className="register-cap" aria-hidden="true">
            <GraduationCap size={58} strokeWidth={2.4} />
          </div>

          <div className="register-heading">
            <h1>Create your TuteClass account</h1>
            <p>Start managing your classroom smarter.</p>
          </div>

          <form className="register-form">
            <label className="register-field">
              <UserRound size={22} aria-hidden="true" />
              <input type="text" placeholder="Full name" />
            </label>

            <div className="register-role-group">
              <span>I am a</span>
              <div className="register-role-grid">
                {roleOptions.map((role) => (
                  <button
                    className={`register-role-card ${role.active ? "is-active" : ""}`}
                    key={role.key}
                    type="button"
                  >
                    <span className="register-role-icon">{role.icon}</span>
                    <span>
                      <strong>{role.title}</strong>
                      <small>{role.subtitle}</small>
                    </span>
                    {role.active ? <i aria-hidden="true">✓</i> : null}
                  </button>
                ))}
              </div>
            </div>

            <label className="register-field">
              <Mail size={21} aria-hidden="true" />
              <input type="email" placeholder="Email address" />
            </label>

            <label className="register-field">
              <LockKeyhole size={21} aria-hidden="true" />
              <input type="password" placeholder="Password" />
              <Eye size={20} aria-hidden="true" />
            </label>

            <label className="register-field">
              <LockKeyhole size={21} aria-hidden="true" />
              <input type="password" placeholder="Confirm password" />
              <Eye size={20} aria-hidden="true" />
            </label>

            <label className="register-agreement">
              <input type="checkbox" />
              <span>
                I agree to the <a href="#terms">Terms</a> &amp; <a href="#privacy">Privacy Policy</a>
              </span>
            </label>

            <button className="register-submit" type="button">Create account</button>

            <div className="register-divider">
              <span>or</span>
            </div>

            <button className="register-google" type="button">
              <span aria-hidden="true">G</span>
              Continue with Google
            </button>

            <p className="register-switch">
              Already have an account? <a href="#login">Log in</a>
            </p>
          </form>
        </div>

        <div className="register-floating-note left" aria-hidden="true">
          <UsersRound size={20} />
          Study together
        </div>
        <div className="register-floating-note right" aria-hidden="true">
          <School size={20} />
          Teach smarter
        </div>
      </section>
    </main>
  );
}
