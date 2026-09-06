"use client";

import { useEffect, useState } from "react";
import EngineeringFormModal, {
  formFieldClass,
} from "@/app/components/shared/EngineeringFormModal";
import sharedStyles from "@/app/components/shared/EngineeringFormModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  /** The careers page has a dedicated Track Your Candidature Figma popup. */
  variant?: "existing" | "track";
}

export default function ExistingUsers({
  isOpen,
  onClose,
  variant = "existing",
}: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <EngineeringFormModal
      isOpen={isOpen}
      onClose={onClose}
      geometry="track"
      title={
        variant === "track" ? (
          "TRACK YOUR CANDIDATURE"
        ) : (
          <>
            Existing <span className="text-[#23B14D]">Users</span>
          </>
        )
      }
      subtitle="Enter your credentials to access your GREEN Careers Dashboard."
    >
      <form
        className={sharedStyles.trackForm}
        onSubmit={(event) => event.preventDefault()}
      >
        <div className={sharedStyles.trackFields}>
          <label className="sr-only" htmlFor="existing-primary-field">
            {variant === "track" ? "User name" : "First name"}
          </label>
          <input
            id="existing-primary-field"
            name={variant === "track" ? "username" : "firstName"}
            type="text"
            placeholder={variant === "track" ? "USER NAME" : "FIRST NAME"}
            value={variant === "track" ? username : firstName}
            onChange={(event) =>
              variant === "track"
                ? setUsername(event.target.value)
                : setFirstName(event.target.value)
            }
            className={`${formFieldClass} ${sharedStyles.initialFocusField}`}
          />
          <label className="sr-only" htmlFor="existing-secondary-field">
            {variant === "track" ? "Password" : "Email address"}
          </label>
          <input
            id="existing-secondary-field"
            name={variant === "track" ? "password" : "email"}
            type={variant === "track" ? "password" : "email"}
            placeholder={variant === "track" ? "PASSWORD" : "E-MAIL ID"}
            value={variant === "track" ? password : email}
            onChange={(event) =>
              variant === "track"
                ? setPassword(event.target.value)
                : setEmail(event.target.value)
            }
            className={`${formFieldClass} ${sharedStyles.trackPassword}`}
          />
        </div>
        <button className={sharedStyles.trackLogin} type="submit">
          <img src="/images/join-us/login.png" alt="Login" />
        </button>
        <p className={sharedStyles.trackResetCopy}>
          Forgot Password? <button type="button">Reset Here</button>
        </p>
      </form>
    </EngineeringFormModal>
  );
}
