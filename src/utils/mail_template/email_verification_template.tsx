interface EmailTemplateProps {
  name: string;
  verificationLink: string;
  token: string;
}

const EmailVerificationTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  verificationLink,
  token,
}) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#333",
      }}
    >
      <h1 style={{ color: "#4CAF50" }}>Welcome, {name}</h1>
      <p>
        Thank you for registering. Please click the link below to activate your
        account ^^
      </p>
      <p>
        Please insert this token into the field: <strong>{token}</strong>
      </p>
      <a
        href={verificationLink}
        style={{
          display: "inline-block",
          padding: "10px 20px",
          margin: "10px 0",
          color: "#fff",
          backgroundColor: "#4CAF50",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        Activate Account
      </a>
    </div>
  );
};

export default EmailVerificationTemplate;
