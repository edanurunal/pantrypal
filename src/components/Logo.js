export default function Logo() {
  return (
    <svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="84" height="84" rx="20" fill="#C21874"/>
      {/* P harfi */}
      <path d="M28 24 L28 60" stroke="white" strokeWidth="5" strokeLinecap="round"/>
      <path d="M28 24 L44 24 Q56 24 56 36 Q56 48 44 48 L28 48" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Tik işareti */}
      <path d="M58 32 L66 40 L78 28" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}